import React from 'react';
import './DoctorProfileModal.css';

const DoctorProfileModal = ({ doctor, onClose, onBookAppointment }) => {
  if (!doctor) return null;

  const specialties = [
    'General Medicine', 'Cardiology', 'Dermatology', 'Neurology',
    'Orthopedics', 'Pediatrics', 'Gynecology', 'Psychiatry'
  ];

  const education = [
    { degree: 'MBBS', institution: 'AIIMS Delhi', year: '2010' },
    { degree: 'MD', institution: 'PGI Chandigarh', year: '2015' },
    { degree: 'DM', institution: 'AIIMS Delhi', year: '2018' }
  ];

  const achievements = [
    'Best Doctor Award 2023',
    'Published 25+ Research Papers',
    '15+ Years Experience',
    '5000+ Successful Treatments'
  ];

  const reviews = [
    {
      id: 1,
      patient: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent doctor with great bedside manner. Very thorough and caring.',
      date: '2024-01-15'
    },
    {
      id: 2,
      patient: 'Priya Sharma',
      rating: 5,
      comment: 'Dr. Smith is very knowledgeable and explains everything clearly.',
      date: '2024-01-10'
    },
    {
      id: 3,
      patient: 'Amit Patel',
      rating: 4,
      comment: 'Good consultation, but had to wait a bit longer than expected.',
      date: '2024-01-08'
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="doctor-profile-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <h2 className="modal-title">Doctor Profile</h2>
            <p className="modal-subtitle">View doctor details and book appointment</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Doctor Header */}
        <div className="doctor-header">
          <div className="doctor-avatar">
            <img 
              src={doctor.photo} 
              alt={doctor.name}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&background=667eea&color=fff`;
              }}
            />
            {doctor.isOnline && <div className="online-indicator"></div>}
          </div>
          <div className="doctor-info">
            <h1 className="doctor-name">{doctor.name}</h1>
            <p className="doctor-specialization">{doctor.specialization}</p>
            <div className="doctor-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`star ${i < Math.floor(averageRating) ? 'filled' : ''}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="rating-text">({averageRating.toFixed(1)}) • {reviews.length} reviews</span>
            </div>
            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-number">{doctor.experience}</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Patients Treated</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₹{doctor.consultationFee}</span>
                <span className="stat-label">Consultation Fee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn primary" onClick={onBookAppointment}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Appointment
          </button>
          <button className="action-btn secondary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Video Consult
          </button>
          <button className="action-btn secondary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share Profile
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {/* About Section */}
          <div className="profile-section">
            <h3 className="section-title">About</h3>
            <div className="about-content">
              <p>
                Dr. {doctor.name} is a highly experienced {doctor.specialization} specialist with over {doctor.experience} years of practice. 
                He is known for his compassionate care and expertise in treating complex medical conditions. 
                Dr. {doctor.name} believes in providing personalized treatment plans tailored to each patient's unique needs.
              </p>
              <p>
                He is committed to staying updated with the latest medical advancements and regularly attends 
                international conferences and workshops to enhance his knowledge and skills.
              </p>
            </div>
          </div>

          {/* Specialties */}
          <div className="profile-section">
            <h3 className="section-title">Specialties</h3>
            <div className="specialties-grid">
              {specialties.map((specialty, index) => (
                <div key={index} className="specialty-item">
                  <span className="specialty-name">{specialty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="profile-section">
            <h3 className="section-title">Education</h3>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-degree">{edu.degree}</div>
                  <div className="education-details">
                    <div className="education-institution">{edu.institution}</div>
                    <div className="education-year">{edu.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="profile-section">
            <h3 className="section-title">Achievements</h3>
            <div className="achievements-list">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="profile-section">
            <h3 className="section-title">Patient Reviews</h3>
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-patient">
                      <div className="patient-avatar">
                        {review.patient.charAt(0)}
                      </div>
                      <div className="patient-info">
                        <div className="patient-name">{review.patient}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`star ${i < review.rating ? 'filled' : ''}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="review-comment">
                    {review.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="profile-section">
            <h3 className="section-title">Availability</h3>
            <div className="availability-info">
              <div className="availability-item">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="availability-details">
                  <div className="availability-label">Consultation Hours</div>
                  <div className="availability-value">Mon-Fri: 9:00 AM - 6:00 PM</div>
                  <div className="availability-value">Sat: 9:00 AM - 2:00 PM</div>
                </div>
              </div>
              <div className="availability-item">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="availability-details">
                  <div className="availability-label">Location</div>
                  <div className="availability-value">Main Clinic, Building A, Floor 2</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary" onClick={onBookAppointment}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;
