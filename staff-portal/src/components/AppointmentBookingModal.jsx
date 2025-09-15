import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

const AppointmentBookingModal = ({ isOpen, onClose, onAppointmentBooked }) => {
    const [formData, setFormData] = useState({
        doctor: '',
        date: '',
        time: '',
        reason: '',
        urgency: 'normal'
    });
    const [loading, setLoading] = useState(false);

    const doctors = [
        { id: 1, name: 'Dr. Smith', specialty: 'General Medicine' },
        { id: 2, name: 'Dr. Johnson', specialty: 'Cardiology' },
        { id: 3, name: 'Dr. Williams', specialty: 'Dermatology' },
        { id: 4, name: 'Dr. Brown', specialty: 'Pediatrics' }
    ];

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate booking process
        setTimeout(() => {
            const newAppointment = {
                id: Date.now(),
                doctor: formData.doctor,
                date: formData.date,
                time: formData.time,
                reason: formData.reason,
                urgency: formData.urgency,
                status: 'pending',
                createdAt: new Date().toISOString(),
                type: 'consultation',
                duration: '30 minutes',
                location: 'Main Clinic',
                notes: 'Please arrive 15 minutes early'
            };

            // Call the callback to add appointment to dashboard
            if (onAppointmentBooked) {
                onAppointmentBooked(newAppointment);
            }

            setLoading(false);
            toast.success('Appointment booked successfully!');
            onClose();
            setFormData({
                doctor: '',
                date: '',
                time: '',
                reason: '',
                urgency: 'normal'
            });
        }, 2000);
    };

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        return maxDate.toISOString().split('T')[0];
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />
                
                <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto transform transition-all">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Appointment</h2>
                        <p className="text-gray-600 mb-6">Schedule your appointment with our healthcare professionals</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Select Doctor
                                    </label>
                                    <select
                                        name="doctor"
                                        value={formData.doctor}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Choose a doctor</option>
                                        {doctors.map(doctor => (
                                            <option key={doctor.id} value={doctor.name}>
                                                {doctor.name} - {doctor.specialty}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Appointment Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        min={getMinDate()}
                                        max={getMaxDate()}
                                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Time Slot
                                    </label>
                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select time</option>
                                        {timeSlots.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Urgency Level
                                    </label>
                                    <select
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Reason for Visit
                                </label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Please describe your symptoms or reason for the appointment..."
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center"
                                >
                                    {loading && (
                                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                        </svg>
                                    )}
                                    {loading ? 'Booking...' : 'Book Appointment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBookingModal;
