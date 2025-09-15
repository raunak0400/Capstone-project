import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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

        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
            toast.success('Message sent successfully!');
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            // Close modal after 2 seconds
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 2000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />
                
                {/* Modal */}
                <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto transform transition-all contact-modal">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>

                    {!showSuccess ? (
                        <>
                            {/* Header */}
                            <div className="modal-header">
                                <h2>Contact Us</h2>
                                <p>Get in touch with us for any questions or support</p>
                            </div>

                            {/* Form */}
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-grid">
                                        {/* Name */}
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                name="name"
                                                className="box"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label className={`placeholder-label ${formData.name ? 'focused' : ''}`}>
                                                Your Name
                                            </label>
                                        </div>

                                        {/* Email */}
                                        <div className="input-container">
                                            <input
                                                type="email"
                                                name="email"
                                                className="box"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label className={`placeholder-label ${formData.email ? 'focused' : ''}`}>
                                                Your Email
                                            </label>
                                        </div>

                                        {/* Phone */}
                                        <div className="input-container">
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="box"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                            <label className={`placeholder-label ${formData.phone ? 'focused' : ''}`}>
                                                Phone Number
                                            </label>
                                        </div>

                                        {/* Subject */}
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                name="subject"
                                                className="box"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label className={`placeholder-label ${formData.subject ? 'focused' : ''}`}>
                                                Subject
                                            </label>
                                        </div>

                                        {/* Message */}
                                        <div className="input-container">
                                            <textarea
                                                name="message"
                                                className="box"
                                                rows="4"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label className={`placeholder-label ${formData.message ? 'focused' : ''}`}>
                                                Your Message
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        /* Success Message */
                        <div className="modal-body text-center">
                            <div className="success-icon">
                                <svg className="mx-auto" width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="success-message">
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for contacting us. We'll get back to you soon!</p>
                                <div style={{fontSize: '1.4rem', color: '#999', marginTop: '2rem'}}>
                                    This modal will close automatically...
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
