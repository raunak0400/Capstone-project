import React from 'react';
import DoctorCard from './DoctorCard';

const DoctorCardDemo = () => {
  const dummyDoctors = [
    {
      doctorName: "Dr. Sarah Smith",
      specialization: "Dermatology",
      status: "online",
      rating: 4.8,
      reviewCount: 127,
      experience: 8,
      consultationFee: 1200,
      nextAvailableSlot: "Today 3:00 PM",
      location: "Main Clinic",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      doctorName: "Dr. Michael Johnson",
      specialization: "Orthopedics",
      status: "offline",
      rating: 4.6,
      reviewCount: 89,
      experience: 12,
      consultationFee: 1500,
      nextAvailableSlot: "Tomorrow 10:00 AM",
      location: "Main Clinic"
    },
    {
      doctorName: "Dr. Emily Chen",
      specialization: "Cardiology",
      status: "online",
      rating: 4.9,
      reviewCount: 203,
      experience: 15,
      consultationFee: 2000,
      nextAvailableSlot: "Today 5:30 PM",
      location: "Heart Center"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Doctor Profile Cards Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyDoctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              doctorName={doctor.doctorName}
              specialization={doctor.specialization}
              status={doctor.status}
              rating={doctor.rating}
              reviewCount={doctor.reviewCount}
              experience={doctor.experience}
              consultationFee={doctor.consultationFee}
              nextAvailableSlot={doctor.nextAvailableSlot}
              location={doctor.location}
              photo={doctor.photo}
              onBookNow={() => {
                alert(`Booking appointment with ${doctor.doctorName}`);
              }}
              onViewProfile={() => {
                alert(`Viewing profile of ${doctor.doctorName}`);
              }}
              onChat={() => {
                alert(`Starting chat with ${doctor.doctorName}`);
              }}
              onVideoCall={() => {
                alert(`Starting video call with ${doctor.doctorName}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCardDemo;
