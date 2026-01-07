# 💬 Chatify — Real-Time Chat Application

Chatify is a full-stack real-time chat application built using the MERN stack and Socket.IO, enabling users to securely authenticate, manage profiles, and exchange messages instantly without page refresh.

The project focuses on:
- Clean backend architecture
- Secure authentication using JWT + cookies
- Real-time bidirectional communication
- Scalable and maintainable frontend using React + Zustand

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User signup, login, logout
- JWT-based authentication stored in HTTP-only cookies
- Protected routes using middleware

### 💬 Real-Time Messaging
- Instant message delivery using Socket.IO
- No page refresh required
- Live updates when messages arrive

### 👤 User Management
- Sidebar showing all registered users except the logged-in user
- Profile picture support
- Persistent login using cookies

### 🎨 UI & State Management
- React + Vite frontend
- Zustand for global state management
- Skeleton loaders for better UX

### ☁️ Media Support
- Image messages uploaded via Cloudinary

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Zustand (State Management)
- Axios
- Tailwind CSS
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- Cookie-parser
- Cloudinary

---


## 🔐 Authentication Flow
1. User logs in with email & password
2. Backend verifies credentials
3. JWT token is created and stored in HTTP-only cookies
4. Protected routes use middleware to verify token
5. User session persists across refreshes

---

## 🔌 Real-Time Messaging Workflow (Socket.IO)

### Server Side
- Express app is wrapped inside an HTTP server
- Socket.IO runs on top of the same server
- Each connected client gets a unique `socket.id`
- Online users tracked using a Map (`userId → socketId`)

### Client Side
- User logs in
- Socket connection is established
- Client emits `setup` event with `userId`
- Server maps `userId` to `socket.id`
- Messages are stored in MongoDB and emitted instantly

---

## 📨 Message Flow
1. User selects a contact
2. Messages fetched via REST API
3. New messages:
   - Sent via HTTP POST
   - Broadcast instantly via Socket.IO
4. Receiver sees the message instantly without refresh

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/`:

port: 3000

mongodb:
  uri: your_mongodb_connection_string

jwt:
  secret: your_secret_key

cloudinary:
  cloud_name: xxxx
  api_key: xxxx
  api_secret: xxxx

installation:
  step_1_clone_repository:
    - git clone https://github.com/your-username/chatify.git
    - cd chatify

  step_2_backend_setup:
    - cd backend
    - npm install
    - npm run dev

  step_3_frontend_setup:
    - cd frontend
    - npm install
    - npm run dev

---

## 🧠 Design Choices

### ✔ Socket.IO over Polling
- Enables real-time messaging
- Reduces unnecessary API calls

### ✔ JWT in Cookies
- Secure
- Prevents XSS token access
- Allows auto-login on refresh

### ✔ Zustand for State Management
- Lightweight
- Minimal boilerplate
- Ideal for chat applications

### ✔ REST + WebSockets Hybrid
- REST for persistence
- WebSockets for real-time updates

---

## 🚧 Future Improvements
- Message read receipts
- Typing indicators
- Online/offline status
- Group chats
- Message deletion
- End-to-end encryption
