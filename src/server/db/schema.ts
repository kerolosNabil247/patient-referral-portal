import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['new', 'in_review', 'contacted', 'completed']);

export const referrals = pgTable('referrals', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  dateOfBirth: varchar('date_of_birth', { length: 10 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }),
  lawFirmName: varchar('law_firm_name', { length: 200 }).notNull(),
  attorneyName: varchar('attorney_name', { length: 200 }).notNull(),
  attorneyEmail: varchar('attorney_email', { length: 255 }).notNull(),
  attorneyPhone: varchar('attorney_phone', { length: 20 }).notNull(),
  primaryComplaint: text('primary_complaint').notNull(),
  preferredLocation: varchar('preferred_location', { length: 50 }).notNull(),
  appointmentType: varchar('appointment_type', { length: 20 }).notNull(),
  status: statusEnum('status').default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});