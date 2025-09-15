import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const StaffDashboard = () => {
  const { user } = useAuth();

  // Redirect to role-specific dashboard
  const roleRedirects = {
    admin: '/admin',
    doctor: '/doctor',
    nurse: '/nurse',
    receptionist: '/receptionist',
    pharmacist: '/pharmacist'
  };

  return <Navigate to={roleRedirects[user?.role] || '/login'} replace />;
};

export default StaffDashboard;
