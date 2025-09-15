import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/auth';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Import staff role pages
import AdminDashboard from './pages/AdminMain/AdminDashboard';
import AdminPage from './pages/AdminMain/AdminPage';
import Management from './pages/AdminMain/Management';
import ManageStaff from './pages/AdminMain/ManageStaff';

import DoctorDashboard from './pages/DoctorMain/DoctorDashboard';
import DoctorPage from './pages/DoctorMain/DoctorPage';
import DoctorAppointments from './pages/DoctorMain/Appointments';
import EditPatient from './pages/DoctorMain/EditPatient';
import DoctorReport from './pages/DoctorMain/Report';

import NurseDashboard from './pages/NurseMain/NurDashboard';
import NursePage from './pages/NurseMain/NursePage';
import PatientCare from './pages/NurseMain/PaitientCare';

import ReceptionistDashboard from './pages/Receptionist/ReceptionistDashboard';
import ReceptionistPage from './pages/Receptionist/ReceptionistPage';
import AddPatient from './pages/Receptionist/AddPatient';
import EditPatientReceptionist from './pages/Receptionist/EditPatient';
import Patients from './pages/Receptionist/Patients';
import AddAppointment from './pages/Receptionist/AddAppointment';

import PharmacistDashboard from './pages/PharmacistMain/PharmacistDashboard';
import PharmacistPage from './pages/PharmacistMain/PharmacistPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<StaffLogin />} />
            
            {/* Protected Staff Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <StaffDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/management" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Management />
              </ProtectedRoute>
            } />
            <Route path="/admin/staff" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageStaff />
              </ProtectedRoute>
            } />
            
            {/* Doctor Routes */}
            <Route path="/doctor" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorPage />
              </ProtectedRoute>
            } />
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor/appointments" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorAppointments />
              </ProtectedRoute>
            } />
            <Route path="/doctor/edit-patient/:id" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <EditPatient />
              </ProtectedRoute>
            } />
            <Route path="/doctor/reports" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorReport />
              </ProtectedRoute>
            } />
            
            {/* Nurse Routes */}
            <Route path="/nurse" element={
              <ProtectedRoute allowedRoles={['nurse']}>
                <NursePage />
              </ProtectedRoute>
            } />
            <Route path="/nurse/dashboard" element={
              <ProtectedRoute allowedRoles={['nurse']}>
                <NurseDashboard />
              </ProtectedRoute>
            } />
            <Route path="/nurse/patient-care" element={
              <ProtectedRoute allowedRoles={['nurse']}>
                <PatientCare />
              </ProtectedRoute>
            } />
            
            {/* Receptionist Routes */}
            <Route path="/receptionist" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <ReceptionistPage />
              </ProtectedRoute>
            } />
            <Route path="/receptionist/dashboard" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <ReceptionistDashboard />
              </ProtectedRoute>
            } />
            <Route path="/receptionist/patients" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <Patients />
              </ProtectedRoute>
            } />
            <Route path="/receptionist/add-patient" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <AddPatient />
              </ProtectedRoute>
            } />
            <Route path="/receptionist/edit-patient/:id" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <EditPatientReceptionist />
              </ProtectedRoute>
            } />
            <Route path="/receptionist/add-appointment" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <AddAppointment />
              </ProtectedRoute>
            } />
            
            {/* Pharmacist Routes */}
            <Route path="/pharmacist" element={
              <ProtectedRoute allowedRoles={['pharmacist']}>
                <PharmacistPage />
              </ProtectedRoute>
            } />
            <Route path="/pharmacist/dashboard" element={
              <ProtectedRoute allowedRoles={['pharmacist']}>
                <PharmacistDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
