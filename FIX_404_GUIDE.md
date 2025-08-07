# 🔧 FIX LỖI 404 MAIN.JSX - HƯỚNG DẪN TROUBLESHOOTING

## ❌ VẤN ĐỀ

Sau khi deploy lên Vercel hoặc hosting, gặp lỗi 404 với đường dẫn `main.jsx` hoặc các assets khác.

## 🔍 NGUYÊN NHÂN

1. **Absolute Path trong index.html**: Script tag dùng `/src/main.jsx` thay vì relative path
2. **Base Path không đồng bộ**: Vite config và React Router có base path khác nhau
3. **Vercel Routing**: Cấu hình routes không handle static assets đúng cách
4. **Build Output**: Assets path không match với deployment structure

## ✅ GIẢI PHÁP ĐÃ ÁP DỤNG

### 1. Sửa Script Path trong index.html

**❌ Sai:**

```html
<script type="module" src="/src/main.jsx"></script>
```

**✅ Đúng:**

```html
<script type="module" src="./src/main.jsx"></script>
```

### 2. Cấu hình Vite.config.js đồng bộ

```javascript
export default defineConfig({
  plugins: [react()],
  base: "/feedback-mini-app/", // ⚠️ QUAN TRỌNG
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": "/src", // ✅ Thêm alias resolution
    },
  },
});
```

### 3. React Router basename khớp

**App.jsx:**

```javascript
<Router basename="/feedback-mini-app">   {/* ⚠️ Phải khớp với Vite base */}
```

### 4. Vercel.json routes cho assets

```json
{
  "routes": [
    {
      "src": "/feedback-mini-app/assets/(.*)",
      "dest": "/feedback-mini-app/assets/$1" // ✅ Handle assets trước
    },
    {
      "src": "/feedback-mini-app/(.*)",
      "dest": "/feedback-mini-app/index.html" // ✅ SPA fallback sau
    }
  ]
}
```

## 🧪 KIỂM TRA LOCAL

### Test build local:

```bash
# 1. Build app
cd feedback-mini-app
npm run build

# 2. Test với serve
./test-local.sh serve

# 3. Truy cập: http://localhost:8080/feedback-mini-app/
```

### Kiểm tra output:

```bash
# Xem file HTML đã build
cat feedback-mini-app/dist/index.html | grep script

# Kết quả mong đợi:
# <script type="module" crossorigin src="/feedback-mini-app/assets/index-xxx.js"></script>
```

## 🌐 KIỂM TRA VERCEL

### Logs debugging:

```bash
# Xem build logs
vercel logs

# Deploy với debug
vercel --debug
```

### Test URLs sau deploy:

- ✅ **App**: `https://your-project.vercel.app/feedback-mini-app/`
- ✅ **Assets**: `https://your-project.vercel.app/feedback-mini-app/assets/index-xxx.js`
- ✅ **Routes**: `https://your-project.vercel.app/feedback-mini-app/feedback`

## 🐳 KIỂM TRA DOCKER

### NGINX config đã fix:

```nginx
# Serve assets trước
location /feedback-mini-app/assets/ {
    alias /usr/share/nginx/html/feedback-mini-app/assets/;
}

# SPA routes sau
location /feedback-mini-app/ {
    alias /usr/share/nginx/html/feedback-mini-app/;
    try_files $uri $uri/ /feedback-mini-app/index.html;
}
```

### Test Docker local:

```bash
# Build và test
docker-compose up -d

# Kiểm tra
curl -I http://localhost/feedback-mini-app/assets/
curl -I http://localhost/feedback-mini-app/
```

## 🔧 TROUBLESHOOTING STEPS

### 1. Kiểm tra Build Output

```bash
# Xem cấu trúc dist
tree feedback-mini-app/dist/

# Expected:
# dist/
# ├── index.html
# ├── assets/
# │   ├── index-xxx.js
# │   └── index-xxx.css
```

### 2. Verify Paths trong HTML

```bash
# Check script paths
grep -n "script" feedback-mini-app/dist/index.html

# Should contain: /feedback-mini-app/assets/
```

### 3. Test Network Tab

- Mở Developer Tools → Network
- Reload page
- Kiểm tra 404 errors
- Verify asset paths

### 4. Common Errors & Fixes

#### Lỗi: `Failed to load module script`

**Fix**: Kiểm tra script type và crossorigin

```html
<script type="module" crossorigin src="..."></script>
```

#### Lỗi: `Unexpected token '<'`

**Fix**: JavaScript file returning HTML (routing issue)

- Check Vercel routes order
- Verify NGINX try_files

#### Lỗi: Assets 404

**Fix**: Assets path mismatch

- Check Vite base config
- Verify deployment structure

## 📋 CHECKLIST FIX

- [x] ✅ Script path: `/src/main.jsx` → `./src/main.jsx`
- [x] ✅ Vite base: `/feedback-mini-app/`
- [x] ✅ Router basename: `/feedback-mini-app`
- [x] ✅ Vercel routes: Assets trước, SPA fallback sau
- [x] ✅ Build test: Local serve works
- [ ] ⚠️ Deploy test: Production URLs work
- [ ] ⚠️ Integration test: WebView loads correctly

## 🚀 DEPLOY & TEST

```bash
# 1. Build tất cả apps
./deploy.sh build

# 2. Test local
./test-local.sh serve

# 3. Deploy to Vercel
./deploy.sh vercel

# 4. Verify production URLs
curl -I https://your-project.vercel.app/feedback-mini-app/
```

## 📞 LỖI VẪN CÒN?

### Debug steps:

1. **Check browser console** - detailed error messages
2. **Network tab** - see failed requests
3. **Vercel function logs** - runtime errors
4. **Compare local vs production** - URL differences

### Get help:

- Vercel docs: https://vercel.com/docs/concepts/projects/project-configuration
- Vite base config: https://vitejs.dev/config/shared-options.html#base
- React Router: https://reactrouter.com/en/main/router-components/browser-router

---

**🎯 Kết quả**: Sau khi áp dụng các fix trên, ứng dụng sẽ load đúng tất cả assets và routes!
