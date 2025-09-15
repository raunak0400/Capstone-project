import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';
import { 
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon
} from '@heroicons/react/outline';

const PharmacistDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('prescriptions');

  // Mock data for prescriptions
  const [prescriptions] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P001',
      doctorName: 'Dr. Smith',
      medications: [
        { name: 'Metformin 500mg', dosage: 'Twice daily', quantity: 30 },
        { name: 'Lisinopril 10mg', dosage: 'Once daily', quantity: 30 }
      ],
      status: 'pending',
      prescribedDate: '2024-01-15',
      pickupDate: null,
      totalAmount: 45.99
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P002',
      doctorName: 'Dr. Johnson',
      medications: [
        { name: 'Atorvastatin 20mg', dosage: 'Once daily', quantity: 30 }
      ],
      status: 'ready',
      prescribedDate: '2024-01-14',
      pickupDate: '2024-01-16',
      totalAmount: 25.50
    },
    {
      id: 3,
      patientName: 'Bob Wilson',
      patientId: 'P003',
      doctorName: 'Dr. Williams',
      medications: [
        { name: 'Omeprazole 20mg', dosage: 'Once daily', quantity: 30 }
      ],
      status: 'dispensed',
      prescribedDate: '2024-01-13',
      pickupDate: '2024-01-15',
      totalAmount: 22.00
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      case 'dispensed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5" />;
      case 'ready':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'dispensed':
        return <CheckCircleIcon className="h-5 w-5" />;
      default:
        return <ExclamationCircleIcon className="h-5 w-5" />;
    }
  };

  const tabs = [
    { id: 'prescriptions', name: 'Prescriptions', icon: <DocumentTextIcon className="h-5 w-5" /> },
    { id: 'inventory', name: 'Inventory', icon: <DocumentTextIcon className="h-5 w-5" /> },
    { id: 'reports', name: 'Reports', icon: <DocumentTextIcon className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pharmacy Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Time</p>
                <p className="font-semibold">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Prescriptions</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Dispensed Today</p>
                <p className="text-2xl font-semibold text-gray-900">15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'prescriptions' && (
              <div>
                {/* Search and Filter */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <SearchIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search prescriptions..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <FilterIcon className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Prescription</span>
                  </button>
                </div>

                {/* Prescriptions Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Medications
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {prescriptions.map((prescription) => (
                        <tr key={prescription.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {prescription.patientName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {prescription.patientId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {prescription.doctorName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {prescription.prescribedDate}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {prescription.medications.length} medication(s)
                            </div>
                            <div className="text-sm text-gray-500">
                              {prescription.medications[0]?.name}
                              {prescription.medications.length > 1 && ` +${prescription.medications.length - 1} more`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                              {getStatusIcon(prescription.status)}
                              <span className="ml-1 capitalize">{prescription.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${prescription.totalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View
                            </button>
                            {prescription.status === 'pending' && (
                              <button className="text-green-600 hover:text-green-900">
                                Prepare
                              </button>
                            )}
                            {prescription.status === 'ready' && (
                              <button className="text-green-600 hover:text-green-900">
                                Dispense
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Inventory Management</h3>
                <p className="mt-1 text-sm text-gray-500">Inventory features coming soon...</p>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Reports & Analytics</h3>
                <p className="mt-1 text-sm text-gray-500">Reporting features coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
