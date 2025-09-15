import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  FileText, 
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

const LabResultCard = ({ 
  test, 
  onViewDetails, 
  onDownload,
  index 
}) => {
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

  const getResultSummaryColor = (summary) => {
    switch (summary.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'abnormal':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'critical':
        return 'bg-red-200 text-red-900 border-red-300';
      case 'routine':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getResultSummaryIcon = (summary) => {
    switch (summary.toLowerCase()) {
      case 'normal':
        return <CheckCircle className="w-4 h-4" />;
      case 'abnormal':
        return <AlertTriangle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAbnormalCount = () => {
    if (!test.results) return 0;
    return Object.values(test.results).filter(result => result.status === 'abnormal').length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetails(test)}
    >
      {/* Header with status indicator */}
      <div className={`h-1 w-full ${
        test.status === 'completed' ? 'bg-green-500' : 
        test.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
      }`} />
      
      <div className="p-6">
        {/* Test name and code */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{test.testName}</h3>
            <p className="text-sm text-gray-500 font-mono">{test.testCode}</p>
          </div>
          
          {/* Priority badge */}
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(test.priority)}`}>
            {test.priority.toUpperCase()}
          </span>
        </div>

        {/* Status and result summary */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(test.status)}`}>
            {getStatusIcon(test.status)}
            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
          </span>
          
          {test.status === 'completed' && (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getResultSummaryColor(test.resultSummary)}`}>
              {getResultSummaryIcon(test.resultSummary)}
              {test.resultSummary.charAt(0).toUpperCase() + test.resultSummary.slice(1)}
            </span>
          )}
        </div>

        {/* Test details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{formatDate(test.date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4 text-blue-500" />
            <span>{test.doctor}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span>{test.department}</span>
          </div>
          
          {test.hasTrend && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Trend available</span>
            </div>
          )}
        </div>

        {/* Abnormal results indicator */}
        {test.status === 'completed' && test.resultSummary === 'abnormal' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                {getAbnormalCount()} abnormal value{getAbnormalCount() !== 1 ? 's' : ''} detected
              </span>
            </div>
          </div>
        )}

        {/* Notes preview */}
        {test.notes && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700 line-clamp-2">{test.notes}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(test);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            View Details
          </motion.button>
          
          {test.status === 'completed' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onDownload(test);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LabResultCard;
