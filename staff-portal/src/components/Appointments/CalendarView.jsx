import React, { useState } from 'react';
import './CalendarView.css';

const CalendarView = ({ appointments, onAppointmentClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === date.toDateString();
    });
  };

  const getAppointmentsForWeek = (startDate) => {
    const weekAppointments = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekAppointments.push(...getAppointmentsForDate(date));
    }
    return weekAppointments;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const navigateWeek = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + (direction * 7));
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getWeekStartDate = (date) => {
    const startDate = new Date(date);
    const day = startDate.getDay();
    startDate.setDate(startDate.getDate() - day);
    return startDate;
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

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date && date < today;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return (
      <div className="calendar-month-view">
        <div className="calendar-header">
          <button className="nav-btn" onClick={() => navigateMonth(-1)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="calendar-title">{monthName} {year}</h2>
          <button className="nav-btn" onClick={() => navigateMonth(1)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="calendar-grid">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => {
            const dayAppointments = getAppointmentsForDate(day);
            const isCurrentDay = isToday(day);
            const isPastDay = isPast(day);
            
            return (
              <div
                key={index}
                className={`calendar-day ${isCurrentDay ? 'today' : ''} ${isPastDay ? 'past' : ''} ${!day ? 'empty' : ''}`}
              >
                {day && (
                  <>
                    <div className="day-number">{day.getDate()}</div>
                    <div className="day-appointments">
                      {dayAppointments.slice(0, 3).map((appointment, aptIndex) => (
                        <div
                          key={aptIndex}
                          className="appointment-dot"
                          style={{ backgroundColor: getStatusColor(appointment.status) }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAppointmentClick(appointment);
                          }}
                          title={`${appointment.doctor.name} - ${appointment.time}`}
                        />
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="more-appointments">
                          +{dayAppointments.length - 3}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = getWeekStartDate(currentDate);
    const weekAppointments = getAppointmentsForWeek(weekStart);

    return (
      <div className="calendar-week-view">
        <div className="calendar-header">
          <button className="nav-btn" onClick={() => navigateWeek(-1)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="calendar-title">
            {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
            {new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h2>
          <button className="nav-btn" onClick={() => navigateWeek(1)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="week-grid">
          {dayNames.map((dayName, index) => {
            const dayDate = new Date(weekStart);
            dayDate.setDate(weekStart.getDate() + index);
            const dayAppointments = getAppointmentsForDate(dayDate);
            const isCurrentDay = isToday(dayDate);
            const isPastDay = isPast(dayDate);

            return (
              <div key={index} className={`week-day ${isCurrentDay ? 'today' : ''} ${isPastDay ? 'past' : ''}`}>
                <div className="week-day-header">
                  <div className="week-day-name">{dayName}</div>
                  <div className="week-day-number">{dayDate.getDate()}</div>
                </div>
                <div className="week-appointments">
                  {dayAppointments.map((appointment, aptIndex) => (
                    <div
                      key={aptIndex}
                      className="week-appointment"
                      style={{ borderLeftColor: getStatusColor(appointment.status) }}
                      onClick={() => onAppointmentClick(appointment)}
                    >
                      <div className="appointment-time">{appointment.time}</div>
                      <div className="appointment-doctor">{appointment.doctor.name}</div>
                      <div className="appointment-type">{appointment.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-view">
      <div className="calendar-controls">
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button 
            className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
        </div>
        <button className="today-btn" onClick={goToToday}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Today
        </button>
      </div>

      <div className="calendar-container">
        {viewMode === 'month' ? renderMonthView() : renderWeekView()}
      </div>

      <div className="calendar-legend">
        <div className="legend-title">Status Legend:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#56ab2f' }}></div>
            <span>Confirmed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#f093fb' }}></div>
            <span>Pending</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#ff416c' }}></div>
            <span>Cancelled</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#4facfe' }}></div>
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
