# StudyForge

StudyForge is a full-stack MERN EdTech platform where students can explore and purchase courses, instructors can create and manage course content, and users can track progress in enrolled courses.

## Features

- Role-based authentication (`Student`, `Instructor`, `Admin`) with OTP-based signup and JWT auth
- Course creation and management for instructors (course details, sections, subsections, publish/draft)
- Category-wise catalog and course detail pages
- Student enrollment flow with Razorpay payment integration
- Course progress tracking and lecture completion updates
- Ratings and reviews system for enrolled students
- Profile management (update profile, display picture, password, account delete)
- Contact form and transactional email flows (OTP, password reset, enrollment/payment emails)
- AI chatbot endpoint powered by Google Gemini

## Tech Stack

### Frontend

- React 18
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + Bcrypt
- Cloudinary (media storage)
- Razorpay (payments)
- Nodemailer (emails)
- Gemini API (`@google/generative-ai`)

## Project Structure

```text
study-forge/
├── src/                    # React frontend
├── public/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── middlewares/
│   └── mails/templates/
├── package.json            # Frontend scripts + concurrent dev script
└── server/package.json     # Backend scripts
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/utsav1122/study-forge.git
cd study-forge
```

### 2. Install dependencies

```bash
npm install
cd server && npm install
cd ..
```

### 3. Configure environment variables

Create these files:

- `.env` (frontend root)
- `server/.env` (backend)

#### Frontend `.env`

```env
REACT_APP_SERVER_BASE_URL=http://localhost:8000/api/v1
```

#### Backend `server/.env`

```env
PORT=8000
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=StudyForge

MAIL_HOST=smtp_provider_host
MAIL_USER=your_email_username
MAIL_PASS=your_email_password
INFO_MAIL=support_email_address

RAZORPAY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret

REACT_APP_LINK=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
```

## Run the App

### Development (client + server together)

```bash
npm run dev
```

This starts:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

### Run services separately

Frontend only:

```bash
npm start
```

Backend only:

```bash
npm run server
```

## Available Scripts

From project root:

- `npm start` - start React app
- `npm run build` - build frontend for production
- `npm run server` - start backend in dev mode (`nodemon`)
- `npm run dev` - run client and server concurrently

From `server/`:

- `npm run dev` - start backend with nodemon
- `npm start` - start backend with node

## API Base Route

Backend APIs are exposed under:

```text
/api/v1
```

Major route groups:

- `/auth` - authentication and password flows
- `/course` - courses, categories, sections, ratings, progress
- `/payment` - Razorpay payment flow
- `/profile` - user profile management
- `/reach` - contact form
- `/chat` - Gemini-powered chatbot

## Notes

- Ensure MongoDB, Cloudinary, Razorpay, and mail credentials are configured before testing full flows.
- Payment endpoints are protected and require authenticated student tokens.
- CORS is currently configured for `http://localhost:3000` in backend.

## Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

## License

This project is licensed under the ISC License.
