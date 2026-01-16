# Smart Task Organizer

**Smart Task Organizer** is an AI-powered task management app that organizes your tasks intelligently. Enter tasks in natural language (e.g., “On Monday evening I have a paper”) and the app automatically arranges them by importance, date, and time.

---

## Features

* **AI-powered task organization:** Tasks are automatically prioritized and scheduled.
* **Add, edit, delete tasks:** Easy management through a simple interface.
* **Search and filter tasks:** Quickly find tasks by keywords, date, or priority.
* **Time and date management:** Assign reminders and deadlines effortlessly.

---

## Project Structure

Here’s how the project files are organized:

```
Smart-Task-Organizer/
│
├── backend/                # Node.js + Express backend
│   ├── controllers/        # Request handlers for API endpoints
│   ├── models/             # Database schemas
│   ├── routes/             # API routes
│   ├── utils/              # Helper functions and AI integration
│   └── server.js           # Entry point for backend
│
├── frontend/               # React frontend
│   ├── public/             # Static files like index.html
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # App pages (Home, Tasks, etc.)
│   │   ├── services/       # API calls
│   │   └── App.js          # Main React app
│
├── .gitignore              # Files and folders to ignore in Git
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

> This structure separates backend and frontend clearly, making the app easier to maintain and scale.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nouman46/Smart-Task-organizer.git
   cd Smart-Task-organizer
   ```
2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```
4. Start backend server:

   ```bash
   cd ../backend
   npm start
   ```
5. Start frontend:

   ```bash
   cd ../frontend
   npm start
   ```
6. Open your browser at `http://localhost:3000`

---
## Screenshot

<img width="1876" height="836" alt="image" src="https://github.com/user-attachments/assets/b672b0fb-16a1-4b2c-b0ed-5f5f0600368e" />

---

## How It Works

1. Enter tasks in plain language.
2. AI parses your input to extract:

   * Task description
   * Date and time
   * Priority and importance
3. Tasks are automatically sorted and displayed in a structured list.

---

## Tech Stack

* **Frontend:** React
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **AI Integration:** NLP-based task parsing for intelligent scheduling

---


---

## License

This project is licensed under the MIT License.

---
