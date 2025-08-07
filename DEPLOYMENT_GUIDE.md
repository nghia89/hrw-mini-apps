# 🚀 HƯỚNG DẪN DEPLOYMENT MULTI MINI APPS

## 📋 TỔNG QUAN

Project này chứa nhiều React Mini Apps được thiết kế để nhúng vào React Native WebView:

### Cấu trúc thư mục:

```
hrw-mini-apps/
├── feedback-mini-app/          # Mini App phản hồi
│   ├── src/
│   ├── dist/                   # Build output
│   ├── package.json
│   └── vite.config.js
├── home-page-mini-app/         # Mini App trang chủ
│   ├── src/
│   ├── dist/                   # Build output
│   ├── package.json
│   └── vite.config.js
├── vercel.json                 # Cấu hình Vercel
├── Dockerfile                  # Cấu hình Docker
├── docker-compose.yml          # Docker Compose
├── nginx.conf                  # Cấu hình NGINX
└── package.json               # Root package.json

```

### URLs sau khi deploy:

- **Vercel**:
  - `https://your-project.vercel.app/feedback-mini-app/`
  - `https://your-project.vercel.app/home-page-mini-app/`
- **VPS Docker**:
  - `http://YOUR_VPS_IP/feedback-mini-app/`
  - `http://YOUR_VPS_IP/home-page-mini-app/`

---

## 🔧 PHẦN 1: CẤU HÌNH VITE CHO TỪNG MINI APP

### 1.1. Feedback Mini App - `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/feedback-mini-app/", // ⚠️ QUAN TRỌNG: Base path
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    open: "/feedback-mini-app/",
  },
});
```

### 1.2. Home Page Mini App - `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/home-page-mini-app/", // ⚠️ QUAN TRỌNG: Base path khác
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3001, // Port khác để chạy đồng thời
    open: "/home-page-mini-app/",
  },
});
```

### 1.3. Cập nhật React Router trong từng App:

**Feedback App - `src/App.jsx`:**

```javascript
// ⚠️ basename phải khớp với Vite base
<Router basename="/feedback-mini-app">
```

**Home Page App - `src/App.jsx`:**

```javascript
// ⚠️ basename phải khớp với Vite base
<Router basename="/home-page-mini-app">
```

---

## 🌐 PHẦN 2: DEPLOYMENT LÊN VERCEL

### 2.1. Cấu hình Root `package.json`:

```json
{
  "name": "hrw-mini-apps",
  "workspaces": ["feedback-mini-app", "home-page-mini-app"],
  "scripts": {
    "build": "npm run build:feedback && npm run build:home",
    "build:feedback": "cd feedback-mini-app && npm run build",
    "build:home": "cd home-page-mini-app && npm run build",
    "vercel-build": "npm run build"
  }
}
```

### 2.2. File `vercel.json` hoàn chỉnh:

✅ **ĐÃ TẠO** - Có cấu hình:

- 2 builds riêng biệt cho từng app
- Routes và rewrites cho React Router
- Security headers
- Cache optimization

### 2.3. Các bước deploy lên Vercel:

#### **Phương pháp 1: Vercel CLI (Khuyến nghị)**

```bash
# 1. Cài đặt Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Di chuyển đến thư mục root
cd /Users/nguyenthanhnghia/Projects/Company/hrw-mini-apps

# 4. Cài đặt dependencies cho tất cả apps
npm run install:all

# 5. Build tất cả apps
npm run build

# 6. Deploy
vercel

# 7. Thiết lập project:
# - Project name: hrw-mini-apps
# - Directory: . (current)
# - Override settings: No
```

#### **Phương pháp 2: GitHub + Vercel Dashboard**

```bash
# 1. Push code lên GitHub
git add .
git commit -m "Add multi mini apps deployment config"
git push origin main

# 2. Vào vercel.com → New Project
# 3. Import từ GitHub repository
# 4. Vercel sẽ tự động detect cấu hình
```

### 2.4. Environment Variables (nếu cần):

```bash
# Thêm biến môi trường qua CLI
vercel env add VITE_API_URL
vercel env add VITE_APP_TOKEN

# Hoặc qua Dashboard: Settings → Environment Variables
```

### 2.5. Kiểm tra deployment:

- Feedback App: `https://hrw-mini-apps.vercel.app/feedback-mini-app/`
- Home App: `https://hrw-mini-apps.vercel.app/home-page-mini-app/`

---

## 🐳 PHẦN 3: DEPLOYMENT LÊN VPS DÙNG DOCKER

### 3.1. Cấu hình NGINX (`nginx.conf`):

✅ **ĐÃ TẠO** - Có cấu hình:

- Serve 2 apps từ alias directories
- Fallback routes cho React Router
- Security headers và compression
- Static assets caching

### 3.2. Dockerfile với Multi-stage Build:

✅ **ĐÃ TẠO** - Có features:

- Multi-stage build (Node.js → NGINX)
- Cài đặt dependencies và build apps
- Security: non-root user
- Health check endpoint

### 3.3. Docker Compose:

✅ **ĐÃ TẠO** - Có cấu hình:

- Port mapping 80:80
- Health check
- Restart policy
- Network và volumes

### 3.4. Các bước deploy lên VPS:

#### **Bước 1: Chuẩn bị VPS**

