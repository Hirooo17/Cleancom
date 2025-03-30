Clean-Com
A modern authentication and verification system with a clean UI.
📋 Features

User registration and login
Email verification
Password reset functionality
Responsive UI with modern design
Toast notifications
OTP verification

🚀 Getting Started
Prerequisites
Before running this project, make sure you have the following installed:

Node.js (v16.x or later recommended)
npm (v8.x or later)

Installation and Setup
1. Clone the Repository
bashCopygit clone https://github.com/yourusername/clean-com.git
cd clean-com
2. Backend Setup
bashCopy# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create .env file (example)
cp .env.example .env

# Configure your environment variables
# Edit the .env file with your database credentials and JWT secret
3. Frontend Setup
bashCopy# Navigate to the frontend directory
cd frontend/clean-com

# Install dependencies
npm install
🏃‍♂️ Running the Application
Development Mode
Start both applications in development mode:
Backend:
bashCopycd backend
npm run dev
Frontend:
bashCopycd frontend/clean-com
npm run dev
The frontend will be available at: http://localhost:5173
The backend API will be running at: http://localhost:5000
🔧 Tech Stack

Frontend:

React.js
Tailwind CSS
React Router
Axios
React Toastify


Backend:

Node.js
Express
MongoDB/Mongoose
JWT Authentication
Nodemailer



📝 Project Structure
Copyclean-com/
├── backend/            # Express backend API
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
└── frontend/clean-com/ # React frontend
    ├── public/         # Static files
    ├── src/
    │   ├── assets/     # Images and static assets
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   └── App.jsx     # Main application
    └── index.html      # HTML entry point