import React from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Calendar, 
  Star, 
  Clock, 
  MapPin, 
  User,
  Video,
  MessageCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const DoctorCard = ({
  doctorName,
  specialization,
  status,
  rating,
  reviewCount,
  experience,
  consultationFee,
  availableSlots = [],
  nextAvailableSlot,
  photo,
  location = "Main Clinic",
  onBookNow,
  onViewProfile,
  onChat,
  onVideoCall
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSpecializationColor = (spec: string) => {
    const colors: { [key: string]: string } = {
      'Dermatology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Orthopedics': 'bg-red-100 text-red-800 border-red-200',
      'Cardiology': 'bg-blue-100 text-blue-800 border-blue-200',
      'Neurology': 'bg-green-100 text-green-800 border-green-200',
      'Pediatrics': 'bg-pink-100 text-pink-800 border-pink-200',
      'General Medicine': 'bg-teal-100 text-teal-800 border-teal-200',
    };
    return colors[spec] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-red-500 to-red-600',
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Status Indicator Bar */}
      <div className={`h-1 w-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
      
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className={`w-16 h-16 rounded-full ${getAvatarColor(doctorName)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {photo ? (
                <img
                  src={photo}
                  alt={doctorName}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <span className={photo ? 'hidden' : 'flex'}>{getInitials(doctorName)}</span>
            </div>
            
            {/* Online Status Indicator */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
              status === 'online' ? 'bg-green-500' : 'bg-gray-400'
            }`}>
              {status === 'online' ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <XCircle className="w-3 h-3 text-white" />
              )}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900 truncate">{doctorName}</h3>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                status === 'online' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                {status === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-blue-500" />
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getSpecializationColor(specialization)}`}>
                {specialization.toUpperCase()}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(rating)}
              </div>
              <span className="text-sm font-semibold text-gray-700">{rating}</span>
              <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{experience}+ years experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{location}</span>
          </div>
        </div>

        {/* Next Available Slot */}
        {nextAvailableSlot && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Next Available:</span>
              <span className="text-sm font-semibold text-blue-900">{nextAvailableSlot}</span>
            </div>
          </div>
        )}

        {/* Consultation Fee */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Consultation Fee:</span>
            <span className="text-lg font-bold text-green-600">₹{consultationFee}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookNow}
            disabled={status === 'offline'}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              status === 'online'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {status === 'online' ? 'Book Now' : 'Unavailable'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewProfile}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
          >
            <User className="w-4 h-4" />
            View Profile
          </motion.button>
        </div>

        {/* Quick Actions */}
        {status === 'online' && (
          <div className="flex gap-2 mt-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onChat}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-green-100 hover:bg-green-200 text-green-700 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onVideoCall}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all duration-200"
            >
              <Video className="w-4 h-4" />
              Video Call
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DoctorCard;
