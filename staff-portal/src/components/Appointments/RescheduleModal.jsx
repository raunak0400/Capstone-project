import React, { useState } from 'react';
import './RescheduleModal.css';

const RescheduleModal = ({ appointment, onClose, onReschedule }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate available time slots (mock data)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isAvailable = Math.random() > 0.3; // 70% availability
        slots.push({
          time: timeString,
          available: isAvailable,
          displayTime: `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Generate available dates (next 30 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const isAvailable = Math.random() > 0.2; // 80% availability
      dates.push({
        date: date.toISOString().split('T')[0],
        available: isAvailable,
        displayDate: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      });
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onReschedule(selectedDate, selectedTime);
      setLoading(false);
    }, 1500);
  };

  const formatCurrentAppointment = () => {
    const date = new Date(appointment.date);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="reschedule-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <h2 className="modal-title">Reschedule Appointment</h2>
            <p className="modal-subtitle">Choose a new date and time for your appointment</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Current Appointment Info */}
        <div className="current-appointment">
          <h3 className="current-title">Current Appointment</h3>
          <div className="current-details">
            <div className="current-info">
              <div className="info-item">
                <span className="info-label">Doctor:</span>
                <span className="info-value">{appointment.doctor.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date:</span>
                <span className="info-value">{formatCurrentAppointment()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time:</span>
                <span className="info-value">{appointment.time}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Type:</span>
                <span className="info-value">{appointment.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reschedule Form */}
        <form className="reschedule-form" onSubmit={handleSubmit}>
          {/* Date Selection */}
          <div className="form-section">
            <h4 className="section-title">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Select New Date
            </h4>
            <div className="date-grid">
              {availableDates.map((dateOption) => (
                <button
                  key={dateOption.date}
                  type="button"
                  className={`date-option ${selectedDate === dateOption.date ? 'selected' : ''} ${!dateOption.available ? 'unavailable' : ''}`}
                  onClick={() => dateOption.available && setSelectedDate(dateOption.date)}
                  disabled={!dateOption.available}
                >
                  <div className="date-display">{dateOption.displayDate}</div>
                  <div className="date-status">
                    {dateOption.available ? 'Available' : 'Unavailable'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="form-section">
              <h4 className="section-title">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Select New Time
              </h4>
              <div className="time-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    className={`time-option ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.displayTime}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reason for Rescheduling */}
          <div className="form-section">
            <h4 className="section-title">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Reason for Rescheduling (Optional)
            </h4>
            <textarea
              className="reason-input"
              placeholder="Please provide a reason for rescheduling..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* Cancellation Policy */}
          <div className="cancellation-policy">
            <div className="policy-header">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Rescheduling Policy</span>
            </div>
            <div className="policy-content">
              <p>
                • Free rescheduling up to {appointment.cancellationPolicy.freeCancellationHours} hours before appointment
              </p>
              <p>
                • Rescheduling fee of ₹{appointment.cancellationPolicy.cancellationFee} applies for changes made less than {appointment.cancellationPolicy.freeCancellationHours} hours before appointment
              </p>
              <p>
                • You can reschedule up to 3 times per appointment
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!selectedDate || !selectedTime || loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Rescheduling...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Confirm Reschedule
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;
