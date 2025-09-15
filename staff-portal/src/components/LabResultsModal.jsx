import React from 'react';
import { XIcon } from '@heroicons/react/outline';

const LabResultsModal = ({ isOpen, onClose, labResults = [] }) => {
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
                            <h2 className="text-3xl font-bold text-gray-800">Lab Results</h2>
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
                            {labResults.map((result) => (
                                <div key={result.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {result.testName}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            result.status === 'Normal' 
                                                ? 'bg-green-100 text-green-600' 
                                                : result.status === 'Slightly Elevated'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-red-100 text-red-600'
                                        }`}>
                                            {result.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Test Date</p>
                                            <p className="font-medium">{new Date(result.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Ordered By</p>
                                            <p className="font-medium">Dr. {result.doctor}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-2">Results</p>
                                        <p className="text-gray-800 bg-white p-3 rounded-lg border">
                                            {result.results}
                                        </p>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download Report
                                        </button>
                                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Discuss with Doctor
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

export default LabResultsModal;
