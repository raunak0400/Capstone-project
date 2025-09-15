import React, { useState, useEffect } from 'react';
import { 
  CreditCardIcon, 
  DocumentTextIcon, 
  DownloadIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  ClockIcon,
  EyeIcon,
  TrendingUpIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  FilterIcon,
  SearchIcon,
  CashIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ReceiptTaxIcon,
  DeviceMobileIcon,
  LibraryIcon,
  XIcon
} from '@heroicons/react/outline';
import { billingInvoices, paymentMethods, billingStats } from '../../data/billingData';
import InvoiceTable from './InvoiceTable';
import PaymentModal from './PaymentModal';
import InvoiceModal from './InvoiceModal';
import PaymentHistoryChart from './PaymentHistoryChart';

const BillingSection = ({ billingHistory = [], onUpdateBilling }) => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    status: 'All Status',
    category: 'All Categories',
    department: 'All Departments',
    dateRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Enhanced billing data with more comprehensive information
  const [billingData, setBillingData] = useState({
    totalDue: 0,
    lastPaymentDate: null,
    lifetimePaid: 0,
    overdueAmount: 0,
    pendingAmount: 0,
    totalInvoices: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    monthlySpending: [],
    paymentMethods: [],
    upcomingPayments: [],
    insuranceClaims: []
  });

  useEffect(() => {
    loadBillingData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [invoices, filters, searchTerm, sortBy, sortOrder]);

  const loadBillingData = () => {
    setLoading(true);
    
    // Enhanced mock data with more comprehensive billing information
    const enhancedInvoices = [
      {
        id: 1,
        invoiceNumber: 'INV-2024-001',
        date: '2024-01-10',
        dueDate: '2024-01-25',
        description: 'Consultation with Dr. Smith',
        department: 'Cardiology',
        doctor: 'Dr. Smith',
        amount: 500,
        status: 'Paid',
        paymentMethod: 'Credit Card',
        category: 'Consultation',
        insuranceClaimed: true,
        insuranceAmount: 400,
        patientAmount: 100,
        paidDate: '2024-01-12',
        breakdown: {
          consultation: 400,
          labTests: 0,
          pharmacy: 0,
          taxes: 50,
          discount: 0,
          total: 500
        },
        receiptUrl: '/receipts/INV-2024-001.pdf',
        paymentId: 'PAY-001',
        transactionId: 'TXN-001'
      },
      {
        id: 2,
        invoiceNumber: 'INV-2024-002',
        date: '2024-01-15',
        dueDate: '2024-01-30',
        description: 'Lab Tests - CBC, Glucose, Lipid Panel',
        department: 'Laboratory',
        doctor: 'Dr. Johnson',
        amount: 300,
        status: 'Pending',
        paymentMethod: null,
        category: 'Laboratory',
        insuranceClaimed: false,
        insuranceAmount: 0,
        patientAmount: 300,
        paidDate: null,
        breakdown: {
          consultation: 0,
          labTests: 250,
          pharmacy: 0,
          taxes: 30,
          discount: 0,
          total: 300
        },
        receiptUrl: null,
        paymentId: null,
        transactionId: null
      },
      {
        id: 3,
        invoiceNumber: 'INV-2024-003',
        date: '2024-01-08',
        dueDate: '2024-01-23',
        description: 'Prescription - Metformin, Lisinopril',
        department: 'Pharmacy',
        doctor: 'Dr. Williams',
        amount: 45,
        status: 'Paid',
        paymentMethod: 'UPI',
        category: 'Pharmacy',
        insuranceClaimed: true,
        insuranceAmount: 35,
        patientAmount: 10,
        paidDate: '2024-01-08',
        breakdown: {
          consultation: 0,
          labTests: 0,
          pharmacy: 40,
          taxes: 5,
          discount: 0,
          total: 45
        },
        receiptUrl: '/receipts/INV-2024-003.pdf',
        paymentId: 'PAY-003',
        transactionId: 'TXN-003'
      },
      {
        id: 4,
        invoiceNumber: 'INV-2024-004',
        date: '2024-01-05',
        dueDate: '2024-01-20',
        description: 'Follow-up Consultation - Dr. Johnson',
        department: 'Internal Medicine',
        doctor: 'Dr. Johnson',
        amount: 350,
        status: 'Overdue',
        paymentMethod: null,
        category: 'Consultation',
        insuranceClaimed: true,
        insuranceAmount: 280,
        patientAmount: 70,
        paidDate: null,
        breakdown: {
          consultation: 300,
          labTests: 0,
          pharmacy: 0,
          taxes: 35,
          discount: 0,
          total: 350
        },
        receiptUrl: null,
        paymentId: null,
        transactionId: null
      },
      {
        id: 5,
        invoiceNumber: 'INV-2024-005',
        date: '2024-01-20',
        dueDate: '2024-02-05',
        description: 'X-Ray - Chest',
        department: 'Radiology',
        doctor: 'Dr. Brown',
        amount: 150,
        status: 'Pending',
        paymentMethod: null,
        category: 'Imaging',
        insuranceClaimed: false,
        insuranceAmount: 0,
        patientAmount: 150,
        paidDate: null,
        breakdown: {
          consultation: 0,
          labTests: 0,
          pharmacy: 0,
          taxes: 15,
          discount: 0,
          total: 150
        },
        receiptUrl: null,
        paymentId: null,
        transactionId: null
      },
      {
        id: 6,
        invoiceNumber: 'INV-2024-006',
        date: '2024-01-25',
        dueDate: '2024-02-10',
        description: 'Emergency Visit - Dr. Wilson',
        department: 'Emergency',
        doctor: 'Dr. Wilson',
        amount: 800,
        status: 'Pending',
        paymentMethod: null,
        category: 'Emergency',
        insuranceClaimed: true,
        insuranceAmount: 600,
        patientAmount: 200,
        paidDate: null,
        breakdown: {
          consultation: 600,
          labTests: 100,
          pharmacy: 50,
          taxes: 80,
          discount: 0,
          total: 800
        },
        receiptUrl: null,
        paymentId: null,
        transactionId: null
      }
    ];

    setInvoices(enhancedInvoices);

    // Calculate billing statistics
    const stats = {
      totalDue: enhancedInvoices.filter(inv => inv.status !== 'Paid').reduce((sum, inv) => sum + inv.amount, 0),
      lastPaymentDate: '2024-01-12',
      lifetimePaid: enhancedInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0),
      overdueAmount: enhancedInvoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0),
      pendingAmount: enhancedInvoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0),
      totalInvoices: enhancedInvoices.length,
      paidInvoices: enhancedInvoices.filter(inv => inv.status === 'Paid').length,
      pendingInvoices: enhancedInvoices.filter(inv => inv.status === 'Pending').length,
      overdueInvoices: enhancedInvoices.filter(inv => inv.status === 'Overdue').length,
      monthlySpending: [
        { month: 'Oct 2023', amount: 1200, category: 'Consultation' },
        { month: 'Nov 2023', amount: 800, category: 'Laboratory' },
        { month: 'Dec 2023', amount: 1500, category: 'Emergency' },
        { month: 'Jan 2024', amount: 2200, category: 'Mixed' }
      ],
      paymentMethods: [
        { method: 'Credit Card', count: 2, amount: 545 },
        { method: 'UPI', count: 1, amount: 45 },
        { method: 'Net Banking', count: 0, amount: 0 }
      ],
      upcomingPayments: enhancedInvoices.filter(inv => inv.status !== 'Paid').slice(0, 3),
      insuranceClaims: enhancedInvoices.filter(inv => inv.insuranceClaimed)
    };

    setBillingData(stats);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...invoices];

    // Apply status filter
    if (filters.status !== 'All Status') {
      filtered = filtered.filter(inv => inv.status === filters.status);
    }

    // Apply category filter
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(inv => inv.category === filters.category);
    }

    // Apply department filter
    if (filters.department !== 'All Departments') {
      filtered = filtered.filter(inv => inv.department === filters.department);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'last30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case 'last3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'last6months':
          filterDate.setMonth(now.getMonth() - 6);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== 'all') {
        filtered = filtered.filter(inv => new Date(inv.date) >= filterDate);
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(inv => 
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredInvoices(filtered);
  };

  const handlePayNow = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const handleDownloadReceipt = (invoice) => {
    // Simulate download
    console.log('Downloading receipt for invoice:', invoice.invoiceNumber);
    // In real implementation, this would trigger a download
  };

  const handlePayment = async (paymentData) => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Update invoice status
      setInvoices(prev => prev.map(inv => 
        inv.id === selectedInvoice.id 
          ? { 
              ...inv, 
              status: 'Paid', 
              paymentMethod: paymentData.method,
              paidDate: new Date().toISOString().split('T')[0],
              paymentId: `PAY-${Date.now()}`,
              transactionId: `TXN-${Date.now()}`
            }
          : inv
      ));
      
      setPaymentProcessing(false);
      setShowPaymentModal(false);
      setSelectedInvoice(null);
      
      // Reload data to update statistics
      loadBillingData();
    }, 2000);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
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

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCardIcon className="h-5 w-5" />;
      case 'UPI':
        return <DeviceMobileIcon className="h-5 w-5" />;
      case 'Net Banking':
        return <LibraryIcon className="h-5 w-5" />;
      default:
        return <CreditCardIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="billing-section">
      {/* Header */}
      <div className="section-header">
        <div className="header-left">
          <h2 className="section-title">Billing & Payments</h2>
          <p className="section-subtitle">Manage your medical bills and payment history</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('invoices')}
            className={`tab-button ${activeTab === 'invoices' ? 'active' : ''}`}
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Invoices
          </button>
          <button 
            onClick={() => setActiveTab('payment-methods')}
            className={`tab-button ${activeTab === 'payment-methods' ? 'active' : ''}`}
          >
            <CreditCardIcon className="h-5 w-5 mr-2" />
            Payment Methods
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="billing-overview">
          {/* Summary Cards */}
          <div className="billing-summary">
            <div className="summary-card total-due">
              <div className="card-icon">
                <ExclamationCircleIcon className="h-8 w-8 text-orange-600" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Total Due</h3>
                <p className="card-amount">{formatCurrency(billingData.totalDue)}</p>
                <p className="card-subtitle">
                  {billingData.pendingInvoices + billingData.overdueInvoices} pending invoices
                </p>
              </div>
            </div>

            <div className="summary-card lifetime-paid">
              <div className="card-icon">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Lifetime Paid</h3>
                <p className="card-amount">{formatCurrency(billingData.lifetimePaid)}</p>
                <p className="card-subtitle">
                  {billingData.paidInvoices} paid invoices
                </p>
              </div>
            </div>

            <div className="summary-card overdue">
              <div className="card-icon">
                <ClockIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Overdue</h3>
                <p className="card-amount">{formatCurrency(billingData.overdueAmount)}</p>
                <p className="card-subtitle">
                  {billingData.overdueInvoices} overdue invoices
                </p>
              </div>
            </div>

            <div className="summary-card total-invoices">
              <div className="card-icon">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Total Invoices</h3>
                <p className="card-amount">{billingData.totalInvoices}</p>
                <p className="card-subtitle">
                  All time invoices
                </p>
              </div>
            </div>
          </div>

          {/* Payment History Chart */}
          <div className="payment-chart-section">
            <h3 className="subsection-title">Payment History</h3>
            <PaymentHistoryChart data={billingData.monthlySpending} />
          </div>

          {/* Recent Payments */}
          <div className="recent-payments">
            <h3 className="subsection-title">Recent Payments</h3>
            <div className="payments-grid">
              {invoices.filter(inv => inv.status === 'Paid').slice(0, 3).map((invoice) => (
                <div key={invoice.id} className="payment-card">
                  <div className="payment-header">
                    <div className="payment-method">
                      {getPaymentMethodIcon(invoice.paymentMethod)}
                      <span className="method-name">{invoice.paymentMethod}</span>
                    </div>
                    <span className={`payment-status ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="payment-details">
                    <h4 className="payment-description">{invoice.description}</h4>
                    <p className="payment-date">{formatDate(invoice.paidDate)}</p>
                    <p className="payment-amount">{formatCurrency(invoice.amount)}</p>
                  </div>
                  <div className="payment-actions">
                    <button 
                      onClick={() => handleViewInvoice(invoice)}
                      className="action-btn secondary"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button 
                      onClick={() => handleDownloadReceipt(invoice)}
                      className="action-btn primary"
                    >
                      <DownloadIcon className="h-4 w-4 mr-1" />
                      Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Payments */}
          {billingData.upcomingPayments.length > 0 && (
            <div className="upcoming-payments">
              <h3 className="subsection-title">Upcoming Payments</h3>
              <div className="upcoming-grid">
                {billingData.upcomingPayments.map((invoice) => (
                  <div key={invoice.id} className="upcoming-card">
                    <div className="upcoming-header">
                      <h4 className="upcoming-description">{invoice.description}</h4>
                      <span className={`upcoming-status ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </div>
                    <div className="upcoming-details">
                      <p className="upcoming-date">Due: {formatDate(invoice.dueDate)}</p>
                      <p className="upcoming-amount">{formatCurrency(invoice.amount)}</p>
                    </div>
                    <div className="upcoming-actions">
                      <button 
                        onClick={() => handlePayNow(invoice)}
                        className="pay-now-btn"
                      >
                        <CreditCardIcon className="h-4 w-4 mr-1" />
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="invoices-section">
          {/* Filters and Search */}
          <div className="invoices-controls">
            <div className="controls-left">
              <div className="search-box">
                <SearchIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filters">
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="filter-select"
                >
                  <option value="All Status">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>

                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="filter-select"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Imaging">Imaging</option>
                  <option value="Emergency">Emergency</option>
                </select>

                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="filter-select"
                >
                  <option value="all">All Time</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last3months">Last 3 Months</option>
                  <option value="last6months">Last 6 Months</option>
                </select>
              </div>
            </div>

            <div className="controls-right">
              <button className="export-btn">
                <DownloadIcon className="h-5 w-5 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Invoice Table */}
          <InvoiceTable
            invoices={filteredInvoices}
            onViewInvoice={handleViewInvoice}
            onPayNow={handlePayNow}
            onDownloadReceipt={handleDownloadReceipt}
            sortBy={sortBy}
            onSort={handleSort}
            loading={loading}
          />
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <div className="payment-methods-section">
          <h3 className="subsection-title">Saved Payment Methods</h3>
          <div className="payment-methods-grid">
            {paymentMethods.map((method) => (
              <div key={method.id} className="payment-method-card">
                <div className="method-icon">
                  {getPaymentMethodIcon(method.name)}
                </div>
                <div className="method-info">
                  <h4 className="method-name">{method.name}</h4>
                  <p className="method-description">{method.description}</p>
                </div>
                <div className="method-actions">
                  <button className="action-btn secondary">Edit</button>
                  <button className="action-btn danger">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="add-payment-method">
            <button className="add-method-btn">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Add New Payment Method
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        invoice={selectedInvoice}
        onPayment={handlePayment}
        loading={paymentProcessing}
      />

      <InvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        invoice={selectedInvoice}
        onPayNow={handlePayNow}
        onDownloadReceipt={handleDownloadReceipt}
      />
    </div>
  );
};

export default BillingSection;
