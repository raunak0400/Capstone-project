import React, { useState } from 'react';
import { 
  XIcon, 
  CreditCardIcon, 
  DeviceMobileIcon, 
  LibraryIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline';

const PaymentModal = ({ isOpen, onClose, invoice, onPayment, loading = false }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    bankAccount: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCardIcon className="h-6 w-6" />,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <DeviceMobileIcon className="h-6 w-6" />,
      description: 'PhonePe, Google Pay, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <LibraryIcon className="h-6 w-6" />,
      description: 'Direct bank transfer'
    }
  ];

  const validatePaymentData = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!paymentData.expiryDate) {
        newErrors.expiryDate = 'Please enter expiry date';
      }
      if (!paymentData.cvv || paymentData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!paymentData.cardName) {
        newErrors.cardName = 'Please enter cardholder name';
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentData.upiId || !paymentData.upiId.includes('@')) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    } else if (paymentMethod === 'netbanking') {
      if (!paymentData.bankAccount) {
        newErrors.bankAccount = 'Please enter bank account number';
      }
      if (!paymentData.ifscCode) {
        newErrors.ifscCode = 'Please enter IFSC code';
      }
      if (!paymentData.accountHolderName) {
        newErrors.accountHolderName = 'Please enter account holder name';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentData()) {
      return;
    }

    setProcessing(true);
    
    try {
      await onPayment({
        method: paymentMethods.find(pm => pm.id === paymentMethod)?.name || paymentMethod,
        data: paymentData,
        invoiceId: invoice?.id
      });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
  };

  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto transform transition-all max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
                <p className="text-gray-600 mt-1">Invoice #{invoice.invoiceNumber}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Invoice Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{invoice.description}</h3>
                  <p className="text-sm text-gray-600">{invoice.department} • {invoice.doctor}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(invoice.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(invoice.amount)}</p>
                  {invoice.insuranceClaimed && (
                    <p className="text-sm text-blue-600">
                      Insurance: {formatCurrency(invoice.insuranceAmount)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`payment-method-option ${paymentMethod === method.id ? 'selected' : ''}`}
                  >
                    <div className="method-icon">
                      {method.icon}
                    </div>
                    <div className="method-info">
                      <h4 className="method-name">{method.name}</h4>
                      <p className="method-description">{method.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({...paymentData, expiryDate: formatExpiryDate(e.target.value)})}
                        placeholder="MM/YY"
                        className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                        maxLength={5}
                      />
                      {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/\D/g, '')})}
                        placeholder="123"
                        className={`form-input ${errors.cvv ? 'error' : ''}`}
                        maxLength={4}
                      />
                      {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                      placeholder="John Doe"
                      className={`form-input ${errors.cardName ? 'error' : ''}`}
                    />
                    {errors.cardName && <p className="error-message">{errors.cardName}</p>}
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="form-label">UPI ID</label>
                    <input
                      type="text"
                      value={paymentData.upiId}
                      onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})}
                      placeholder="yourname@paytm"
                      className={`form-input ${errors.upiId ? 'error' : ''}`}
                    />
                    {errors.upiId && <p className="error-message">{errors.upiId}</p>}
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <DeviceMobileIcon className="h-5 w-5 text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">
                        You will be redirected to your UPI app to complete the payment
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking Form */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Bank Account Number</label>
                    <input
                      type="text"
                      value={paymentData.bankAccount}
                      onChange={(e) => setPaymentData({...paymentData, bankAccount: e.target.value.replace(/\D/g, '')})}
                      placeholder="1234567890"
                      className={`form-input ${errors.bankAccount ? 'error' : ''}`}
                    />
                    {errors.bankAccount && <p className="error-message">{errors.bankAccount}</p>}
                  </div>

                  <div>
                    <label className="form-label">IFSC Code</label>
                    <input
                      type="text"
                      value={paymentData.ifscCode}
                      onChange={(e) => setPaymentData({...paymentData, ifscCode: e.target.value.toUpperCase()})}
                      placeholder="SBIN0001234"
                      className={`form-input ${errors.ifscCode ? 'error' : ''}`}
                    />
                    {errors.ifscCode && <p className="error-message">{errors.ifscCode}</p>}
                  </div>

                  <div>
                    <label className="form-label">Account Holder Name</label>
                    <input
                      type="text"
                      value={paymentData.accountHolderName}
                      onChange={(e) => setPaymentData({...paymentData, accountHolderName: e.target.value})}
                      placeholder="John Doe"
                      className={`form-input ${errors.accountHolderName ? 'error' : ''}`}
                    />
                    {errors.accountHolderName && <p className="error-message">{errors.accountHolderName}</p>}
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Secure Payment</p>
                    <p className="text-sm text-green-600">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Amount to Pay:</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(invoice.amount)}</span>
                </div>
                {invoice.insuranceClaimed && (
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-600">Insurance Coverage:</span>
                    <span className="text-blue-600">{formatCurrency(invoice.insuranceAmount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Amount:</span>
                    <span className="text-xl font-bold text-gray-800">{formatCurrency(invoice.amount)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <LockClosedIcon className="h-4 w-4 mr-2" />
                      Pay {formatCurrency(invoice.amount)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
