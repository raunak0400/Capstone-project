# Healthcare Staff Portal

A separate portal for healthcare staff members (Admin, Doctor, Nurse, Receptionist, Pharmacist) with restricted access.

## Features

- **Role-based Access Control**: Different dashboards and permissions for each staff role
- **Restricted Authentication**: Only authorized staff can access this portal
- **Separate from Patient Portal**: Runs on port 3001, completely separate from patient portal
- **Modern UI**: Clean, responsive design with role-specific themes

## Available Roles & Credentials

### Admin
- Email: `admin@healthcare.com`
- Password: `admin123`

### Doctor
- Email: `doctor@healthcare.com`
- Password: `doctor123`

### Nurse
- Email: `nurse@healthcare.com`
- Password: `nurse123`

### Receptionist
- Email: `receptionist@healthcare.com`
- Password: `receptionist123`

### Pharmacist
- Email: `pharmacist@healthcare.com`
- Password: `pharmacist123`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The staff portal will be available at `http://localhost:3001`

## Port Configuration

- **Patient Portal**: `http://localhost:3000`
- **Staff Portal**: `http://localhost:3001`
- **Backend API**: `http://localhost:5000`

## Security

- Only authorized staff can access this portal
- Patients should use the main portal at `localhost:3000`
- Role-based routing ensures users only see their authorized sections
- Separate authentication system from patient portal

## Available Scripts

- `npm start` - Start development server on port 3001
- `npm start:win` - Windows-specific start command
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Architecture

```
staff-portal/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Role-specific pages
│   │   ├── AdminMain/      # Admin dashboard & management
│   │   ├── DoctorMain/     # Doctor dashboard & tools
│   │   ├── NurseMain/      # Nurse dashboard & patient care
│   │   ├── Receptionist/   # Receptionist tools & patient management
│   │   └── PharmacistMain/ # Pharmacy management
│   ├── utils/              # Authentication & utilities
│   └── services/           # API services
└── public/                 # Static assets
```
