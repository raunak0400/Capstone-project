import React from 'react';
import { 
  XIcon, 
  CreditCardIcon, 
  DownloadIcon, 
  PrinterIcon,
  ShareIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  OfficeBuildingIcon,
  CashIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline';

const InvoiceModal = ({ isOpen, onClose, invoice, onPayNow, onDownloadReceipt }) => {
  if (!isOpen || !invoice) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'Overdue':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && invoice.status !== 'Paid';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-auto transform transition-all max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Invoice Details</h2>
                <p className="text-gray-600 mt-1">Invoice #{invoice.invoiceNumber}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <PrinterIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Invoice Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Hospital Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <OfficeBuildingIcon className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Healthcare Center</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-medium">MedCare Hospital</p>
                  <p>123 Health Street</p>
                  <p>Medical District, City 12345</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Email: billing@medcare.com</p>
                </div>
              </div>

              {/* Invoice Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Invoice Information</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number:</span>
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Date:</span>
                    <span className="font-medium">{formatDate(invoice.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span className={`font-medium ${isOverdue(invoice.dueDate) ? 'text-red-600' : ''}`}>
                      {formatDate(invoice.dueDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1">{invoice.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <UserIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Service Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Service Description</p>
                    <p className="font-medium text-gray-800">{invoice.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium text-gray-800">{invoice.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Doctor</p>
                    <p className="font-medium text-gray-800">{invoice.doctor}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Service Date</p>
                    <p className="font-medium text-gray-800">{formatDate(invoice.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium text-gray-800">{invoice.category}</p>
                  </div>
                  {invoice.paymentMethod && (
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium text-gray-800">{invoice.paymentMethod}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <CashIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Cost Breakdown</h3>
              </div>
              
              <div className="space-y-3">
                {invoice.breakdown.consultation > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-medium">{formatCurrency(invoice.breakdown.consultation)}</span>
                  </div>
                )}
                {invoice.breakdown.labTests > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Lab Tests</span>
                    <span className="font-medium">{formatCurrency(invoice.breakdown.labTests)}</span>
                  </div>
                )}
                {invoice.breakdown.pharmacy > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Pharmacy</span>
                    <span className="font-medium">{formatCurrency(invoice.breakdown.pharmacy)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">{formatCurrency(invoice.breakdown.taxes)}</span>
                </div>
                {invoice.breakdown.discount > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-{formatCurrency(invoice.breakdown.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-t-2 border-gray-200">
                  <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                  <span className="text-xl font-bold text-gray-800">{formatCurrency(invoice.breakdown.total)}</span>
                </div>
              </div>

              {/* Insurance Information */}
              {invoice.insuranceClaimed && (
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Insurance Coverage</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600">Insurance Amount</p>
                      <p className="font-semibold text-blue-800">{formatCurrency(invoice.insuranceAmount)}</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Patient Amount</p>
                      <p className="font-semibold text-blue-800">{formatCurrency(invoice.patientAmount)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Information */}
            {invoice.status === 'Paid' && invoice.paidDate && (
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800">Payment Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-green-600">Payment Date</p>
                    <p className="font-semibold text-green-800">{formatDate(invoice.paidDate)}</p>
                  </div>
                  <div>
                    <p className="text-green-600">Payment Method</p>
                    <p className="font-semibold text-green-800">{invoice.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-green-600">Transaction ID</p>
                    <p className="font-semibold text-green-800">{invoice.transactionId}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {invoice.status === 'Paid' && invoice.receiptUrl && (
                <button
                  onClick={() => onDownloadReceipt(invoice)}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Download Receipt
                </button>
              )}
              
              {invoice.status !== 'Paid' && (
                <button
                  onClick={() => onPayNow(invoice)}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <CreditCardIcon className="h-5 w-5 mr-2" />
                  Pay Now
                </button>
              )}
              
              <button
                onClick={onClose}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
