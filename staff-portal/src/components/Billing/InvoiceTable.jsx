import React from 'react';
import { 
  EyeIcon, 
  CreditCardIcon, 
  DownloadIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';

const InvoiceTable = ({ 
  invoices, 
  onViewInvoice, 
  onPayNow, 
  onDownloadReceipt,
  sortBy,
  onSort,
  loading 
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="w-3 h-3 mr-1" />
            Paid
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'Overdue':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ExclamationCircleIcon className="w-3 h-3 mr-1" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

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
      month: 'short',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => onSort('invoiceNumber')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Invoice No</span>
                  {sortBy === 'invoiceNumber' && <span className="text-blue-500">↓</span>}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => onSort('date')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Date</span>
                  {sortBy === 'date' && <span className="text-blue-500">↓</span>}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service/Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => onSort('amount')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Amount</span>
                  {sortBy === 'amount' && <span className="text-blue-500">↓</span>}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Loading invoices...</p>
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.invoiceNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {formatDate(invoice.dueDate)}
                      {isOverdue(invoice.dueDate) && invoice.status !== 'Paid' && (
                        <span className="ml-2 text-red-500 text-xs">(Overdue)</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {invoice.department} • {invoice.doctor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </div>
                    {invoice.insuranceClaimed && (
                      <div className="text-xs text-blue-600">
                        Insurance: {formatCurrency(invoice.insuranceAmount)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                      
                      {invoice.status === 'Paid' ? (
                        <button
                          onClick={() => onDownloadReceipt(invoice)}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <DownloadIcon className="h-4 w-4 mr-1" />
                          Receipt
                        </button>
                      ) : (
                        <button
                          onClick={() => onPayNow(invoice)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center text-sm"
                        >
                          <CreditCardIcon className="h-4 w-4 mr-1" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
