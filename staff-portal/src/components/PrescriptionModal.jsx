import React from 'react';
import { XIcon } from '@heroicons/react/outline';

const PrescriptionModal = ({ isOpen, onClose, prescriptions = [] }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />
                
                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-auto transform transition-all max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-gray-800">Prescriptions</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid gap-6">
                            {prescriptions.map((prescription) => (
                                <div key={prescription.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {prescription.medication}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            prescription.status === 'Active' 
                                                ? 'bg-green-100 text-green-600' 
                                                : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {prescription.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Dosage</p>
                                            <p className="font-medium">{prescription.dosage}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Prescribed By</p>
                                            <p className="font-medium">Dr. {prescription.prescribedBy}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Prescribed Date</p>
                                            <p className="font-medium">{new Date(prescription.prescribedDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Refills Remaining</p>
                                            <p className="font-medium">{prescription.refills}</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download
                                        </button>
                                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                            </svg>
                                            Request Refill
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionModal;
