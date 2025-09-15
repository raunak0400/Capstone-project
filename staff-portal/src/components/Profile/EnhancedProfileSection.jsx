import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  CameraIcon, 
  PencilIcon, 
  CheckIcon, 
  XIcon,
  HeartIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  PhoneIcon,
  LocationMarkerIcon,
  CalendarIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  DeviceMobileIcon,
  MailIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  CogIcon,
  LockClosedIcon,
  LogoutIcon,
  PlusIcon
} from '@heroicons/react/outline';

const EnhancedProfileSection = ({ patient, onUpdatePatient, onLogout }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    // Medical Information
    medicalHistory: [],
    allergies: [],
    currentMedications: [],
    // Preferences
    language: 'en',
    timezone: 'Asia/Kolkata',
    notifications: {
      email: true,
      sms: true,
      push: true
    },
    // Security
    twoFactorEnabled: false,
    lastLogin: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData({
        ...formData,
        name: patient.name || '',
        email: patient.email || '',
        phone: patient.phone || '',
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender || '',
        bloodGroup: patient.bloodGroup || '',
        address: patient.address || '',
        city: patient.city || '',
        state: patient.state || '',
        pincode: patient.pincode || '',
        emergencyContact: patient.emergencyContact || { name: '', phone: '', relationship: '' },
        medicalHistory: patient.medicalHistory || [],
        allergies: patient.allergies || [],
        currentMedications: patient.currentMedications || [],
        language: patient.language || 'en',
        timezone: patient.timezone || 'Asia/Kolkata',
        notifications: patient.notifications || { email: true, sms: true, push: true },
        twoFactorEnabled: patient.twoFactorEnabled || false,
        lastLogin: patient.lastLogin || null
      });
    }
  }, [patient]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onUpdatePatient(formData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      setErrors({ general: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setErrors({ password: 'Passwords do not match' });
      return;
    }
    if (newPassword.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters' });
      return;
    }
    
    setLoading(true);
    try {
      // Handle password change logic here
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
    } catch (error) {
      setErrors({ password: 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  const addMedicalHistory = () => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: [...prev.medicalHistory, { condition: '', date: '', notes: '' }]
    }));
  };

  const addAllergy = () => {
    setFormData(prev => ({
      ...prev,
      allergies: [...prev.allergies, { allergen: '', severity: '', notes: '' }]
    }));
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      currentMedications: [...prev.currentMedications, { name: '', dosage: '', frequency: '', notes: '' }]
    }));
  };

  const removeItem = (array, index) => {
    setFormData(prev => ({
      ...prev,
      [array]: prev[array].filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: <UserIcon className="h-5 w-5" /> },
    { id: 'medical', name: 'Medical Info', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { id: 'preferences', name: 'Preferences', icon: <CogIcon className="h-5 w-5" /> },
    { id: 'security', name: 'Security', icon: <ShieldCheckIcon className="h-5 w-5" /> }
  ];

  return (
    <div className="enhanced-profile-section">
      <div className="profile-header">
        <div className="profile-picture-section">
          <div className="profile-picture-container">
            <div className="profile-picture">
              {patient?.profilePicture ? (
                <img src={patient.profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <UserIcon className="h-16 w-16 text-gray-400" />
              )}
            </div>
            <button className="camera-button">
              <CameraIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{formData.name || 'Patient Name'}</h2>
            <p className="profile-email">{formData.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-label">Member Since</span>
                <span className="stat-value">Jan 2024</span>
              </div>
              <div className="stat">
                <span className="stat-label">Last Login</span>
                <span className="stat-value">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button 
                onClick={() => setIsEditing(false)} 
                className="cancel-button"
              >
                <XIcon className="h-5 w-5" />
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="save-button"
                disabled={loading}
              >
                <CheckIcon className="h-5 w-5" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
            >
              <PencilIcon className="h-5 w-5" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      <div className="profile-content">
        {activeTab === 'personal' && (
          <div className="personal-info-section">
            <div className="section-header">
              <h3>Personal Information</h3>
              <p>Update your personal details and contact information</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={!isEditing}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  disabled={!isEditing}
                  className="form-select"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="address-section">
              <h4>Address Information</h4>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="emergency-contact-section">
              <h4>Emergency Contact</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Relationship</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.relationship}
                    onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="medical-info-section">
            <div className="section-header">
              <h3>Medical Information</h3>
              <p>Keep your medical history up to date for better care</p>
            </div>

            <div className="medical-history-section">
              <div className="section-subheader">
                <h4>Medical History</h4>
                <button onClick={addMedicalHistory} className="add-button">
                  <PlusIcon className="h-5 w-5" />
                  Add Condition
                </button>
              </div>

              {formData.medicalHistory.map((condition, index) => (
                <div key={index} className="medical-item">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Condition</label>
                      <input
                        type="text"
                        value={condition.condition}
                        onChange={(e) => {
                          const newHistory = [...formData.medicalHistory];
                          newHistory[index].condition = e.target.value;
                          setFormData(prev => ({ ...prev, medicalHistory: newHistory }));
                        }}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={condition.date}
                        onChange={(e) => {
                          const newHistory = [...formData.medicalHistory];
                          newHistory[index].date = e.target.value;
                          setFormData(prev => ({ ...prev, medicalHistory: newHistory }));
                        }}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Notes</label>
                      <textarea
                        value={condition.notes}
                        onChange={(e) => {
                          const newHistory = [...formData.medicalHistory];
                          newHistory[index].notes = e.target.value;
                          setFormData(prev => ({ ...prev, medicalHistory: newHistory }));
                        }}
                        disabled={!isEditing}
                        className="form-textarea"
                        rows="2"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <button 
                      onClick={() => removeItem('medicalHistory', index)}
                      className="remove-button"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="allergies-section">
              <div className="section-subheader">
                <h4>Allergies</h4>
                <button onClick={addAllergy} className="add-button">
                  <PlusIcon className="h-5 w-5" />
                  Add Allergy
                </button>
              </div>

              {formData.allergies.map((allergy, index) => (
                <div key={index} className="medical-item">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Allergen</label>
                      <input
                        type="text"
                        value={allergy.allergen}
                        onChange={(e) => {
                          const newAllergies = [...formData.allergies];
                          newAllergies[index].allergen = e.target.value;
                          setFormData(prev => ({ ...prev, allergies: newAllergies }));
                        }}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Severity</label>
                      <select
                        value={allergy.severity}
                        onChange={(e) => {
                          const newAllergies = [...formData.allergies];
                          newAllergies[index].severity = e.target.value;
                          setFormData(prev => ({ ...prev, allergies: newAllergies }));
                        }}
                        disabled={!isEditing}
                        className="form-select"
                      >
                        <option value="">Select Severity</option>
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label>Notes</label>
                      <textarea
                        value={allergy.notes}
                        onChange={(e) => {
                          const newAllergies = [...formData.allergies];
                          newAllergies[index].notes = e.target.value;
                          setFormData(prev => ({ ...prev, allergies: newAllergies }));
                        }}
                        disabled={!isEditing}
                        className="form-textarea"
                        rows="2"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <button 
                      onClick={() => removeItem('allergies', index)}
                      className="remove-button"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="medications-section">
              <div className="section-subheader">
                <h4>Current Medications</h4>
                <button onClick={addMedication} className="add-button">
                  <PlusIcon className="h-5 w-5" />
                  Add Medication
                </button>
              </div>

              {formData.currentMedications.map((medication, index) => (
                <div key={index} className="medical-item">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Medication Name</label>
                      <input
                        type="text"
                        value={medication.name}
                        onChange={(e) => {
                          const newMedications = [...formData.currentMedications];
                          newMedications[index].name = e.target.value;
                          setFormData(prev => ({ ...prev, currentMedications: newMedications }));
                        }}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Dosage</label>
                      <input
                        type="text"
                        value={medication.dosage}
                        onChange={(e) => {
                          const newMedications = [...formData.currentMedications];
                          newMedications[index].dosage = e.target.value;
                          setFormData(prev => ({ ...prev, currentMedications: newMedications }));
                        }}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Frequency</label>
                      <input
                        type="text"
                        value={medication.frequency}
                        onChange={(e) => {
                          const newMedications = [...formData.currentMedications];
                          newMedications[index].frequency = e.target.value;
                          setFormData(prev => ({ ...prev, currentMedications: newMedications }));
                        }}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Notes</label>
                      <textarea
                        value={medication.notes}
                        onChange={(e) => {
                          const newMedications = [...formData.currentMedications];
                          newMedications[index].notes = e.target.value;
                          setFormData(prev => ({ ...prev, currentMedications: newMedications }));
                        }}
                        disabled={!isEditing}
                        className="form-textarea"
                        rows="2"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <button 
                      onClick={() => removeItem('currentMedications', index)}
                      className="remove-button"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-section">
            <div className="section-header">
              <h3>Preferences & Settings</h3>
              <p>Customize your experience and notification preferences</p>
            </div>

            <div className="preferences-grid">
              <div className="preference-group">
                <h4>Language & Region</h4>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="form-select"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                    <option value="bn">Bengali</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Timezone</label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="form-select"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>

              <div className="preference-group">
                <h4>Notifications</h4>
                <div className="notification-settings">
                  <div className="notification-item">
                    <div className="notification-info">
                      <BellIcon className="h-5 w-5" />
                      <div>
                        <span className="notification-label">Email Notifications</span>
                        <span className="notification-desc">Receive updates via email</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.notifications.email}
                        onChange={(e) => handleNestedInputChange('notifications', 'email', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <DeviceMobileIcon className="h-5 w-5" />
                      <div>
                        <span className="notification-label">SMS Notifications</span>
                        <span className="notification-desc">Receive updates via SMS</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.notifications.sms}
                        onChange={(e) => handleNestedInputChange('notifications', 'sms', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <BellIcon className="h-5 w-5" />
                      <div>
                        <span className="notification-label">Push Notifications</span>
                        <span className="notification-desc">Receive push notifications</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.notifications.push}
                        onChange={(e) => handleNestedInputChange('notifications', 'push', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="security-section">
            <div className="section-header">
              <h3>Security & Privacy</h3>
              <p>Manage your account security and privacy settings</p>
            </div>

            <div className="security-grid">
              <div className="security-group">
                <h4>Password</h4>
                <div className="password-change">
                  <div className="form-group">
                    <label>New Password</label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="form-input"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-input"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button onClick={handlePasswordChange} className="change-password-button">
                    <KeyIcon className="h-5 w-5" />
                    Change Password
                  </button>
                </div>
              </div>

              <div className="security-group">
                <h4>Two-Factor Authentication</h4>
                <div className="two-factor-section">
                  <div className="two-factor-info">
                    <ShieldCheckIcon className="h-8 w-8 text-green-500" />
                    <div>
                      <span className="two-factor-status">Enabled</span>
                      <span className="two-factor-desc">Your account is protected with 2FA</span>
                    </div>
                  </div>
                  <button className="manage-2fa-button">
                    <CogIcon className="h-5 w-5" />
                    Manage 2FA
                  </button>
                </div>
              </div>

              <div className="security-group">
                <h4>Account Actions</h4>
                <div className="account-actions">
                  <button className="account-action-button">
                    <DocumentTextIcon className="h-5 w-5" />
                    Download Data
                  </button>
                  <button className="account-action-button">
                    <ExclamationCircleIcon className="h-5 w-5" />
                    Delete Account
                  </button>
                  <button onClick={onLogout} className="logout-button">
                    <LogoutIcon className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {errors.general && (
        <div className="error-message">
          <ExclamationCircleIcon className="h-5 w-5" />
          {errors.general}
        </div>
      )}
    </div>
  );
};

export default EnhancedProfileSection;
