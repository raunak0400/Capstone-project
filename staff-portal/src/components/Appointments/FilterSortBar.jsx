import React from 'react';
import './FilterSortBar.css';

const FilterSortBar = ({ 
  filterStatus, 
  setFilterStatus, 
  sortBy, 
  setSortBy, 
  sortOrder, 
  setSortOrder,
  appointmentCount 
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Appointments', icon: '📅' },
    { value: 'upcoming', label: 'Upcoming', icon: '⏰' },
    { value: 'past', label: 'Past', icon: '📋' },
    { value: 'pending', label: 'Pending', icon: '⏳' },
    { value: 'confirmed', label: 'Confirmed', icon: '✅' },
    { value: 'cancelled', label: 'Cancelled', icon: '❌' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'status', label: 'Status' },
  ];

  return (
    <div className="filter-sort-bar">
      <div className="filter-section">
        <div className="filter-label">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filter by Status</span>
        </div>
        <div className="filter-buttons">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`filter-btn ${filterStatus === option.value ? 'active' : ''}`}
              onClick={() => setFilterStatus(option.value)}
            >
              <span className="filter-icon">{option.icon}</span>
              <span className="filter-text">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sort-section">
        <div className="sort-label">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>Sort by</span>
        </div>
        <div className="sort-controls">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className={`sort-order-btn ${sortOrder === 'asc' ? 'asc' : 'desc'}`}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sortOrder === 'asc' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="results-count">
        <div className="count-badge">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>{appointmentCount} appointments</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;
