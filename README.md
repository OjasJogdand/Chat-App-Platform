💬 Chatify — Real-Time Chat Application

Chatify is a full-stack real-time chat application built using the MERN stack and Socket.IO, enabling users to securely authenticate, manage profiles, and exchange messages instantly without page refresh.

The project focuses on:

Clean backend architecture

Secure authentication using JWT + cookies

Real-time bidirectional communication

Scalable and maintainable frontend using React + Zustand

🚀 Features

🔐 Authentication & Authorization

User signup, login, logout

JWT-based authentication stored in HTTP-only cookies

Protected routes using middleware

💬 Real-Time Messaging

Instant message delivery using Socket.IO

No page refresh required

Live updates when messages arrive

👤 User Management

Sidebar showing all registered users except the logged-in user

Profile picture support

Persistent login using cookies

🎨 UI & State Management

React + Vite frontend

Zustand for global state management

Skeleton loaders for better UX

☁️ Media Support

Image messages uploaded via Cloudinary

🧱 Tech Stack
Frontend

React (Vite)

Zustand (state management)

Axios

Tailwind CSS

Socket.IO Client

Backend

Node.js

Express.js

MongoDB + Mongoose

Socket.IO

JWT (Authentication)

Cookie-parser

Cloudinary

📁 Project Structure
chatify/
├── backend/
│   ├── routes/
│   │   ├── auth/
│   │   │   ├── signup.js
│   │   │   ├── login.js
│   │   │   ├── logout.js
│   │   │   ├── checkAuth.js
│   │   │   └── updateProfile.js
│   │   └── messages/
│   │       └── message_routes.js
│   ├── middleware/
│   │   └── protect.js
│   ├── db/
│   │   └── db.js
│   ├── lib/
│   │   ├── cloudinary.js
│   │   └── socket.js
│   ├── index.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   └── skeletons/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useThemeStore.js
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
│
└── README.md

🔐 Authentication Flow

User logs in with email & password

Backend verifies credentials

JWT token is created and stored in HTTP-only cookies

Protected routes use middleware to verify token

User session persists across refreshes

🔌 Real-Time Messaging Workflow (Socket.IO)
Server Side

Express app is wrapped inside an HTTP server

Socket.IO runs on top of the same server

Each connected client gets a unique socket.id

Online users are tracked using a Map (userId → socketId)

Client Side

User logs in

Socket connection is established

Client emits setup event with userId

Server maps userId to socket.id

When a message is sent:

Stored in MongoDB

Emitted instantly to the receiver via socket

📨 Message Flow

User selects a contact

Messages are fetched via REST API

New messages are:

Sent via HTTP POST

Broadcast instantly via Socket.IO

Receiver sees the message instantly without refresh

⚙️ Environment Variables

Create a .env file in backend/:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

🛠️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/chatify.git
cd chatify

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend + Socket.IO runs on:

http://localhost:3000

🧠 Design Choices

✔ Socket.IO over polling

Enables real-time messaging

Reduces unnecessary API calls

✔ JWT in Cookies

Secure

Prevents XSS token access

Allows auto-login on refresh

✔ Zustand for State

Lightweight

Minimal boilerplate

Perfect for chat apps

✔ REST + WebSockets Hybrid

REST for persistence

WebSockets for real-time updates

🚧 Future Improvements

Message read receipts

Typing indicators

Online/offline status

Group chats

Message deletion

End-to-end encryption
