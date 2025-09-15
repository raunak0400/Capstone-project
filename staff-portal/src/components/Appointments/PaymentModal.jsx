import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ appointment, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState('method'); // 'method', 'processing', 'success'

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: '💳',
      description: 'Pay with UPI, Cards, Net Banking',
      popular: true
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: '💳',
      description: 'International cards accepted',
      popular: false
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pay with PayPal account',
      popular: false
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱',
      description: 'Pay with UPI apps',
      popular: true
    }
  ];

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTaxes = () => {
    const baseAmount = appointment.billing.amount;
    const gst = baseAmount * 0.18; // 18% GST
    const total = baseAmount + gst;
    return { baseAmount, gst, total };
  };

  const { baseAmount, gst, total } = calculateTaxes();

  if (paymentStep === 'processing') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="payment-modal processing" onClick={(e) => e.stopPropagation()}>
          <div className="processing-content">
            <div className="processing-spinner">
              <div className="spinner"></div>
            </div>
            <h2 className="processing-title">Processing Payment</h2>
            <p className="processing-text">Please wait while we process your payment...</p>
            <div className="processing-steps">
              <div className="step active">
                <div className="step-icon">1</div>
                <span>Validating payment method</span>
              </div>
              <div className="step active">
                <div className="step-icon">2</div>
                <span>Processing transaction</span>
              </div>
              <div className="step">
                <div className="step-icon">3</div>
                <span>Confirming payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="payment-modal success" onClick={(e) => e.stopPropagation()}>
          <div className="success-content">
            <div className="success-icon">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="success-title">Payment Successful!</h2>
            <p className="success-text">Your appointment has been confirmed and payment has been processed.</p>
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-label">Transaction ID:</span>
                <span className="detail-value">TXN-{Date.now()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Amount Paid:</span>
                <span className="detail-value">₹{total}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment Method:</span>
                <span className="detail-value">{paymentMethods.find(m => m.id === paymentMethod)?.name}</span>
              </div>
            </div>
            <div className="success-actions">
              <button className="btn-primary" onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <h2 className="modal-title">Payment</h2>
            <p className="modal-subtitle">Complete your appointment payment</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Appointment Summary */}
        <div className="appointment-summary">
          <h3 className="summary-title">Appointment Summary</h3>
          <div className="summary-details">
            <div className="summary-item">
              <span className="summary-label">Doctor:</span>
              <span className="summary-value">{appointment.doctor.name}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Date:</span>
              <span className="summary-value">{formatDate(appointment.date)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Time:</span>
              <span className="summary-value">{appointment.time}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Type:</span>
              <span className="summary-value">{appointment.type}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h3 className="methods-title">Select Payment Method</h3>
          <div className="methods-grid">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`method-option ${paymentMethod === method.id ? 'selected' : ''} ${method.popular ? 'popular' : ''}`}
                onClick={() => setPaymentMethod(method.id)}
              >
                {method.popular && <div className="popular-badge">Popular</div>}
                <div className="method-icon">{method.icon}</div>
                <div className="method-info">
                  <h4 className="method-name">{method.name}</h4>
                  <p className="method-description">{method.description}</p>
                </div>
                <div className="method-radio">
                  <div className={`radio-dot ${paymentMethod === method.id ? 'selected' : ''}`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <h3 className="summary-title">Payment Summary</h3>
          <div className="summary-breakdown">
            <div className="breakdown-item">
              <span className="breakdown-label">Consultation Fee:</span>
              <span className="breakdown-value">₹{baseAmount}</span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">GST (18%):</span>
              <span className="breakdown-value">₹{gst.toFixed(2)}</span>
            </div>
            <div className="breakdown-total">
              <span className="total-label">Total Amount:</span>
              <span className="total-value">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <div className="security-header">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <p>Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.</p>
        </div>

        {/* Payment Actions */}
        <div className="payment-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-primary"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Pay ₹{total.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
