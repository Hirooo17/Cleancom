It seems GitHub's Markdown renderer is having issues with your document formatting. This likely happens because of how the formatting is being copied or pasted. Let me provide a simpler approach with a very explicit step-by-step fix:

1. Create a completely new README.md file
2. Copy and paste the content below EXACTLY as-is
3. Make sure not to introduce any invisible formatting characters

Here's a simplified version that should definitely work on GitHub:

```
# Clean-Com

A modern authentication and verification system with a clean UI.

## Features

- User registration and login
- Email verification
- Password reset functionality
- Responsive UI with modern design
- Toast notifications
- OTP verification

## Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16.x or later recommended)
- npm (v8.x or later)

### Installation and Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/clean-com.git
cd clean-com
```

#### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```

#### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend/clean-com

# Install dependencies
npm install
```

### Running the Application

Start both applications in development mode:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend/clean-com
npm run dev
```

The frontend will be available at: http://localhost:5173
The backend API will be running at: http://localhost:5000

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router
- Axios
- React Toastify

**Backend:**
- Node.js
- Express
- MongoDB/Mongoose
- JWT Authentication
- Nodemailer
```

