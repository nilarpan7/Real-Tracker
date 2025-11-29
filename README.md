# Real-Time Location Tracker

A real-time location tracking application built with Node.js, Express, and Socket.IO.

## Features

- Real-time location tracking using WebSockets
- Multiple user support
- Live location updates

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser at `http://localhost:3000`

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Render will auto-detect the `render.yaml` configuration
6. Click "Create Web Service"

### Deploy to Railway

1. Push your code to GitHub
2. Go to [Railway](https://railway.app/)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect and deploy your Node.js app

### Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Push code: `git push heroku main`

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Tech Stack

- Node.js
- Express.js
- Socket.IO
- EJS templating
