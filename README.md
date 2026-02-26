# DEVELOPING AN ONLINE RECRUITMENT SYSTEM USING MACHINE LEARNING APPLICATIONS TO DETECT FRAUDULENT RECRUITMENT
Frontend for total_job – a full-stack job recruitment platform connecting Job Seekers, Employers, and Administrators. Built with Next.js and seamlessly integrated with the Django backend API.

## Features
### Authentication & User Interface
- Multi-role login/registration flows (Job Seeker / Employer / Admin)
- Persistent login with JWT token management
- Role-based navigation and protected routes
### Job Seeker Module
- Personal profile management with CV upload
- Advanced job search with filters (location, salary, industry, job type)
- One-click job application with real-time feedback
- Track application status dashboard
- Save and manage favorite jobs
### Employer Module
- Company profile management with logo upload
- Job posting form with validation
- Manage active/expired job listings
- Review applicants and update candidature status
- Recruitment analytics dashboard
### Admin Module
- User management interface (approve/suspend accounts)
- Job moderation queue (approve/reject postings)
- Category management (industries, locations, job types)
- Platform statistics overview
### Public Pages
- Homepage with featured jobs and companies
- Browse all jobs with pagination
- Company directory
- Job details page (public view)
### Tech Stack
|Layer|Technology|
|Framework|Next.js (App Router)|
|Language|JavaScript|
|Styling|CSS Modules|
|State Management|React Hooks (useState, useEffect, useContext)|
|API Integration|Fetch API|
|Authentication|JWT (stored in localStorage/httpOnly cookies)|
|Deployment|Vercel (recommended)|
|Version Control| Git/GitHub|
### Installation
Prerequisites
- Node.js 18+
- npm / yarn / pnpm / bun
- Backend API running (total_job_BE)
### Steps
Clone repository
```
git clone https://github.com/PTPhuoc/total_job_FE.git
cd total_job_FE
```
### Install dependencies
```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
### Configure environment variables
Create a .env.local file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=total_job
```
### Run development server
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open in browser
Visit http://localhost:3000
### Project Structure
```
total_job_FE/
├── public/                  # Static assets
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.js          # Homepage
│   │   ├── layout.js        # Root layout
│   │   ├── jobs/            # Job listing pages
│   │   ├── jobs/[id]/       # Job detail page
│   │   ├── auth/            # Login/Register pages
│   │   ├── dashboard/       # Role-based dashboards
│   │   │   ├── seeker/      # Job seeker dashboard
│   │   │   ├── employer/    # Employer dashboard
│   │   │   └── admin/       # Admin dashboard
│   │   └── profile/         # Profile management
│   ├── components/           # Reusable components
│   │   ├── common/          # Button, Input, Card, etc.
│   │   ├── layout/          # Header, Footer, Sidebar
│   │   ├── jobs/            # JobCard, JobFilters
│   │   └── forms/           # Registration, JobPost forms
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js       # Authentication hook
│   │   └── useFetch.js      # API fetching hook
│   ├── context/             # React Context
│   │   └── AuthContext.js   # Global auth state
│   ├── utils/               # Helper functions
│   │   ├── api.js           # API caller
│   │   └── validators.js    # Form validation
│   └── styles/              # Global styles
│       └── globals.css
├── .env.local               # Environment variables
├── next.config.mjs          # Next.js configuration
├── package.json
└── README.md
```
### Testing
Run tests:
```
npm run test
```
Test coverage includes:
- Component rendering
- Form validation
- Authentication flows
- API integration mocking
### Contributing
Contributions are welcome! Please:
- Fork the repository
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit changes (git commit -m 'Add AmazingFeature')
- Push to branch (git push origin feature/AmazingFeature)
- Open a Pull Request
### License
This project is licensed under the MIT License.
### Contact
Phuoc - GitHub
Project Link: https://github.com/PTPhuoc/total_job_FE