```bash
# SSH vào VPS
ssh root@YOUR_VPS_IP

# Cài Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra
docker --version
docker-compose --version
```

#### **Bước 2: Upload code lên VPS**

```bash
# Từ máy local, upload code
scp -r /Users/nguyenthanhnghia/Projects/Company/hrw-mini-apps root@YOUR_VPS_IP:/opt/

# Hoặc clone từ GitHub
ssh root@YOUR_VPS_IP
cd /opt
git clone https://github.com/your-username/hrw-mini-apps.git
cd hrw-mini-apps
```

#### **Bước 3: Build và chạy Docker**

```bash
# SSH vào VPS và di chuyển đến thư mục project
ssh root@YOUR_VPS_IP
cd /opt/hrw-mini-apps

# Build Docker image
docker-compose build

# Chạy container
docker-compose up -d

# Kiểm tra logs
docker-compose logs -f

# Kiểm tra container
docker ps
```

#### **Bước 4: Kiểm tra deployment**

```bash
# Kiểm tra health
curl http://YOUR_VPS_IP/health

# Kiểm tra apps
curl http://YOUR_VPS_IP/feedback-mini-app/
curl http://YOUR_VPS_IP/home-page-mini-app/
```

#### **Bước 5: Cấu hình Firewall (nếu cần)**

```bash
# Ubuntu/Debian
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### 3.5. Các lệnh quản lý Docker hữu ích:

```bash
# Xem logs
docker-compose logs -f hrw-mini-apps

# Restart container
docker-compose restart

# Stop containers
docker-compose down

# Rebuild và restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Xem resource usage
docker stats
```

---

## 🔧 PHẦN 4: BUILD VÀ KIỂM TRA LOCAL

### 4.1. Build tất cả apps:

```bash
cd /Users/nguyenthanhnghia/Projects/Company/hrw-mini-apps

# Cài đặt dependencies
npm install
cd feedback-mini-app && npm install && cd ..
cd home-page-mini-app && npm install && cd ..

# Build tất cả
npm run build
```

### 4.2. Test local với Docker:

```bash
# Build Docker image
docker build -t hrw-mini-apps .

# Chạy container
docker run -p 8080:80 hrw-mini-apps

# Test
open http://localhost:8080/feedback-mini-app/
open http://localhost:8080/home-page-mini-app/
```

### 4.3. Test local với serve:

```bash
# Cài serve globally
npm install -g serve

# Serve feedback app
cd feedback-mini-app
serve -s dist -l 3000

# Serve home app (terminal khác)
cd home-page-mini-app
serve -s dist -l 3001
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 4.1. Về Base Path:

- **Vercel**: `base: '/app-name/'` trong `vite.config.js`
- **Router**: `basename="/app-name"` trong React Router
- **Deployment**: URL sẽ là `domain.com/app-name/`

### 4.2. Về WebView Integration:

```javascript
// Trong React Native WebView
<WebView
  source={{ uri: "https://your-domain.com/feedback-mini-app/" }}
  // hoặc
  source={{ uri: "http://YOUR_VPS_IP/feedback-mini-app/" }}
/>
```

### 4.3. Về Token Authentication:

- Apps sẽ nhận token từ React Native qua `window.postMessage`
- Đảm bảo có CORS headers phù hợp
- Test token flow trước khi deploy production

### 4.4. Environment Variables:

```bash
# Vercel
VITE_API_URL=https://api.example.com
VITE_APP_NAME=feedback-mini-app

# Docker có thể add vào docker-compose.yml:
environment:
  - VITE_API_URL=https://api.example.com
```

---

## 🚀 CHECKLIST DEPLOYMENT

### ✅ Vercel Deployment:

- [ ] Cấu hình `vercel.json`
- [ ] Update base paths trong `vite.config.js`
- [ ] Update React Router basenames
- [ ] Test build locally: `npm run build`
- [ ] Deploy: `vercel`
- [ ] Test URLs trên production

### ✅ Docker VPS Deployment:

- [ ] Cấu hình `nginx.conf`
- [ ] Tạo `Dockerfile` và `docker-compose.yml`
- [ ] Setup VPS với Docker
- [ ] Upload/clone code lên VPS
- [ ] Build và run: `docker-compose up -d`
- [ ] Test URLs trên VPS

### ✅ Testing:

- [ ] Test React Router routes
- [ ] Test mobile responsiveness
- [ ] Test token authentication từ WebView
- [ ] Test API calls với CORS
- [ ] Load testing với traffic cao

---

## 📞 TROUBLESHOOTING

### Lỗi thường gặp:

1. **404 khi refresh page**:

   - Kiểm tra fallback routes trong `vercel.json` hoặc `nginx.conf`

2. **Assets không load**:

   - Kiểm tra `base` path trong `vite.config.js`

3. **React Router không hoạt động**:

   - Đảm bảo `basename` khớp với deployment path

4. **Docker build fail**:

   - Kiểm tra dependencies trong `package.json`
   - Xem logs: `docker-compose logs`

5. **CORS errors từ WebView**:
   - Add CORS headers trong `nginx.conf` hoặc Vercel config

---

**🎯 Kết quả**: Sau khi hoàn thành, bạn sẽ có 2 Mini Apps chạy song song trên cả Vercel và VPS, sẵn sàng nhúng vào React Native WebView!
