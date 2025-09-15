import React from 'react';
import './AppointmentDetailsModal.css';

const AppointmentDetailsModal = ({ appointment, onClose, onReschedule, onPayment }) => {
  if (!appointment) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#56ab2f';
      case 'pending': return '#f093fb';
      case 'cancelled': return '#ff416c';
      case 'completed': return '#4facfe';
      default: return '#6c757d';
    }
  };

  const isUpcoming = new Date(appointment.date) > new Date();
  const isToday = new Date(appointment.date).toDateString() === new Date().toDateString();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="appointment-details-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <h2 className="modal-title">Appointment Details</h2>
            <div className="appointment-id">ID: {appointment.id}</div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Doctor Information */}
          <div className="doctor-section">
            <div className="doctor-header">
              <div className="doctor-avatar">
                <img 
                  src={appointment.doctor.photo} 
                  alt={appointment.doctor.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${appointment.doctor.name}&background=667eea&color=fff`;
                  }}
                />
                {appointment.doctor.isOnline && <div className="online-indicator"></div>}
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">{appointment.doctor.name}</h3>
                <p className="doctor-specialization">{appointment.doctor.specialization}</p>
                <div className="doctor-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`star ${i < appointment.doctor.rating ? 'filled' : ''}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="rating-text">({appointment.doctor.rating}.0) • {appointment.doctor.experience} years experience</span>
                </div>
                <div className="consultation-fee">
                  <span className="fee-label">Consultation Fee:</span>
                  <span className="fee-amount">₹{appointment.doctor.consultationFee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Information */}
          <div className="appointment-section">
            <h4 className="section-title">Appointment Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Date & Time
                </div>
                <div className="info-value">
                  {formatDate(appointment.date)} at {appointment.time}
                  {isToday && <span className="today-badge">Today</span>}
                  {isUpcoming && !isToday && <span className="upcoming-badge">Upcoming</span>}
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Duration
                </div>
                <div className="info-value">{appointment.duration}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </div>
                <div className="info-value">{appointment.location}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Purpose
                </div>
                <div className="info-value">{appointment.reason}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Type & Urgency
                </div>
                <div className="info-value">
                  <span className="type-tag">{appointment.type}</span>
                  <span className={`urgency-tag ${appointment.urgency.toLowerCase()}`}>
                    {appointment.urgency}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Status
                </div>
                <div className="info-value">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(appointment.status) }}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {appointment.notes && (
            <div className="notes-section">
              <h4 className="section-title">Notes</h4>
              <div className="notes-content">
                <p>{appointment.notes}</p>
              </div>
            </div>
          )}

          {/* Billing Information */}
          <div className="billing-section">
            <h4 className="section-title">Billing Information</h4>
            <div className="billing-details">
              <div className="billing-item">
                <span className="billing-label">Amount:</span>
                <span className="billing-value">₹{appointment.billing.amount}</span>
              </div>
              <div className="billing-item">
                <span className="billing-label">Status:</span>
                <span className={`billing-status ${appointment.billing.status}`}>
                  {appointment.billing.status}
                </span>
              </div>
              <div className="billing-item">
                <span className="billing-label">Invoice ID:</span>
                <span className="billing-value">{appointment.billing.invoiceId}</span>
              </div>
            </div>
          </div>

          {/* Prescriptions */}
          {appointment.prescriptions && appointment.prescriptions.length > 0 && (
            <div className="prescriptions-section">
              <h4 className="section-title">Prescriptions</h4>
              <div className="prescriptions-list">
                {appointment.prescriptions.map((prescription, index) => (
                  <div key={index} className="prescription-item">
                    <div className="prescription-header">
                      <h5 className="medicine-name">{prescription.name}</h5>
                      <span className="medicine-dosage">{prescription.dosage}</span>
                    </div>
                    <div className="prescription-details">
                      <div className="detail-item">
                        <span className="detail-label">Frequency:</span>
                        <span className="detail-value">{prescription.frequency}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{prescription.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lab Tests */}
          {appointment.labTests && appointment.labTests.length > 0 && (
            <div className="lab-tests-section">
              <h4 className="section-title">Lab Tests</h4>
              <div className="lab-tests-list">
                {appointment.labTests.map((test, index) => (
                  <div key={index} className="lab-test-item">
                    <div className="test-header">
                      <h5 className="test-name">{test.name}</h5>
                      <span className={`test-status ${test.status}`}>{test.status}</span>
                    </div>
                    {test.result && (
                      <div className="test-result">
                        <span className="result-label">Result:</span>
                        <span className="result-value">{test.result}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teleconsultation */}
          {appointment.teleconsultation && appointment.teleconsultation.available && (
            <div className="teleconsultation-section">
              <h4 className="section-title">Teleconsultation</h4>
              <div className="teleconsultation-info">
                <div className="teleconsultation-item">
                  <span className="teleconsultation-label">Platform:</span>
                  <span className="teleconsultation-value">{appointment.teleconsultation.platform}</span>
                </div>
                <div className="teleconsultation-item">
                  <span className="teleconsultation-label">Meeting ID:</span>
                  <span className="teleconsultation-value">{appointment.teleconsultation.meetingId}</span>
                </div>
                {isUpcoming && (
                  <button className="join-call-btn">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Join Call
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Cancellation Policy */}
          <div className="cancellation-policy-section">
            <h4 className="section-title">Cancellation Policy</h4>
            <div className="policy-content">
              <p>
                Free cancellation up to {appointment.cancellationPolicy.freeCancellationHours} hours before appointment.
                Cancellation fee of ₹{appointment.cancellationPolicy.cancellationFee} applies for late cancellations.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          
          {appointment.status === 'pending' && (
            <button className="btn-warning" onClick={onReschedule}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reschedule
            </button>
          )}
          
          {appointment.status === 'confirmed' && appointment.billing.status === 'pending' && (
            <button className="btn-primary" onClick={onPayment}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Pay Now
            </button>
          )}
          
          <button className="btn-info">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
