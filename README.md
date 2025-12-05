# ⚡ QuickGPT - AI Chat Application

<div align="center">

<img width="1470" height="840" alt="Screenshot 2025-08-27 at 6 04 43 PM" src="https://github.com/user-attachments/assets/2ab8f909-9b4a-4107-ac15-117d4d719718" />

A full-stack AI-powered chat application with real-time conversations, persistent chat history, and modern UI.

**Live Demo**: [gpt-app-backend.vercel.app](https://gpt-app-backend.vercel.app)

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

</div>

---

## 📋 Overview

QuickGPT is a full-stack AI chat application that enables users to have intelligent conversations with GPT-powered AI. Built with React and Node.js, it features user authentication, persistent chat history, and a clean, responsive interface.

---

## ✨ Features

- 🤖 **AI-Powered Chat** - Real-time conversations with OpenAI GPT
- 🔐 **User Authentication** - Secure signup and login with JWT
- 💾 **Chat History** - Persistent conversation storage in MongoDB
- 🖼️ **Image Support** - Image generation and handling capabilities
- 🎨 **Modern UI** - Clean interface built with TailwindCSS
- 📱 **Responsive Design** - Works seamlessly across all devices
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- 🔒 **Secure** - JWT-based authentication and protected routes

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM
- **State Management**: Context API
- **Styling**: TailwindCSS
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API
- **Image Service**: ImageKit

---

## 📁 Project Structure

```
gpt-app/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Context providers
│   │   ├── pages/        # Page components
│   │   └── App.jsx       # Main app component
│   ├── public/           # Static assets
│   └── package.json
│
├── backend/              # Node.js backend server
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   └── server.js        # Entry point
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key
- ImageKit Account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prateet-Github/gpt-app.git
   cd gpt-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**

   **Backend `.env` file:**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url
   CLIENT_URL=http://localhost:5173
   ```

   **Frontend `.env` file:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   VITE_IMAGEKIT_URL_ENDPOINT=your_imagekit_url
   ```

4. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

---

## 📚 API Endpoints

### Authentication
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - User login
GET  /api/auth/verify      - Verify JWT token
```

### Chat
```
GET  /api/chats            - Get all user chats
POST /api/chats            - Create new chat
GET  /api/chats/:id        - Get specific chat
POST /api/chats/:id        - Add message to chat
DELETE /api/chats/:id      - Delete chat
```

### Messages
```
POST /api/messages         - Send message to AI
```

---

## 🎨 Features in Detail

### 1. User Authentication
- Secure registration and login
- JWT token-based authentication
- Protected routes and API endpoints
- Password hashing with bcrypt

### 2. Chat Management
- Create multiple chat sessions
- View chat history
- Delete conversations
- Real-time message updates

### 3. AI Integration
- OpenAI GPT API integration
- Streaming responses (if implemented)
- Context-aware conversations
- Custom system prompts

### 4. Image Handling
- Upload images to chat
- Image generation with AI
- ImageKit CDN integration
- Optimized image delivery

---

## 🔧 Configuration

### OpenAI Setup
1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Add to backend `.env` as `OPENAI_API_KEY`
3. Configure model in backend code (default: `gpt-3.5-turbo`)

### ImageKit Setup
1. Create account at [ImageKit.io](https://imagekit.io)
2. Get Public Key, Private Key, and URL Endpoint
3. Add credentials to both frontend and backend `.env`

### MongoDB Setup
**Local MongoDB:**
```bash
# Start MongoDB service
mongod
```

**MongoDB Atlas:**
1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Add to `.env` as `MONGODB_URI`

---

## 🚀 Deployment

### Backend Deployment (Vercel)

1. **Prepare for deployment**
   ```bash
   cd backend
   ```

2. **Create `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set environment variables** in Vercel dashboard

### Frontend Deployment (Vercel)

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Update API URL** in frontend `.env` to your deployed backend URL

---

## 📦 Available Scripts

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend
```bash
npm start          # Start production server
npm run dev        # Start with nodemon (hot reload)
```

---

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variable protection
- Input validation and sanitization

---

## 🎯 Future Enhancements

- [ ] Voice input/output support
- [ ] Markdown rendering in chat
- [ ] Code syntax highlighting
- [ ] Export chat history
- [ ] Multiple AI model selection
- [ ] Dark/Light theme toggle
- [ ] Chat sharing functionality
- [ ] Real-time collaboration
- [ ] Mobile app version

---

## 🐛 Known Issues

- Image generation requires ImageKit configuration
- Large responses may take time to load
- Mobile optimization ongoing

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Prateet Tiwari**
- GitHub: [@Prateet-Github](https://github.com/Prateet-Github)
- LinkedIn: [prateet-tiwari](https://www.linkedin.com/in/prateet-tiwari)
- Email: prateettiwari29@gmail.com

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for the GPT API
- [ImageKit](https://imagekit.io) for image CDN
- [MongoDB](https://www.mongodb.com) for the database
- [Vercel](https://vercel.com) for hosting

---

<div align="center">

**⭐ If you like this project, please give it a star on GitHub! ⭐**

Made with ❤️ by Prateet Tiwari

</div>
