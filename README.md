# 🚀 HRW Mini Apps

Multiple React Mini Apps designed for React Native WebView integration.

## 📋 Overview

This project contains multiple React mini applications that can be embedded into React Native apps via WebView:

- **Feedback Mini App** - User feedback collection system
- **Home Page Mini App** - Landing page and navigation

## 🏗️ Project Structure

```
hrw-mini-apps/
├── feedback-mini-app/          # Feedback collection mini app
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── home-page-mini-app/         # Home page mini app
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── vercel.json                 # Vercel deployment config
├── Dockerfile                  # Docker container config
├── docker-compose.yml          # Docker Compose setup
├── nginx.conf                  # NGINX configuration
└── deploy.sh                   # Automated deployment script
```

## 🌐 Live URLs

### Production (Vercel)
- **Feedback App**: `https://hrw-mini-apps.vercel.app/feedback-mini-app/`
- **Home App**: `https://hrw-mini-apps.vercel.app/home-page-mini-app/`

### VPS Docker (when deployed)
- **Feedback App**: `http://YOUR_VPS_IP/feedback-mini-app/`
- **Home App**: `http://YOUR_VPS_IP/home-page-mini-app/`

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/nghia89/hrw-mini-apps.git
cd hrw-mini-apps

# Install all dependencies
npm run install:all
```

### Development Commands
```bash
# Start feedback app (port 3000)
npm run dev:feedback

# Start home app (port 3001)
npm run dev:home

# Build all apps
npm run build

# Clean build artifacts
npm run clean
```

### Local Testing
```bash
# Build and test locally
npm run build
./test-local.sh serve

# Open in browser:
# http://localhost:8080/feedback-mini-app/
# http://localhost:8080/home-page-mini-app/
```

## 🚀 Deployment

### Quick Deploy
```bash
# Deploy to both Vercel and Docker
./deploy.sh both

# Deploy to Vercel only
./deploy.sh vercel

# Deploy to Docker only  
./deploy.sh docker
```

### Manual Deployment

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Docker VPS
```bash
# On your VPS
git clone <repository>
cd hrw-mini-apps
docker-compose up -d
```

## 📱 React Native Integration

```javascript
import { WebView } from 'react-native-webview';

export default function MiniAppScreen() {
  return (
    <WebView
      source={{ 
        uri: 'https://hrw-mini-apps.vercel.app/feedback-mini-app/' 
      }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onMessage={(event) => {
        // Handle messages from mini app
        const data = JSON.parse(event.nativeEvent.data);
        console.log('Received from mini app:', data);
      }}
    />
  );
}
```

## 🔧 Configuration

### Base Paths
Each mini app has its own base path configured in `vite.config.js`:

```javascript
// feedback-mini-app/vite.config.js
export default defineConfig({
  base: '/feedback-mini-app/',  // Important for deployment
  // ...
});
```

### Environment Variables
Create `.env.local` files in each mini app:

```bash
# feedback-mini-app/.env.local
VITE_API_URL=https://api.example.com
VITE_APP_TOKEN=your-token-here
```

## 🐳 Docker

### Build and Run
```bash
# Build Docker image
docker-compose build

# Run containers
docker-compose up -d

# View logs
docker-compose logs -f
```

### Health Check
```bash
curl http://localhost/health
```

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [404 Fix Guide](./FIX_404_GUIDE.md) - Troubleshooting common issues
- [404 Fix Summary](./404_FIX_SUMMARY.md) - Recent fixes applied

## 🔍 Troubleshooting

### Common Issues

1. **404 on assets**: Check base path in `vite.config.js`
2. **React Router not working**: Verify basename matches deployment path
3. **Build failures**: Run `npm run clean` then rebuild
4. **Docker issues**: Check logs with `docker-compose logs`

### Debug Commands
```bash
# Check build output
ls -la */dist/

# Test network requests
curl -I https://hrw-mini-apps.vercel.app/feedback-mini-app/

# View Vercel logs
vercel logs
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-mini-app`
3. Commit changes: `git commit -am 'Add new mini app'`
4. Push to branch: `git push origin feature/new-mini-app`
5. Submit pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions:
- Create GitHub issue
- Contact development team
- Check documentation in `/docs` folder

---

**🎯 Built for seamless React Native WebView integration with modern deployment practices.**
