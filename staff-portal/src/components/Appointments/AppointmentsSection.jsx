import React, { useState, useEffect } from 'react';
import './AppointmentsSection.css';
import CalendarView from './CalendarView';
import AppointmentCard from './AppointmentCard';
import FilterSortBar from './FilterSortBar';
import AppointmentDetailsModal from './AppointmentDetailsModal';
import RescheduleModal from './RescheduleModal';
import PaymentModal from './PaymentModal';
import DoctorProfileModal from './DoctorProfileModal';
import NotificationCenter from './NotificationCenter';

const AppointmentsSection = ({ appointments, onBookAppointment, onUpdateAppointment }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [smartSuggestions, setSmartSuggestions] = useState([]);


  function getDoctorSpecialization(doctorName) {
    const specializations = [
      'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 
      'Pediatrics', 'Gynecology', 'General Medicine', 'Psychiatry'
    ];
    return specializations[doctorName.length % specializations.length];
  }

  function generateMockPrescriptions() {
    const medicines = [
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Once daily', duration: '3 days' },
      { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', duration: '30 days' },
    ];
    return medicines.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  function generateMockLabTests() {
    const tests = [
      { name: 'Blood Test', status: 'completed', result: 'Normal' },
      { name: 'X-Ray', status: 'pending', result: null },
      { name: 'ECG', status: 'scheduled', result: null },
    ];
    return tests.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  // Enhanced appointment data with additional fields
  const enhancedAppointments = appointments.map(appointment => ({
    ...appointment,
    doctor: {
      name: appointment.doctor,
      photo: `https://ui-avatars.com/api/?name=${appointment.doctor}&background=random`,
      specialization: getDoctorSpecialization(appointment.doctor),
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      experience: Math.floor(Math.random() * 10) + 5, // 5-15 years
      consultationFee: Math.floor(Math.random() * 1000) + 500, // 500-1500
      isOnline: Math.random() > 0.5, // Random online availability
    },
    urgency: appointment.urgency || 'Normal',
    type: appointment.type || 'Consultation',
    duration: appointment.duration || '30 Minutes',
    location: appointment.location || 'Main Clinic',
    reason: appointment.reason || 'Regular Checkup',
    notes: appointment.notes || '',
    prescriptions: generateMockPrescriptions(),
    labTests: generateMockLabTests(),
    billing: {
      amount: Math.floor(Math.random() * 2000) + 500,
      status: appointment.status === 'confirmed' ? 'pending' : 'paid',
      invoiceId: `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    },
    cancellationPolicy: {
      freeCancellationHours: 24,
      cancellationFee: 100,
    },
    teleconsultation: {
      available: Math.random() > 0.3,
      platform: 'Zoom',
      meetingId: Math.random().toString(36).substr(2, 9),
    },
  }));

  // Filter and sort appointments
  const filteredAppointments = enhancedAppointments
    .filter(appointment => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'upcoming') return new Date(appointment.date) > new Date();
      if (filterStatus === 'past') return new Date(appointment.date) < new Date();
      return appointment.status.toLowerCase() === filterStatus.toLowerCase();
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'doctor':
          comparison = a.doctor.name.localeCompare(b.doctor.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Get next upcoming appointment
  const nextAppointment = enhancedAppointments
    .filter(apt => new Date(apt.date) > new Date() && apt.status === 'confirmed')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];


  // Event handlers
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handlePayment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      onUpdateAppointment(appointmentId, { status: 'cancelled' });
      addNotification('Appointment cancelled successfully', 'success');
    }
  };

  const handleJoinTeleconsultation = (appointment) => {
    if (appointment.teleconsultation.available) {
      window.open(`https://zoom.us/j/${appointment.teleconsultation.meetingId}`, '_blank');
    }
  };

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
  };

  // Generate smart suggestions
  const generateSmartSuggestions = () => {
    const suggestions = [];
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Find recent appointments that might need follow-up
    const recentAppointments = enhancedAppointments.filter(apt => 
      new Date(apt.date) >= thirtyDaysAgo && 
      new Date(apt.date) <= today && 
      apt.status === 'completed'
    );
    
    recentAppointments.forEach(appointment => {
      // Suggest follow-up if it's been more than 2 weeks
      const daysSinceAppointment = Math.floor((today - new Date(appointment.date)) / (1000 * 60 * 60 * 24));
      if (daysSinceAppointment >= 14) {
        suggestions.push({
          id: `followup-${appointment.id}`,
          type: 'followup',
          title: 'Follow-up Recommended',
          description: `Book a follow-up with ${appointment.doctor.name} for your ${appointment.reason}`,
          doctor: appointment.doctor,
          priority: 'medium',
          action: 'Book Follow-up'
        });
      }
      
      // Suggest annual checkup if it's been a year
      if (daysSinceAppointment >= 365) {
        suggestions.push({
          id: `annual-${appointment.id}`,
          type: 'annual',
          title: 'Annual Checkup Due',
          description: `It's been a year since your last visit with ${appointment.doctor.name}`,
          doctor: appointment.doctor,
          priority: 'high',
          action: 'Book Annual Checkup'
        });
      }
    });
    
    // Suggest preventive care (simplified without family member logic)
    suggestions.push({
      id: 'preventive-1',
      type: 'preventive',
      title: 'Preventive Care',
      description: 'Schedule your annual preventive health checkup',
      doctor: { name: 'Dr. Preventive Care', specialization: 'General Medicine' },
      priority: 'high',
      action: 'Book Preventive Care'
    });
    
    suggestions.push({
      id: 'preventive-2',
      type: 'preventive',
      title: 'General Checkup',
      description: 'Schedule your regular health checkup',
      doctor: { name: 'Dr. General Care', specialization: 'General Medicine' },
      priority: 'medium',
      action: 'Book General Checkup'
    });
    
    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  // Check for upcoming appointments and add notifications
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    enhancedAppointments.forEach(appointment => {
      const appointmentDate = new Date(appointment.date);
      if (appointmentDate.toDateString() === today.toDateString() && appointment.status === 'confirmed') {
        addNotification(`You have an appointment with ${appointment.doctor.name} today at ${appointment.time}`, 'warning');
      } else if (appointmentDate.toDateString() === tomorrow.toDateString() && appointment.status === 'confirmed') {
        addNotification(`Reminder: You have an appointment with ${appointment.doctor.name} tomorrow at ${appointment.time}`, 'info');
      }
    });
    
    // Generate smart suggestions
    setSmartSuggestions(generateSmartSuggestions());
  }, []);

  // Close family dropdown when clicking outside

  
  return (
    <div className="appointments-section">
      {/* Header with View Toggle */}
      <div className="appointments-header">
        <div className="header-left">
          <h2 className="section-title">My Appointments</h2>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </button>
            <button 
              className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar
            </button>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={onBookAppointment} className="btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Book New Appointment
          </button>
        </div>
      </div>

      {/* Next Appointment Highlight */}
      {nextAppointment && (
        <div className="next-appointment-banner">
          <div className="banner-content">
            <div className="banner-icon">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="banner-info">
              <h3>Next Appointment</h3>
              <p>with {nextAppointment.doctor.name} on {new Date(nextAppointment.date).toLocaleDateString()}</p>
              <div className="countdown-timer">
                <CountdownTimer targetDate={new Date(nextAppointment.date)} />
              </div>
            </div>
            <div className="banner-actions">
              <button 
                onClick={() => handleAppointmentClick(nextAppointment)}
                className="btn-secondary"
              >
                View Details
              </button>
              {nextAppointment.teleconsultation.available && (
                <button 
                  onClick={() => handleJoinTeleconsultation(nextAppointment)}
                  className="btn-primary"
                >
                  Join Call
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      {smartSuggestions.length > 0 && (
        <div className="smart-suggestions">
          <h3 className="suggestions-title">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Smart Suggestions
          </h3>
          <div className="suggestions-grid">
            {smartSuggestions.map((suggestion) => (
              <div key={suggestion.id} className={`suggestion-card ${suggestion.priority}`}>
                <div className="suggestion-header">
                  <div className="suggestion-icon">
                    {suggestion.type === 'followup' && '🔄'}
                    {suggestion.type === 'annual' && '📅'}
                    {suggestion.type === 'preventive' && '🛡️'}
                  </div>
                  <div className="suggestion-priority">
                    <span className={`priority-badge ${suggestion.priority}`}>
                      {suggestion.priority}
                    </span>
                  </div>
                </div>
                <div className="suggestion-content">
                  <h4 className="suggestion-title">{suggestion.title}</h4>
                  <p className="suggestion-description">{suggestion.description}</p>
                  <div className="suggestion-doctor">
                    <span className="doctor-name">{suggestion.doctor.name}</span>
                    <span className="doctor-specialization">{suggestion.doctor.specialization}</span>
                  </div>
                </div>
                <div className="suggestion-actions">
                  <button 
                    className="suggestion-btn"
                    onClick={() => onBookAppointment(suggestion.doctor)}
                  >
                    {suggestion.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Sort Bar */}
      <FilterSortBar
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        appointmentCount={filteredAppointments.length}
      />

      {/* Appointment Statistics */}
      <div className="appointment-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{enhancedAppointments.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon confirmed">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{enhancedAppointments.filter(apt => apt.status === 'confirmed').length}</span>
            <span className="stat-label">Confirmed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{enhancedAppointments.filter(apt => apt.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon upcoming">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{enhancedAppointments.filter(apt => new Date(apt.date) > new Date()).length}</span>
            <span className="stat-label">Upcoming</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'grid' ? (
        <div className="appointments-grid">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onClick={() => handleAppointmentClick(appointment)}
              onReschedule={() => handleReschedule(appointment)}
              onPayment={() => handlePayment(appointment)}
              onCancel={() => handleCancelAppointment(appointment.id)}
              onDoctorClick={() => handleDoctorClick(appointment.doctor)}
              onJoinCall={() => handleJoinTeleconsultation(appointment)}
            />
          ))}
        </div>
      ) : (
        <CalendarView
          appointments={filteredAppointments}
          onAppointmentClick={handleAppointmentClick}
        />
      )}

      {/* Modals */}
      {showDetailsModal && selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setShowDetailsModal(false)}
          onReschedule={() => {
            setShowDetailsModal(false);
            setShowRescheduleModal(true);
          }}
          onPayment={() => {
            setShowDetailsModal(false);
            setShowPaymentModal(true);
          }}
        />
      )}

      {showRescheduleModal && selectedAppointment && (
        <RescheduleModal
          appointment={selectedAppointment}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={(newDate, newTime) => {
            onUpdateAppointment(selectedAppointment.id, { date: newDate, time: newTime });
            setShowRescheduleModal(false);
            addNotification('Appointment rescheduled successfully', 'success');
          }}
        />
      )}

      {showPaymentModal && selectedAppointment && (
        <PaymentModal
          appointment={selectedAppointment}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={() => {
            onUpdateAppointment(selectedAppointment.id, { 
              status: 'confirmed',
              billing: { ...selectedAppointment.billing, status: 'paid' }
            });
            setShowPaymentModal(false);
            addNotification('Payment successful!', 'success');
          }}
        />
      )}

      {showDoctorModal && selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setShowDoctorModal(false)}
          onBookAppointment={() => {
            setShowDoctorModal(false);
            onBookAppointment(selectedDoctor);
          }}
        />
      )}

      {/* Notification Center */}
      <NotificationCenter
        notifications={notifications}
        onRemoveNotification={(id) => {
          setNotifications(prev => prev.filter(n => n.id !== id));
        }}
      />
    </div>
  );
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map(interval => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span key={interval} className="countdown-unit">
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div className="countdown-timer">
      {timerComponents.length ? timerComponents : <span>Appointment time reached!</span>}
    </div>
  );
};

export default AppointmentsSection;
