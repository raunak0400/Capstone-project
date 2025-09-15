// Mock data for staff portal when backend is not available

export const mockPatients = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: '123 Main St, City, State 12345',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1-555-0124',
      relationship: 'Spouse'
    },
    medicalHistory: ['Diabetes Type 2', 'Hypertension'],
    allergies: ['Penicillin'],
    insuranceInfo: {
      provider: 'Blue Cross',
      policyNumber: 'BC123456789'
    },
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1-555-0125',
    dateOfBirth: '1985-08-22',
    gender: 'female',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: {
      name: 'Bob Smith',
      phone: '+1-555-0126',
      relationship: 'Father'
    },
    medicalHistory: ['Asthma'],
    allergies: ['Shellfish'],
    insuranceInfo: {
      provider: 'Aetna',
      policyNumber: 'AE987654321'
    },
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    _id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@email.com',
    phone: '+1-555-0127',
    dateOfBirth: '1978-12-03',
    gender: 'male',
    address: '789 Pine St, City, State 12345',
    emergencyContact: {
      name: 'Mary Johnson',
      phone: '+1-555-0128',
      relationship: 'Wife'
    },
    medicalHistory: ['High Cholesterol'],
    allergies: [],
    insuranceInfo: {
      provider: 'Cigna',
      policyNumber: 'CI456789123'
    },
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    _id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@email.com',
    phone: '+1-555-0129',
    dateOfBirth: '1992-03-18',
    gender: 'female',
    address: '321 Elm St, City, State 12345',
    emergencyContact: {
      name: 'Tom Brown',
      phone: '+1-555-0130',
      relationship: 'Brother'
    },
    medicalHistory: [],
    allergies: ['Latex'],
    insuranceInfo: {
      provider: 'UnitedHealth',
      policyNumber: 'UH789123456'
    },
    createdAt: '2024-01-12T16:45:00Z'
  },
  {
    _id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@email.com',
    phone: '+1-555-0131',
    dateOfBirth: '1988-11-07',
    gender: 'male',
    address: '654 Maple Dr, City, State 12345',
    emergencyContact: {
      name: 'Sarah Wilson',
      phone: '+1-555-0132',
      relationship: 'Sister'
    },
    medicalHistory: ['Migraine'],
    allergies: ['Aspirin'],
    insuranceInfo: {
      provider: 'Humana',
      policyNumber: 'HU321654987'
    },
    createdAt: '2024-01-11T11:30:00Z'
  }
];

export const mockAppointments = [
  {
    _id: '1',
    patientId: '1',
    patientName: 'John Doe',
    doctorId: 'doc1',
    doctorName: 'Dr. Smith',
    date: '2024-01-20',
    time: '10:00',
    status: 'scheduled',
    reason: 'Regular checkup',
    notes: 'Patient requested annual physical'
  },
  {
    _id: '2',
    patientId: '2',
    patientName: 'Jane Smith',
    doctorId: 'doc2',
    doctorName: 'Dr. Johnson',
    date: '2024-01-20',
    time: '11:00',
    status: 'completed',
    reason: 'Follow-up appointment',
    notes: 'Asthma management review'
  }
];

export const mockDashboardStats = {
  admin: {
    totalPatients: 1250,
    totalStaff: 45,
    totalAppointments: 89,
    revenue: 125000
  },
  doctor: {
    todayAppointments: 8,
    completedAppointments: 6,
    pendingAppointments: 2,
    totalPatients: 156
  },
  nurse: {
    patientsAssigned: 24,
    tasksCompleted: 18,
    pendingTasks: 6,
    vitalSignsRecorded: 45
  },
  receptionist: {
    appointmentsScheduled: 12,
    patientsRegistered: 5,
    callsHandled: 23,
    pendingTasks: 3
  },
  pharmacist: {
    prescriptionsProcessed: 34,
    pendingPrescriptions: 8,
    inventoryAlerts: 2,
    totalRevenue: 8900
  }
};
