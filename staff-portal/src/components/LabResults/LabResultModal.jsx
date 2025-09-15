import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Share2, 
  Mail, 
  Calendar, 
  User, 
  Building2, 
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Printer
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LabResultModal = ({ test, isOpen, onClose, onDownload, onShare }) => {
  const [activeTab, setActiveTab] = useState('results');

  if (!test) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResultStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'abnormal':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getResultStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return <CheckCircle className="w-4 h-4" />;
      case 'abnormal':
        return <AlertTriangle className="w-4 h-4" />;
      case 'high':
        return <TrendingUp className="w-4 h-4" />;
      case 'low':
        return <TrendingUp className="w-4 h-4 rotate-180" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const generateAISummary = () => {
    if (!test.results) return "Test results are still being processed.";
    
    const abnormalCount = Object.values(test.results).filter(result => result.status === 'abnormal').length;
    const totalCount = Object.keys(test.results).length;
    
    if (abnormalCount === 0) {
      return "Your test results show all values within normal ranges. Continue maintaining your current health practices.";
    } else if (abnormalCount === 1) {
      return "Your test results show one value outside the normal range. Please consult with your doctor for further guidance.";
    } else {
      return `Your test results show ${abnormalCount} values outside normal ranges. It's recommended to schedule a follow-up consultation with your doctor.`;
    }
  };

  const tabs = [
    { id: 'results', label: 'Results', icon: FileText },
    { id: 'trends', label: 'Trends', icon: TrendingUp, disabled: !test.hasTrend },
    { id: 'summary', label: 'AI Summary', icon: CheckCircle }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{test.testName}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(test.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {test.doctor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {test.department}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(test.status)}`}>
                  {getStatusIcon(test.status)}
                  {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                </span>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  disabled={tab.disabled}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : tab.disabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === 'results' && (
                <div className="space-y-6">
                  {test.results ? (
                    <div className="space-y-4">
                      {Object.entries(test.results).map(([key, result]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getResultStatusColor(result.status)}`}>
                              {getResultStatusIcon(result.status)}
                              {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Your Value:</span>
                              <span className={`ml-2 font-semibold ${
                                result.status === 'abnormal' ? 'text-red-600' : 'text-gray-900'
                              }`}>
                                {result.value} {result.unit}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Reference Range:</span>
                              <span className="ml-2 font-medium text-gray-900">{result.reference}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Status:</span>
                              <span className={`ml-2 font-medium ${
                                result.status === 'abnormal' ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {result.status === 'abnormal' ? 'Outside normal range' : 'Within normal range'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Test results are still being processed.</p>
                    </div>
                  )}
                  
                  {test.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Doctor's Notes</h4>
                      <p className="text-blue-800">{test.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'trends' && test.hasTrend && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Trend Analysis</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={test.trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value, name) => [value, name]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey={Object.keys(test.results || {})[0] || 'value'} 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">AI Health Summary</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Health Insights</h4>
                        <p className="text-blue-800 leading-relaxed">{generateAISummary()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Important Note</h4>
                        <p className="text-yellow-800 text-sm">
                          This AI summary is for informational purposes only and should not replace professional medical advice. 
                          Always consult with your healthcare provider for proper interpretation of your results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Test Code: {test.testCode} • Ordered by: {test.orderedBy}
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onShare(test)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
                
                {test.status === 'completed' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDownload(test)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LabResultModal;
