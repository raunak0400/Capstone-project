import React from 'react';
import { XIcon } from '@heroicons/react/outline';

const NotificationCenter = ({ isOpen, onClose, notifications = [], onMarkAsRead }) => {
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'appointment':
                return (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            case 'prescription':
                return (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                );
            case 'lab':
                return (
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                    </svg>
                );
        }
    };

    const formatNotificationDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Today';
        if (diffDays === 2) return 'Yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        return date.toLocaleDateString();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />
                
                <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto transform transition-all max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {notifications.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                                </svg>
                                <p className="text-gray-500 text-lg">No notifications</p>
                                <p className="text-gray-400 text-sm">You're all caught up!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notifications.map((notification) => (
                                    <div 
                                        key={notification.id} 
                                        className={`p-4 rounded-xl border-l-4 ${
                                            notification.read 
                                                ? 'bg-gray-50 border-gray-200' 
                                                : 'bg-blue-50 border-blue-500'
                                        }`}
                                        onClick={() => !notification.read && onMarkAsRead(notification.id)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className={`text-sm font-medium ${
                                                        notification.read ? 'text-gray-600' : 'text-gray-900'
                                                    }`}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.read && (
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                                                    )}
                                                </div>
                                                <p className={`text-sm mt-1 ${
                                                    notification.read ? 'text-gray-500' : 'text-gray-700'
                                                }`}>
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    {formatNotificationDate(notification.date)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;
