import React from 'react';
import { CheckCircleIcon, XIcon } from '@heroicons/react/outline';

const SuccessModal = ({ isOpen, onClose, appointmentData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Appointment Booked Successfully!
            </h3>

            {/* Appointment Details */}
            {appointmentData && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Appointment Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{appointmentData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{appointmentData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{appointmentData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-blue-600 capitalize">{appointmentData.status}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked. You will receive a confirmation email shortly.
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
