import React, { useState } from 'react';
import './AppointmentCard.css';
import DoctorCard from './DoctorCard.jsx';

const AppointmentCard = ({ 
  appointment, 
  onClick, 
  onReschedule, 
  onPayment, 
  onCancel, 
  onDoctorClick,
  onJoinCall 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'confirmed';
      case 'pending': return 'pending';
      case 'cancelled': return 'cancelled';
      case 'completed': return 'completed';
      default: return 'pending';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'urgent': return 'urgent';
      case 'high': return 'high';
      case 'normal': return 'normal';
      case 'low': return 'low';
      default: return 'normal';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const isUpcoming = new Date(appointment.date) > new Date();
  const isToday = new Date(appointment.date).toDateString() === new Date().toDateString();

  return (
    <div 
      className={`appointment-card ${getStatusColor(appointment.status)} ${isUpcoming ? 'upcoming' : ''} ${isToday ? 'today' : ''}`}
      onClick={onClick}
    >
      {/* Modern Doctor Card */}
      <div onClick={(e) => { e.stopPropagation(); onDoctorClick(); }}>
        <DoctorCard
          doctorName={appointment.doctor.name}
          specialization={appointment.doctor.specialization}
          status={appointment.doctor.isOnline ? 'online' : 'offline'}
          rating={appointment.doctor.rating}
          reviewCount={appointment.doctor.reviewCount || 25}
          experience={appointment.doctor.experience}
          consultationFee={appointment.doctor.consultationFee}
          photo={appointment.doctor.photo}
          location={appointment.location}
          nextAvailableSlot={appointment.doctor.nextAvailableSlot || "Today 3:00 PM"}
          onBookNow={() => {
            // Handle booking logic
            console.log('Book appointment with', appointment.doctor.name);
          }}
          onViewProfile={() => {
            // Handle view profile
            console.log('View profile of', appointment.doctor.name);
          }}
          onChat={() => {
            // Handle chat
            console.log('Start chat with', appointment.doctor.name);
          }}
          onVideoCall={() => {
            // Handle video call
            console.log('Start video call with', appointment.doctor.name);
          }}
        />
      </div>

      {/* Appointment Details */}
      <div className="appointment-details">
        <div className="detail-row">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="detail-text">
            {formatDate(appointment.date)} at {formatTime(appointment.time)}
          </span>
        </div>
        
        <div className="detail-row">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="detail-text">Duration: {appointment.duration}</span>
        </div>
        
        <div className="detail-row">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="detail-text">{appointment.location}</span>
        </div>
        
        <div className="detail-row">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="detail-text">{appointment.reason}</span>
        </div>

        <div className="type-tags">
          <span className="type-tag consultation">{appointment.type}</span>
          <span className="type-tag normal">{appointment.urgency}</span>
        </div>
      </div>

      {/* Notes Section */}
      {appointment.notes && (
        <div className="notes-section">
          <p className="notes-label">Notes:</p>
          <p className="notes-text">{appointment.notes}</p>
        </div>
      )}

      {/* Expandable Content */}
      {isExpanded && (
        <div className="expanded-content">
          <div className="billing-info">
            <h4>Billing Information</h4>
            <div className="billing-details">
              <span>Amount: ₹{appointment.billing.amount}</span>
              <span>Status: {appointment.billing.status}</span>
              <span>Invoice: {appointment.billing.invoiceId}</span>
            </div>
          </div>
          
          {appointment.prescriptions.length > 0 && (
            <div className="prescriptions-info">
              <h4>Prescriptions</h4>
              <div className="prescriptions-list">
                {appointment.prescriptions.map((prescription, index) => (
                  <div key={index} className="prescription-item">
                    <span className="medicine-name">{prescription.name}</span>
                    <span className="medicine-dosage">{prescription.dosage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {appointment.labTests.length > 0 && (
            <div className="lab-tests-info">
              <h4>Lab Tests</h4>
              <div className="lab-tests-list">
                {appointment.labTests.map((test, index) => (
                  <div key={index} className="lab-test-item">
                    <span className="test-name">{test.name}</span>
                    <span className={`test-status ${test.status}`}>{test.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        <button 
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg 
            className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {isExpanded ? 'Less Details' : 'More Details'}
        </button>

        <div className="action-buttons">
          {appointment.status === 'pending' && (
            <>
              <button 
                className="action-btn reschedule"
                onClick={onReschedule}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reschedule
              </button>
              <button 
                className="action-btn cancel"
                onClick={onCancel}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </>
          )}
          
          {appointment.status === 'confirmed' && (
            <button 
              className="action-btn payment"
              onClick={onPayment}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Pay Now
            </button>
          )}
          
          {appointment.teleconsultation.available && isUpcoming && (
            <button 
              className="action-btn join-call"
              onClick={onJoinCall}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Join Call
            </button>
          )}
          
          <button 
            className="action-btn receipt"
            onClick={() => {/* Handle receipt download */}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Receipt
          </button>
        </div>
      </div>

      {/* Cancellation Policy */}
      {appointment.status === 'pending' && (
        <div className="cancellation-policy">
          <p className="policy-text">
            Free cancellation up to {appointment.cancellationPolicy.freeCancellationHours} hours before appointment
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
