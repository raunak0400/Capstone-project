import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  Clock,
  Bell,
  Upload,
  Download,
  Plus,
  RefreshCw,
  FileText,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import LabResultCard from './LabResultCard';
import LabResultModal from './LabResultModal';
import { labResultsData, departments, statusOptions, priorityOptions } from '../../data/labResultsData';

const LabResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedPriority, setSelectedPriority] = useState('All Priority');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newResultsCount, setNewResultsCount] = useState(3);

  // Filter and search logic
  const filteredResults = useMemo(() => {
    return labResultsData.filter(test => {
      const matchesSearch = test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.testCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartment === 'All Departments' || test.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'All Status' || test.status === selectedStatus.toLowerCase();
      const matchesPriority = selectedPriority === 'All Priority' || test.priority === selectedPriority.toLowerCase();
      
      const matchesDateRange = (!dateRange.start || new Date(test.date) >= new Date(dateRange.start)) &&
                              (!dateRange.end || new Date(test.date) <= new Date(dateRange.end));
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesPriority && matchesDateRange;
    });
  }, [searchTerm, selectedDepartment, selectedStatus, selectedPriority, dateRange]);

  const handleViewDetails = (test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleDownload = (test) => {
    // Simulate PDF download
    console.log('Downloading PDF for:', test.testName);
    // In a real app, this would generate and download a PDF
  };

  const handleShare = (test) => {
    // Simulate sharing functionality
    console.log('Sharing test results for:', test.testName);
    // In a real app, this would open sharing options
  };

  const handleUploadReport = () => {
    // Simulate file upload
    console.log('Opening file upload dialog');
    // In a real app, this would open a file picker
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All Departments');
    setSelectedStatus('All Status');
    setSelectedPriority('All Priority');
    setDateRange({ start: '', end: '' });
  };

  const getStats = () => {
    const total = labResultsData.length;
    const completed = labResultsData.filter(t => t.status === 'completed').length;
    const pending = labResultsData.filter(t => t.status === 'pending').length;
    const abnormal = labResultsData.filter(t => t.resultSummary === 'abnormal').length;
    
    return { total, completed, pending, abnormal };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lab Results</h1>
              <p className="text-gray-600 mt-1">View and manage your medical test results</p>
            </div>
            
            <div className="flex items-center gap-3">
              {newResultsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                    <Bell className="w-5 h-5" />
                  </button>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {newResultsCount}
                  </span>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUploadReport}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
              >
                <Upload className="w-4 h-4" />
                Upload Report
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Abnormal</p>
                <p className="text-2xl font-bold text-gray-900">{stats.abnormal}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by test name, code, or doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorityOptions.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Test Results ({filteredResults.length})
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredResults.map((test, index) => (
                <LabResultCard
                  key={test.id}
                  test={test}
                  index={index}
                  onViewDetails={handleViewDetails}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <LabResultModal
        test={selectedTest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    </div>
  );
};

export default LabResultsPage;
