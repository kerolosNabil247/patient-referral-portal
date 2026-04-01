import { z } from 'zod';

export const referralSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(100, 'First name must be 100 characters or less'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be 100 characters or less'),
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^[\d\s\-()+]+$/, 'Please enter a valid phone number (e.g., (555) 555-5555)'),
  email: z.string()
    .optional()
    .refine(
      (val) => !val || /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(val),
      'Please enter a valid email address (e.g., name@example.com)'
    ),
  lawFirmName: z.string()
    .min(1, 'Law firm name is required')
    .max(200, 'Law firm name must be 200 characters or less'),
  attorneyName: z.string()
    .min(1, 'Attorney/Case Manager name is required')
    .max(200, 'Name must be 200 characters or less'),
  attorneyEmail: z.string()
    .min(1, 'Attorney email is required')
    .email('Please enter a valid email address (e.g., name@lawfirm.com)'),
  attorneyPhone: z.string()
    .min(1, 'Attorney phone number is required')
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^[\d\s\-()+]+$/, 'Please enter a valid phone number (e.g., (555) 555-5555)'),
  primaryComplaint: z.string()
    .min(1, 'Primary complaint is required')
    .max(500, 'Primary complaint must be 500 characters or less')
    .refine(
      (val) => val.trim().length > 0,
      'Please describe the primary complaint'
    ),
  preferredLocation: z.enum(['Anaheim', 'Culver City', 'Downey', 'El Monte', 'Long Beach', 'Los Angeles'], {
    errorMap: () => ({ message: 'Please select a clinic location' })
  }),
  appointmentType: z.enum(['In-Person', 'Telemedicine'], {
    errorMap: () => ({ message: 'Please select an appointment type' })
  }),
});

export type ReferralInput = z.infer<typeof referralSchema>;