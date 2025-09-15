import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('staffToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('staffToken');
      localStorage.removeItem('staffUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Staff Auth API
export const staffAuthAPI = {
  login: (credentials) => api.post('/staff/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('staffToken');
    localStorage.removeItem('staffUser');
  },
};

// Patient API for Staff
export const patientAPI = {
  // Get all patients with search and pagination
  getPatients: (params = {}) => {
    const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc' } = params;
    return api.get('/staff/patients', {
      params: { page, limit, search, sortBy, sortOrder }
    });
  },

  // Get single patient
  getPatient: (id) => api.get(`/staff/patients/${id}`),

  // Create new patient
  createPatient: (patientData) => api.post('/staff/patients', patientData),

  // Update patient
  updatePatient: (id, patientData) => api.put(`/staff/patients/${id}`, patientData),

  // Delete patient
  deletePatient: (id) => api.delete(`/staff/patients/${id}`),
};

// Staff Analytics API
export const staffAnalyticsAPI = {
  // Get dashboard stats for staff
  getDashboardStats: (role) => api.get(`/staff/analytics/dashboard/${role}`),

  // Get gender distribution
  getGenderDistribution: () => api.get('/staff/analytics/gender'),

  // Get age distribution
  getAgeDistribution: () => api.get('/staff/analytics/age'),

  // Get patients over time
  getPatientsOverTime: () => api.get('/staff/analytics/patients-over-time'),
};

// Appointment API for Staff
export const appointmentAPI = {
  // Get appointments (staff endpoint)
  getAppointments: (params = {}) => {
    const { page = 1, limit = 10, date = '', doctor = '', status = '' } = params;
    return api.get('/staff/appointments', {
      params: { page, limit, date, doctor, status }
    });
  },

  // Create appointment
  createAppointment: (appointmentData) => api.post('/staff/appointments', appointmentData),

  // Update appointment
  updateAppointment: (id, appointmentData) => api.put(`/staff/appointments/${id}`, appointmentData),

  // Delete appointment
  deleteAppointment: (id) => api.delete(`/staff/appointments/${id}`),
};

// Staff Management API (Admin only)
export const staffAPI = {
  // Get all staff
  getStaff: (params = {}) => {
    const { page = 1, limit = 10, role = '', search = '' } = params;
    return api.get('/admin/staff', {
      params: { page, limit, role, search }
    });
  },

  // Create staff member
  createStaff: (staffData) => api.post('/admin/staff', staffData),

  // Update staff member
  updateStaff: (id, staffData) => api.put(`/admin/staff/${id}`, staffData),

  // Delete staff member
  deleteStaff: (id) => api.delete(`/admin/staff/${id}`),
};

// Pharmacy API
export const pharmacyAPI = {
  // Get prescriptions
  getPrescriptions: (params = {}) => {
    const { page = 1, limit = 10, status = '', search = '' } = params;
    return api.get('/pharmacy/prescriptions', {
      params: { page, limit, status, search }
    });
  },

  // Update prescription status
  updatePrescriptionStatus: (id, status) => api.put(`/pharmacy/prescriptions/${id}/status`, { status }),

  // Get inventory
  getInventory: () => api.get('/pharmacy/inventory'),
};

export default api;
