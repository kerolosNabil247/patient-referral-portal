# Patient Referral Portal

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![tRPC](https://img.shields.io/badge/tRPC-10.45-2596be)
![Drizzle](https://img.shields.io/badge/Drizzle-0.29-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.48-ec5990)
![Zod](https://img.shields.io/badge/Zod-3.22-3068b7)

A modern, full-stack patient referral intake system built with Next.js, tRPC, Drizzle ORM, and PostgreSQL. This application allows law offices and authorized representatives to submit new patient referrals with complete intake forms.

## 🚀 Features

- **Patient Referral Form**: Comprehensive intake form with real-time validation
- **Type-Safe End-to-End**: Shared Zod schemas between frontend and backend
- **Modern Stack**: Next.js 14, tRPC, Drizzle ORM, PostgreSQL
- **Responsive Design**: Mobile-first, professional medical clinic UI
- **Real-time Validation**: Client-side validation with React Hook Form and Zod
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Database Integration**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Professional UI**: Clean, modern design with Tailwind CSS
- **Success Feedback**: Clear confirmation with referral ID and estimated follow-up date

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 15+ (local installation or cloud database)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/patient-referral-portal.git
cd patient-referral-portal
2. Install Dependencies
bash
npm install
3. Set Up PostgreSQL Database
Option A: Local PostgreSQL (Recommended)
Make sure PostgreSQL is installed and running:

bash
# Check if PostgreSQL is running
psql --version

# Start PostgreSQL (Windows)
net start postgresql-x64-17

# Create the database
psql -U postgres -c "CREATE DATABASE referral_portal;"
Option B: Cloud Database (Neon)
Go to Neon.tech and create a free account

Create a new project

Copy your connection string

Update .env with the connection string

4. Configure Environment Variables
Copy the example environment file:

bash
cp .env.example .env
Update the DATABASE_URL in .env:

env
DATABASE_URL="postgresql://postgres@localhost:5432/referral_portal"
5. Run Database Migrations
bash
npm run db:generate
npm run db:migrate
6. Start Development Server
bash
npm run dev
The application will be available at http://localhost:3000

7. (Optional) View Database with Drizzle Studio
bash
npm run db:studio
This opens a web interface at http://localhost:4983 to view and manage your database.

🏗️ Project Structure
text
patient-referral-portal/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/trpc/[trpc]/   # tRPC API endpoint
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Main referral form page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ReferralForm.tsx    # Main form component
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       └── Textarea.tsx
│   ├── lib/                    # Utilities and shared code
│   │   ├── validations/        # Shared Zod schemas
│   │   │   └── referral.schema.ts
│   │   ├── api.ts              # tRPC client setup
│   │   └── utils.ts            # Helper functions
│   └── server/                 # Backend code
│       ├── api/                # tRPC routers
│       │   ├── routers/        # Individual routers
│       │   │   └── referral.ts
│       │   ├── root.ts         # Main router
│       │   └── trpc.ts         # tRPC setup
│       └── db/                 # Database
│           ├── index.ts        # Database connection
│           └── schema.ts       # Drizzle schema definitions
├── drizzle/                    # Database migrations
├── scripts/                    # Utility scripts
│   └── migrate.ts              # Migration runner
├── .env.example                # Environment variables template
└── package.json
📐 Architecture Decisions & Tradeoffs
Technology Stack Rationale
Next.js App Router
Why: Provides server-side rendering capabilities for better SEO and initial load performance

Tradeoff: Slightly more complex setup than Pages Router, but better for future scaling

tRPC for API Layer
Why: End-to-end type safety without code generation. Shared types between client and server prevent runtime errors

Tradeoff: tRPC is less common than REST, but type safety benefits outweigh the learning curve

Drizzle ORM
Why: Type-safe SQL with excellent TypeScript support. Better performance than Prisma for complex queries

Tradeoff: Requires more manual migration management than Prisma, but offers better performance and flexibility

Zod for Validation
Why: Single source of truth for validation logic. Same schema used on both client and server ensures consistency

Tradeoff: Slight overhead of maintaining schemas, but prevents validation drift between layers

React Hook Form
Why: Uncontrolled components reduce re-renders, better performance for forms with many fields

Tradeoff: Slightly steeper learning curve than controlled forms, but better for production applications

Form Validation Strategy
The form uses real-time validation with:

On blur: Shows errors after user leaves a field

On change: Updates validation state as user types

On submit: Final validation before submission

Visual feedback: Red borders, error messages with icons, focus states

Database Schema Design
Key decisions:

UUID primary keys: Better for distributed systems and prevents ID guessing

Status tracking: Allows referral workflow management (new → in_review → contacted → completed)

Separate attorney fields: Law firms often have different contacts than patients

Optional patient email: Some patients may not have email, but attorney email is required

Error Handling Strategy
Client-side: Zod validates before submission, preventing invalid data from reaching the server

Server-side: Database constraints and additional validation ensure data integrity

User feedback: Clear error messages for validation failures and system errors

Success response: Returns referral ID and estimated follow-up date for reference

🔧 Development Commands
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run start	Start production server
npm run db:generate	Generate Drizzle migrations
npm run db:migrate	Run database migrations
npm run db:studio	Open Drizzle Studio UI
npm run lint	Run ESLint
🗄️ Database Schema
Referrals Table
Column	Type	Description
id	UUID	Primary key, auto-generated
first_name	VARCHAR(100)	Patient first name
last_name	VARCHAR(100)	Patient last name
date_of_birth	VARCHAR(10)	Patient DOB (YYYY-MM-DD)
phone_number	VARCHAR(20)	Patient phone number
email	VARCHAR(255)	Patient email (optional)
law_firm_name	VARCHAR(200)	Referring law firm
attorney_name	VARCHAR(200)	Attorney/case manager
attorney_email	VARCHAR(255)	Attorney email
attorney_phone	VARCHAR(20)	Attorney phone
primary_complaint	TEXT	Reason for referral (max 500 chars)
preferred_location	VARCHAR(50)	Preferred clinic location
appointment_type	VARCHAR(20)	In-Person or Telemedicine
status	VARCHAR(20)	new/in_review/contacted/completed
created_at	TIMESTAMP	Auto-generated timestamp
🎯 API Endpoints
The application uses tRPC, so there's only one HTTP endpoint:

text
POST /api/trpc/referral.submitReferral
Request Schema (Shared with Frontend)
typescript
{
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  phoneNumber: string;
  email?: string;
  lawFirmName: string;
  attorneyName: string;
  attorneyEmail: string;
  attorneyPhone: string;
  primaryComplaint: string; // max 500 chars
  preferredLocation: "Anaheim" | "Culver City" | "Downey" | "El Monte" | "Long Beach" | "Los Angeles";
  appointmentType: "In-Person" | "Telemedicine";
}
Response Schema
typescript
{
  success: true,
  referralId: string,
  message: string,
  estimatedFollowUp: string // e.g., "Our team will contact the patient within 24 hours (by Thursday, April 2, 2026)"
}
🧪 Testing the Application
Form Validation Tests
Test Case	Expected Result
Empty form submission	Red borders and error messages on all required fields
Invalid email	"Please enter a valid email address"
Too short phone number	"Phone number must be at least 10 characters"
Invalid date format	"Invalid date format. Use YYYY-MM-DD"
500+ character complaint	"Primary complaint must be 500 characters or less"
Valid submission	Green success message with referral ID
Database Verification
bash
# Check if referral was saved
psql -U postgres -d referral_portal -c "SELECT * FROM referrals ORDER BY created_at DESC LIMIT 5;"

# Count total referrals
psql -U postgres -d referral_portal -c "SELECT COUNT(*) FROM referrals;"
🚦 Status Codes & Error Handling
The application handles errors gracefully:

Validation Errors: Client-side with field-specific messages

Database Errors: Server-side with user-friendly error messages

Network Errors: Handled with fallback messages and retry logic

📝 Future Improvements
Authentication: Add role-based access for clinics and administrators

File Uploads: Allow attachment of medical records or intake documents

Email Notifications: Send confirmation emails to both parties

Dashboard: Admin interface to view and manage referrals

Analytics: Track submission rates and completion times

API Rate Limiting: Prevent abuse of the referral system

Audit Logging: Track all changes to referrals

Webhooks: Integrate with external systems for real-time notifications

🤝 Contributing
This project is built as a demonstration of full-stack development with modern TypeScript technologies. For any issues or suggestions, please open an issue in the repository.

📄 License
MIT

🙏 Acknowledgments
Next.js - React framework

tRPC - End-to-end typesafe APIs

Drizzle ORM - TypeScript ORM

Tailwind CSS - Utility-first CSS

React Hook Form - Form management

Zod - TypeScript-first validation

Built with: Next.js, tRPC, Drizzle ORM, PostgreSQL, TypeScript, Tailwind CSS, React Hook Form, Zod