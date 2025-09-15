#!/usr/bin/env python3
"""
Script to seed staff users for the healthcare system
This creates admin, doctor, nurse, receptionist, and pharmacist users
"""

import os
import sys
import bcrypt
import datetime
from pymongo import MongoClient
import config

def seed_staff_users():
    """Seed the database with staff users"""
    
    # Connect to MongoDB
    try:
        client = MongoClient(config.MONGO_URI, serverSelectionTimeoutMS=5000)
        client.admin.command('ping')
        print("✅ Connected to MongoDB")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        return False
    
    db = client[config.DB_NAME]
    users_collection = db['users']
    
    # Staff users to create
    staff_users = [
        # Admin users
        {
            "name": "Admin User",
            "email": "admin@healthcare.com",
            "password": "admin123",
            "role": "admin",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        {
            "name": "Admin Manager",
            "email": "admin2@healthcare.com",
            "password": "admin456",
            "role": "admin",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        
        # Doctor users
        {
            "name": "Dr. Smith",
            "email": "doctor@healthcare.com",
            "password": "doctor123",
            "role": "doctor",
            "specialization": "Cardiology",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        {
            "name": "Dr. Johnson",
            "email": "doctor2@healthcare.com",
            "password": "doctor456",
            "role": "doctor",
            "specialization": "Neurology",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        
        # Nurse users
        {
            "name": "Nurse Williams",
            "email": "nurse@healthcare.com",
            "password": "nurse123",
            "role": "nurse",
            "department": "Emergency",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        {
            "name": "Nurse Brown",
            "email": "nurse2@healthcare.com",
            "password": "nurse456",
            "role": "nurse",
            "department": "ICU",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        
        # Receptionist users
        {
            "name": "Receptionist Davis",
            "email": "receptionist@healthcare.com",
            "password": "receptionist123",
            "role": "receptionist",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        {
            "name": "Receptionist Wilson",
            "email": "receptionist2@healthcare.com",
            "password": "receptionist456",
            "role": "receptionist",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        
        # Pharmacist users
        {
            "name": "Pharmacist Taylor",
            "email": "pharmacist@healthcare.com",
            "password": "pharmacist123",
            "role": "pharmacist",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        },
        {
            "name": "Pharmacist Anderson",
            "email": "pharmacist2@healthcare.com",
            "password": "pharmacist456",
            "role": "pharmacist",
            "isActive": True,
            "createdAt": datetime.datetime.utcnow()
        }
    ]
    
    created_count = 0
    updated_count = 0
    
    for user_data in staff_users:
        email = user_data['email']
        
        # Check if user already exists
        existing_user = users_collection.find_one({"email": email})
        
        if existing_user:
            # Update existing user
            user_data['updatedAt'] = datetime.datetime.utcnow()
            # Hash password
            user_data['password'] = bcrypt.hashpw(
                user_data['password'].encode('utf-8'), 
                bcrypt.gensalt(config.BCRYPT_LOG_ROUNDS)
            )
            
            users_collection.update_one(
                {"email": email},
                {"$set": user_data}
            )
            updated_count += 1
            print(f"🔄 Updated existing user: {email}")
        else:
            # Create new user
            user_data['createdAt'] = datetime.datetime.utcnow()
            # Hash password
            user_data['password'] = bcrypt.hashpw(
                user_data['password'].encode('utf-8'), 
                bcrypt.gensalt(config.BCRYPT_LOG_ROUNDS)
            )
            
            users_collection.insert_one(user_data)
            created_count += 1
            print(f"✅ Created new user: {email}")
    
    print(f"\n🎉 Staff users seeding completed!")
    print(f"   📊 Created: {created_count} users")
    print(f"   🔄 Updated: {updated_count} users")
    print(f"   📝 Total processed: {len(staff_users)} users")
    
    # Display login credentials
    print(f"\n🔐 Staff Portal Login Credentials:")
    print(f"   Admin: admin@healthcare.com / admin123")
    print(f"   Doctor: doctor@healthcare.com / doctor123")
    print(f"   Nurse: nurse@healthcare.com / nurse123")
    print(f"   Receptionist: receptionist@healthcare.com / receptionist123")
    print(f"   Pharmacist: pharmacist@healthcare.com / pharmacist123")
    
    return True

if __name__ == "__main__":
    print("🏥 Healthcare System - Staff Users Seeding")
    print("=" * 50)
    
    success = seed_staff_users()
    
    if success:
        print(f"\n✅ Staff users seeding completed successfully!")
        print(f"🚀 You can now login to the staff portal with the credentials above")
    else:
        print(f"\n❌ Staff users seeding failed!")
        sys.exit(1)
