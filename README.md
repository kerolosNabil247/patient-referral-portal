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

- Node.js
- PostgreSQL (local installation or cloud database)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kerolosNabil247/patient-referral-portal.git
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

# Start PostgreSQL (Windows) (postgresql-x64-17 may differ depend on your postgresql version)
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
```
## 📐 Architecture Decisions

### Next.js App Router
**Why**: Provides server-side rendering for better SEO and initial load performance while maintaining client-side interactivity. The App Router offers better layout organization and server components.

**Tradeoff**: Slightly more complex than Pages Router, but provides better scalability for larger applications.

### tRPC for API Layer
**Why**: Enables end-to-end type safety without code generation. The same TypeScript types are used on both client and server, eliminating API contract mismatches.

**Tradeoff**: Less common than REST, but the type safety benefits significantly reduce runtime errors.

### Drizzle ORM
**Why**: Type-safe SQL with excellent TypeScript support. Provides better performance than Prisma for complex queries and gives full control over SQL generation.

**Tradeoff**: Requires manual migration management, but offers better performance and flexibility.

### Zod for Validation
**Why**: Single source of truth for validation logic. The same schema validates data on both client and server, ensuring consistency.

**Tradeoff**: Slight overhead of maintaining schemas, but prevents validation drift between layers.

### React Hook Form
**Why**: Uncontrolled components reduce re-renders, providing better performance for forms with many fields.

**Tradeoff**: Slightly steeper learning curve than controlled forms, but better for production applications.

## 🗄️ Database Schema

The `referrals` table stores all patient referrals with the following structure:

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| first_name | VARCHAR(100) | Patient first name |
| last_name | VARCHAR(100) | Patient last name |
| date_of_birth | VARCHAR(10) | Patient date of birth |
| phone_number | VARCHAR(20) | Patient contact |
| email | VARCHAR(255) | Optional patient email |
| law_firm_name | VARCHAR(200) | Referring law firm |
| attorney_name | VARCHAR(200) | Attorney/case manager |
| attorney_email | VARCHAR(255) | Attorney email |
| attorney_phone | VARCHAR(20) | Attorney phone |
| primary_complaint | TEXT | Referral reason (max 500 chars) |
| preferred_location | VARCHAR(50) | Clinic location (Anaheim, Culver City, Downey, El Monte, Long Beach, Los Angeles) |
| appointment_type | VARCHAR(20) | In-Person or Telemedicine |
| status | VARCHAR(20) | Workflow status (new, in_review, contacted, completed) |
| created_at | TIMESTAMP | Auto-generated timestamp |

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate migrations |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Drizzle Studio |

🤝 Contributing
This project is built as a demonstration of full-stack development with modern TypeScript technologies. For any issues or suggestions, please open an issue in the repository.


🙏 Acknowledgments
Next.js - React framework

tRPC - End-to-end typesafe APIs

Drizzle ORM - TypeScript ORM

Tailwind CSS - Utility-first CSS

React Hook Form - Form management

Zod - TypeScript-first validation

Built with: Next.js, tRPC, Drizzle ORM, PostgreSQL, TypeScript, Tailwind CSS, React Hook Form, Zod
