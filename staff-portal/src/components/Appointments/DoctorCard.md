# DoctorCard Component

A modern, responsive Doctor Profile Card component built with React, TypeScript, TailwindCSS, and Framer Motion.

## Features

### 🎨 **Design**
- Modern card-style design with soft shadows and rounded corners
- Hospital theme colors (blue, teal, soft gray, white)
- Responsive layout (stack on mobile)
- Hover effects with scale-up and shadow

### 👨‍⚕️ **Doctor Information**
- Circular avatar with fallback to initials
- Doctor name and specialization
- Online/Offline status indicator
- Star rating (out of 5) with review count
- Experience and consultation fee
- Location information

### ⚡ **Interactive Elements**
- **Book Now** button (disabled when offline)
- **View Profile** button
- **Chat** and **Video Call** buttons (when online)
- Next available slot display
- Framer Motion animations (fade-in, slide-up)

### 🎯 **Advanced Features**
- Dynamic avatar colors based on doctor name
- Specialization-specific color coding
- Smooth hover animations
- Responsive grid layout
- TypeScript support with full type safety

## Usage

```tsx
import DoctorCard from './components/Appointments/DoctorCard';

<DoctorCard
  doctorName="Dr. Sarah Smith"
  specialization="Dermatology"
  status="online"
  rating={4.8}
  reviewCount={127}
  experience={8}
  consultationFee={1200}
  nextAvailableSlot="Today 3:00 PM"
  location="Main Clinic"
  photo="https://example.com/photo.jpg"
  onBookNow={() => console.log('Book appointment')}
  onViewProfile={() => console.log('View profile')}
  onChat={() => console.log('Start chat')}
  onVideoCall={() => console.log('Start video call')}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `doctorName` | `string` | ✅ | Doctor's full name |
| `specialization` | `string` | ✅ | Medical specialization |
| `status` | `'online' \| 'offline'` | ✅ | Doctor's availability status |
| `rating` | `number` | ✅ | Rating out of 5 |
| `reviewCount` | `number` | ✅ | Number of reviews |
| `experience` | `number` | ✅ | Years of experience |
| `consultationFee` | `number` | ✅ | Consultation fee in rupees |
| `nextAvailableSlot` | `string` | ❌ | Next available appointment slot |
| `location` | `string` | ❌ | Clinic/hospital location |
| `photo` | `string` | ❌ | Doctor's photo URL |
| `onBookNow` | `() => void` | ❌ | Book appointment callback |
| `onViewProfile` | `() => void` | ❌ | View profile callback |
| `onChat` | `() => void` | ❌ | Start chat callback |
| `onVideoCall` | `() => void` | ❌ | Start video call callback |

## Demo

Visit `/doctor-cards-demo` to see the component in action with sample data.

## Dependencies

- `react` - React framework
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `tailwindcss` - CSS framework

## Styling

The component uses TailwindCSS classes and follows a hospital theme:
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#FBBF24)
- **Danger**: Red (#EF4444)
- **Gray**: Various shades for text and backgrounds

## Responsive Design

- **Desktop**: Horizontal layout with avatar, info, and actions
- **Tablet**: Maintains horizontal layout with adjusted spacing
- **Mobile**: Stacked layout with centered alignment
