import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import PharmacistDashboard from './PharmacistDashboard';

const PharmacistPage = () => {
  const { user } = useAuth();

  // Check if user is a pharmacist
  if (user?.role !== 'pharmacist') {
    return <Navigate to="/login" replace />;
  }

  return <PharmacistDashboard />;
};

export default PharmacistPage;
