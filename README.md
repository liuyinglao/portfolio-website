# Portfolio Website with ShareList

A React portfolio website featuring a ShareList component for sharing tools and furniture with friends, powered by a Node.js backend.

## 🚀 Quick Start Commands

### **Frontend (React App)**
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### **Backend (ShareList API)**
```bash
# Navigate to backend folder
cd backend

# Start development server (auto-restart on changes)
npm run dev

# Start production server
npm start

# Install dependencies (if needed)
npm install
```

## 🔧 Development Setup

### **1. Start Backend API**
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# You should see:
# 🚀 ShareList API server running on port 5001
# 📊 Health check: http://localhost:5001/api/health
# 📝 Items API: http://localhost:5001/api/items
```

### **2. Start Frontend**
```bash
# Terminal 2: Start React app (from project root)
npm start

# React app runs on http://localhost:3000
# Frontend automatically connects to backend on http://localhost:5001
```

### **3. Access the Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api/health
- **ShareList**: http://localhost:3000 → Navigate to ShareList tab

## 📁 Project Structure

```
portfolio-website/
├── src/                          # Frontend React code
│   ├── routes/
│   │   └── sharelist.component.tsx
│   └── api/
│       └── shareListAPI.ts
├── backend/                      # Backend API server
│   ├── server.js                # Main server file
│   ├── package.json            # Backend dependencies & scripts
│   └── sharelist.db            # SQLite database (created automatically)
├── package.json                # Frontend dependencies & scripts
└── README.md                   # This file
```

## 🗄️ Database

- **Type**: SQLite (file-based database)
- **Location**: 
  - Local: `backend/sharelist.db`
  - Production: `/tmp/sharelist.db` (Railway)
- **Auto-created**: Database and tables are created automatically on first run
- **Categories**: Items can be categorized as Tool, Furniture, Game, or Other

## 🌐 API Endpoints

- `GET /api/health` - Health check
- `GET /api/items` - Get all shared items
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `PATCH /api/items/:id/toggle` - Toggle availability

## 🔧 Environment Configuration

### **Backend Environment Variables**
Create `backend/.env` file:
```env
NODE_ENV=development
PORT=5001
ALLOWED_ORIGINS=http://localhost:3000
```

### **Frontend Environment Variables**
Create `.env` file in project root:
```env
REACT_APP_API_URL=http://localhost:5001
```

## 🚂 Deployment

### **Backend (Railway)**
1. Deploy backend folder to Railway
2. Set environment variables:
   ```
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   ```

### **Frontend (Vercel/Netlify)**
1. Deploy frontend to your preferred platform
2. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-railway-backend.railway.app
   ```

## 🧪 Testing

### **Test Backend**
```bash
# Health check
curl http://localhost:5001/api/health

# Get items
curl http://localhost:5001/api/items

# Create item
curl -X POST http://localhost:5001/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","category":"tool","purchaseDate":"2024-01-01"}'
```

### **Test Frontend**
1. Open http://localhost:3000
2. Navigate to ShareList tab
3. Add, edit, and delete items
4. Check that changes persist after refresh

## 📋 Available Scripts Reference

### **Frontend Scripts** (from project root)
| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App |

### **Backend Scripts** (from `backend/` folder)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm start` | Start production server |
| `npm install` | Install dependencies |

## 🆘 Troubleshooting

### **Backend won't start**
- Check if port 5001 is available
- Run `npm install` in backend folder
- Check for syntax errors in server.js

### **Frontend can't connect to backend**
- Ensure backend is running on port 5001
- Check CORS configuration
- Verify API URL in frontend

### **CORS errors**
- Check backend logs for blocked origins
- Verify ALLOWED_ORIGINS environment variable
- Ensure frontend origin matches CORS config

## 🔗 Useful Links

- **Local Frontend**: http://localhost:3000
- **Local Backend**: http://localhost:5001
- **API Health**: http://localhost:5001/api/health
- **ShareList Documentation**: [ShareList_Feature_Documentation.md](./ShareList_Feature_Documentation.md)
- **Railway Deployment**: [RAILWAY_DEPLOYMENT_GUIDE.md](./RAILWAY_DEPLOYMENT_GUIDE.md)

---

**Happy coding!** 🚀
