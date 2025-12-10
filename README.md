# 🚀 InsightSprint

<div align="center">

![InsightSprint Banner](https://img.shields.io/badge/InsightSprint-AI%20Powered%20Productivity-6366f1?style=for-the-badge)

**AI-Powered Productivity & Habit Tracking Dashboard**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-84.6%25-yellow)](https://github.com/KaranRathod2003/Insight-Sprint)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/KaranRathod2003/Insight-Sprint?style=social)](https://github.com/KaranRathod2003/Insight-Sprint/stargazers)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**InsightSprint** is a full-stack MERN application designed to supercharge your productivity through intelligent task management, habit tracking, mood logging, and AI-powered insights. Built with modern web technologies, it provides an intuitive dashboard to help you stay organized, build better habits, and understand your productivity patterns.

### ✨ Why InsightSprint?

- **🎯 Holistic Productivity**: Manage tasks, track habits, and monitor your emotional well-being—all in one place
- **🤖 AI-Powered Insights**: Get intelligent summaries and recommendations based on your activity patterns
- **📊 Visual Progress Tracking**: Beautiful, intuitive visualizations of your daily, weekly, and monthly progress
- **🎨 Modern UI/UX**: Sleek, responsive design with smooth animations and glassmorphism effects
- **🔒 Secure & Private**: Your data is protected with industry-standard authentication and encryption

---

## 🌟 Features

### Core Functionality

#### 📝 Task Management
- Create, update, and delete tasks with ease
- Set priorities and deadlines
- Track completion rates and pending items
- Visual progress indicators with percentage completion

#### 🎯 Habit Tracking
- Build and maintain positive habits
- Daily habit check-ins with streak tracking
- Completion statistics and trend analysis
- Customizable habit goals and reminders

#### 😊 Mood Logging
- Daily mood tracking with emoji-based interface
- Add contextual notes to your mood entries
- Historical mood patterns and insights
- Emotional well-being analytics

#### 🤖 AI-Powered Summaries
- Intelligent analysis of your productivity patterns
- Personalized recommendations for improvement
- Weekly and monthly performance summaries
- Predictive insights based on historical data

### Dashboard Features

- **Real-time Statistics**: Live updates of tasks, habits, and mood
- **Quick Actions**: One-click access to all major features
- **Beautiful Visualizations**: Progress bars, completion percentages, and trend indicators
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark Mode Support**: Easy on the eyes, day or night (coming soon)

---

## 🎥 Demo

### Dashboard Overview
![Dashboard Screenshot](/assests/Screenshot%202025-12-09%20173317.png)

### Task Management
![Task Management](/assests/Screenshot%202025-12-09%20173333.png)

### Habit Tracking
![Habit Tracking](/assests/Screenshot%202025-12-09%20173343.png)

### Mood Logging
![Mood Logging](/assests/Screenshot%202025-12-09%20173355.png)

### Ai Summary
![Ai Summary](/assests/Screenshot%202025-12-09%20173634.png)

> 🔗 **Live Demo**: [Coming Soon](#)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - React component library
- **Lucide React** - Beautiful icon set
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing
- **Express Validator** - Input validation

### AI & Analytics
- **OpenAI API** - AI-powered insights and summaries
- **Natural Language Processing** - Mood sentiment analysis
- **Data Aggregation** - Performance metrics calculation

### DevOps & Tools
- **Git** - Version control
- **GitHub** - Code hosting and collaboration
- **Postman** - API testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/KaranRathod2003/Insight-Sprint.git
cd Insight-Sprint
git checkout dev
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Configure your .env file with the following:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# OPENAI_API_KEY=your_openai_api_key

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Configure your .env file with:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the frontend development server
npm start
```

The application will open automatically at `http://localhost:3000`

---

## 🚀 Usage

### 1. Authentication

**Register a New Account**
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login**
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### 2. Task Management

**Create a Task**
```
POST /api/tasks
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "priority": "high",
  "dueDate": "2024-12-15"
}
```

**Get Today's Tasks**
```
GET /api/tasks/today
```

**Update Task Status**
```
PATCH /api/tasks/:id
{
  "completed": true
}
```

### 3. Habit Tracking

**Create a Habit**
```
POST /api/habits
{
  "name": "Morning Exercise",
  "frequency": "daily",
  "goal": "Exercise for 30 minutes every morning"
}
```

**Mark Habit as Complete**
```
POST /api/habits/:id/complete
```

### 4. Mood Logging

**Log Today's Mood**
```
POST /api/mood
{
  "mood": "😊",
  "note": "Feeling productive and focused today!"
}
```

### 5. Get AI Summary

**Request AI-Generated Summary**
```
GET /api/summary/weekly
```

---

## 📂 Project Structure

```
Insight-Sprint/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── taskController.js     # Task management logic
│   │   ├── habitController.js    # Habit tracking logic
│   │   ├── moodController.js     # Mood logging logic
│   │   └── summaryController.js  # AI summary generation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Task.js               # Task schema
│   │   ├── Habit.js              # Habit schema
│   │   └── Mood.js               # Mood schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── tasks.js              # Task routes
│   │   ├── habits.js             # Habit routes
│   │   ├── mood.js               # Mood routes
│   │   └── summary.js            # Summary routes
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── errorHandler.js       # Error handling
│   ├── utils/
│   │   └── aiService.js          # OpenAI integration
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js  # API configuration
│   │   ├── components/
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── TaskList.jsx      # Task components
│   │   │   ├── HabitTracker.jsx  # Habit components
│   │   │   ├── MoodLogger.jsx    # Mood components
│   │   │   └── AISummary.jsx     # AI summary display
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Habits.jsx
│   │   │   ├── Mood.jsx
│   │   │   └── Summary.jsx
│   │   ├── App.js                # Main app component
│   │   ├── index.js              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env                      # Environment variables
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/insightsprint
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/insightsprint

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# AI Service
OPENAI_API_KEY=sk-your-openai-api-key-here

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=InsightSprint
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run E2E Tests
```bash
npm run test:e2e
```

---

## 📈 Roadmap

### Version 1.0 (Current)
- [x] User authentication and authorization
- [x] Task management system
- [x] Habit tracking functionality
- [x] Mood logging feature
- [x] AI-powered summaries
- [x] Responsive dashboard

### Version 2.0 (Planned)
- [ ] Dark mode support
- [ ] Calendar view for tasks and habits
- [ ] Social sharing features
- [ ] Team collaboration tools
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integrations (Google Calendar, Notion, etc.)
- [ ] Gamification with achievements and badges
- [ ] Export data to CSV/PDF
- [ ] Customizable themes

### Version 3.0 (Future)
- [ ] Voice commands and dictation
- [ ] Smart notifications and reminders
- [ ] Machine learning-based habit recommendations
- [ ] Multi-language support
- [ ] Offline mode with sync
- [ ] API for third-party integrations

---

## 🤝 Contributing

We love contributions! Whether it's bug fixes, feature additions, or documentation improvements, all contributions are welcome.

### How to Contribute

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Be respectful and constructive in discussions

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? We'd love to hear from you!

- **Bug Reports**: [Open an issue](https://github.com/KaranRathod2003/Insight-Sprint/issues/new?template=bug_report.md)
- **Feature Requests**: [Open an issue](https://github.com/KaranRathod2003/Insight-Sprint/issues/new?template=feature_request.md)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Karan Rathod**

- GitHub: [@KaranRathod2003](https://github.com/KaranRathod2003)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/karanrathod2003/)
- Email: kr04391@gmail.com

---

## 🙏 Acknowledgments

- **OpenAI** for providing the AI capabilities
- **MongoDB** for the excellent database solution
- **React Community** for the amazing ecosystem
- **Tailwind CSS** for the beautiful utility-first framework
- **All Contributors** who have helped improve this project

---

## 📞 Support

Need help? Here are some resources:

- 📖 [Documentation](https://github.com/KaranRathod2003/Insight-Sprint/wiki)
- 💬 [Discussions](https://github.com/KaranRathod2003/Insight-Sprint/discussions)
- 🐛 [Issue Tracker](https://github.com/KaranRathod2003/Insight-Sprint/issues)
- 📧 [Email Support](mailto:support@insightsprint.com)

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐️ on GitHub!

[![Star History](https://img.shields.io/github/stars/KaranRathod2003/Insight-Sprint?style=social)](https://github.com/KaranRathod2003/Insight-Sprint/stargazers)

---

<div align="center">

**Made with ❤️ by Karan Rathod**

[⬆ Back to Top](#-insightsprint)

</div>