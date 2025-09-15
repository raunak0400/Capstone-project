import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import toast from 'react-hot-toast';
import { 
  UserIcon, 
  LockClosedIcon, 
  ShieldCheckIcon,
  EyeIcon,
  EyeOffIcon
} from '@heroicons/react/outline';

const StaffLogin = () => {
  const { login, isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    const roleRedirects = {
      admin: '/admin',
      doctor: '/doctor',
      nurse: '/nurse',
      receptionist: '/receptionist',
      pharmacist: '/pharmacist'
    };
    return <Navigate to={roleRedirects[user?.role] || '/'} replace />;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success(`Welcome, ${result.user.name}!`);
        
        // Redirect based on role
        const roleRedirects = {
          admin: '/admin',
          doctor: '/doctor',
          nurse: '/nurse',
          receptionist: '/receptionist',
          pharmacist: '/pharmacist'
        };
        
        window.location.href = roleRedirects[result.user.role] || '/';
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@healthcare.com', password: 'admin123' },
    { role: 'Doctor', email: 'doctor@healthcare.com', password: 'doctor123' },
    { role: 'Nurse', email: 'nurse@healthcare.com', password: 'nurse123' },
    { role: 'Receptionist', email: 'receptionist@healthcare.com', password: 'receptionist123' },
    { role: 'Pharmacist', email: 'pharmacist@healthcare.com', password: 'pharmacist123' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <ShieldCheckIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Staff Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Healthcare Management System
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Authorized personnel only
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Demo Credentials</h3>
          <div className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{cred.role}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        email: cred.email,
                        password: cred.password
                      });
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Use
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {cred.email} / {cred.password}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            This is a restricted portal for healthcare staff only.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Patients should use the main portal at{' '}
            <a href="http://localhost:3000" className="text-blue-600 hover:underline">
              localhost:3000
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
