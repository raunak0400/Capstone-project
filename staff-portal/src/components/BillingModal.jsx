import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

const BillingModal = ({ isOpen, onClose, billingHistory = [] }) => {
    const [selectedBill, setSelectedBill] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);

    const handlePayment = async (bill) => {
        setSelectedBill(bill);
        setLoading(true);

        // Simulate payment process
        setTimeout(() => {
            setLoading(false);
            toast.success('Payment processed successfully!');
            setSelectedBill(null);
        }, 2000);
    };

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
                            <h2 className="text-3xl font-bold text-gray-800">Billing & Payments</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Billing Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-green-50 rounded-xl p-4 text-center">
                                <h3 className="text-sm text-gray-600 mb-1">Total Paid</h3>
                                <p className="text-2xl font-bold text-green-600">
                                    ₹{billingHistory.reduce((sum, bill) => sum + (bill.status === 'Paid' ? bill.amount : 0), 0)}
                                </p>
                            </div>
                            <div className="bg-yellow-50 rounded-xl p-4 text-center">
                                <h3 className="text-sm text-gray-600 mb-1">Pending Amount</h3>
                                <p className="text-2xl font-bold text-yellow-600">
                                    ₹{billingHistory.reduce((sum, bill) => sum + (bill.status === 'Pending' ? bill.amount : 0), 0)}
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4 text-center">
                                <h3 className="text-sm text-gray-600 mb-1">Total Bills</h3>
                                <p className="text-2xl font-bold text-blue-600">{billingHistory.length}</p>
                            </div>
                        </div>

                        {/* Billing History */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h3>
                            {billingHistory.map((bill) => (
                                <div key={bill.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">{bill.description}</h4>
                                            <p className="text-gray-600">{new Date(bill.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-800">₹{bill.amount}</p>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                bill.status === 'Paid' 
                                                    ? 'bg-green-100 text-green-600' 
                                                    : 'bg-yellow-100 text-yellow-600'
                                            }`}>
                                                {bill.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        {bill.status === 'Paid' ? (
                                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Download Receipt
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handlePayment(bill)}
                                                disabled={loading}
                                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                                            >
                                                {loading && selectedBill?.id === bill.id ? (
                                                    <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                )}
                                                {loading && selectedBill?.id === bill.id ? 'Processing...' : 'Pay Now'}
                                            </button>
                                        )}
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

export default BillingModal;
