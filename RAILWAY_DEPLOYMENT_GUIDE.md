# ShareList Railway Deployment Guide

## 🚀 Quick Start

Your ShareList now has a **backend API** that can be deployed to Railway for shared data between you and your friends!

## 📁 Project Structure

```
portfolio-website/
├── backend/                 # Node.js API server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── railway.json        # Railway config
│   └── env.example         # Environment variables example
├── src/
│   ├── api/
│   │   └── shareListAPI.ts # Frontend API client
│   └── routes/
│       └── sharelist.component.tsx # Updated component
└── ...
```

## 🛠️ What's Been Built

### Backend Features ✅
- **SQLite Database** with persistent storage
- **RESTful API** with full CRUD operations
- **CORS enabled** for frontend communication
- **Health check endpoint** for Railway monitoring
- **Error handling** and input validation
- **Default sample data** on first run

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `PATCH /api/items/:id/toggle` - Toggle availability

### Frontend Updates ✅
- **API integration** replacing localStorage
- **Loading states** and error handling
- **Real-time updates** when items change
- **Refresh button** to reload data
- **Better UX** with proper feedback

## 🚂 Railway Deployment Steps

### 1. Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (recommended)

### 2. Deploy Backend

#### Option A: Deploy from GitHub (Recommended)
1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add ShareList backend"
   git push origin main
   ```

2. **Create new Railway project**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your portfolio repository
   - Select the `backend` folder as root

3. **Configure deployment**
   - Railway will auto-detect Node.js
   - Set these environment variables in Railway dashboard:
     ```
     NODE_ENV=production
     PORT=3000
     ```

#### Option B: Deploy with Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to backend folder
cd backend

# Initialize and deploy
railway init
railway up
```

### 3. Get Your Backend URL
After deployment, Railway will give you a URL like:
```
https://your-app-name.railway.app
```

### 4. Update Frontend Configuration

#### Option A: Environment Variables (Recommended)
1. Create `.env` file in your **frontend root**:
   ```bash
   # .env (in portfolio-website root, not backend folder)
   REACT_APP_API_URL=https://your-app-name.railway.app
   ```

2. Add `.env` to your `.gitignore`:
   ```gitignore
   # .gitignore
   .env
   .env.local
   .env.production
   ```

#### Option B: Direct URL Update
Update `src/api/shareListAPI.ts`:
```typescript
// Replace this line:
return process.env['REACT_APP_API_URL'] || 'https://your-railway-backend.railway.app';

// With your actual Railway URL:
return process.env['REACT_APP_API_URL'] || 'https://your-actual-app-name.railway.app';
```

### 5. Update CORS Settings
In `backend/server.js`, update the CORS origin:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] // Your actual frontend URL
    : ['http://localhost:3000', 'http://127.0.0.1:3000']
}));
```

### 6. Test Your Deployment
1. **Test backend directly**:
   ```bash
   curl https://your-app-name.railway.app/api/health
   ```

2. **Test from frontend**:
   - Run your React app locally
   - Go to ShareList tab
   - Add/edit items - they should persist!

## 🔧 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: Update CORS origins in `backend/server.js`

#### 2. Database Issues
**Problem**: Items not persisting
**Solution**: Railway uses `/tmp` for writable storage (already configured)

#### 3. Environment Variables
**Problem**: API URL not working
**Solution**: Ensure `REACT_APP_API_URL` is set correctly

#### 4. Build Failures
**Problem**: Railway deployment fails
**Solution**: Check `package.json` has correct Node.js version

### Debugging Commands
```bash
# Check Railway logs
railway logs

# Check backend health
curl https://your-app-name.railway.app/api/health

# Test API locally
cd backend && npm run dev
```

## 📊 Monitoring & Maintenance

### Railway Dashboard
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Environment**: Manage environment variables
- **Deployments**: View deployment history

### Database Backup
Since SQLite runs in `/tmp`, consider:
1. **Regular exports** of your data
2. **Upgrading to PostgreSQL** for production use
3. **Implementing data export/import** features

## 🔄 Future Improvements

### High Priority
1. **User Authentication** - Secure your shared list
2. **Real-time Updates** - WebSocket for live changes
3. **Image Upload** - Add photos to items
4. **Categories Management** - Custom categories

### Medium Priority
1. **PostgreSQL Migration** - More robust database
2. **Email Notifications** - Notify when items borrowed
3. **Item History** - Track borrowing history
4. **Search & Filter** - Find items quickly

### Low Priority
1. **Mobile App** - React Native version
2. **QR Codes** - Quick item access
3. **Analytics** - Usage statistics
4. **Backup/Restore** - Data management

## 💡 Tips

### Development
- Use `npm run dev` in backend for hot reload
- Keep backend and frontend in sync
- Test API endpoints with Postman/curl

### Production
- Monitor Railway usage (free tier limits)
- Set up proper error logging
- Consider CDN for static assets
- Implement rate limiting for API

### Security
- Add authentication before going public
- Validate all inputs on backend
- Use HTTPS only in production
- Sanitize user data

## 🆘 Getting Help

### Resources
- [Railway Documentation](https://docs.railway.app)
- [Express.js Guide](https://expressjs.com)
- [SQLite Documentation](https://sqlite.org/docs.html)

### Support
- Railway Discord community
- Stack Overflow for technical issues
- GitHub Issues for code problems

---

**🎉 Congratulations!** You now have a fully functional shared ShareList that you and your friends can use together! 