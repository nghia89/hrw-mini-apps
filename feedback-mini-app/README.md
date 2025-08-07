# 📱 Feedback Mini App

Mini App React được tối ưu để tích hợp với Native App, sử dụng token authentication và React Router.

## 🎯 Features

- ✅ **React Router v6** với basename `/feedback-web`
- ✅ **Token Authentication** nhận từ Native App qua `window.postMessage`
- ✅ **Responsive Design** với Styled Components
- ✅ **API Integration** gửi feedback với Bearer token
- ✅ **Error Handling** thân thiện người dùng
- ✅ **Loading States** và UI feedback
- ✅ **Development Mode** simulation

## 📁 Cấu trúc dự án

```
feedback-mini-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Layout chung
│   │   └── FeedbackForm.jsx    # Form góp ý
│   ├── context/
│   │   └── TokenContext.jsx    # Quản lý token
│   ├── pages/
│   │   ├── HomePage.jsx        # Trang chủ
│   │   ├── FeedbackPage.jsx    # Trang feedback
│   │   └── ThankYouPage.jsx    # Trang cảm ơn
│   ├── App.jsx                 # Router setup
│   └── main.jsx               # Entry point
├── vite.config.js             # Vite config
└── package.json
```

## 🚀 Cách chạy

### 1. Cài đặt dependencies

```bash
cd feedback-mini-app
npm install
```

### 2. Development

```bash
npm run dev
```

→ Mở http://localhost:3000/feedback-web/

### 3. Build production

```bash
npm run build
```

→ Files sẽ được tạo trong thư mục `dist/`

### 4. Preview build

```bash
npm run preview
```

## 🔧 Cấu hình

### Vite Config (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  base: "/feedback-web/", // Basename cho deployment
  build: {
    outDir: "dist",
    // ... other build options
  },
});
```

### Router Setup (`App.jsx`)

```javascript
<BrowserRouter basename="/feedback-web">
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/feedback" element={<FeedbackPage />} />
    <Route path="/thank-you" element={<ThankYouPage />} />
  </Routes>
</BrowserRouter>
```

## 🔐 Token Authentication

### 1. Native App gửi token

```javascript
// Trong Native App (WebView)
webview.postMessage(
  {
    type: "AUTH_TOKEN",
    token: "your_jwt_token_here",
  },
  "*"
);
```

### 2. Mini App nhận token

```javascript
// TokenContext.jsx tự động lắng nghe
window.addEventListener("message", (event) => {
  if (event.data.type === "AUTH_TOKEN") {
    setToken(event.data.token);
  }
});
```

### 3. Sử dụng token trong API call

```javascript
// FeedbackForm.jsx
const response = await fetch("https://api.example.com/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ content }),
});
```

## 📱 Routes

| Route        | Component    | Mô tả                           |
| ------------ | ------------ | ------------------------------- |
| `/`          | HomePage     | Trang chủ với thông tin app     |
| `/feedback`  | FeedbackPage | Form nhập góp ý                 |
| `/thank-you` | ThankYouPage | Hiển thị sau khi gửi thành công |

## 🎨 Styling

Sử dụng **Styled Components** với:

- Gradient backgrounds
- Glass morphism effects
- Responsive breakpoints
- Hover animations
- Loading states

## 🔄 Development Mode

Khi chạy development (không có Native App):

- Token sẽ được simulate sau 2 giây
- Token giả: `dev_token_123456789`
- Console sẽ log các message events

## 📦 Deployment

### 1. Build

```bash
npm run build
```

### 2. Deploy files trong `dist/` lên:

- **Web Server**: Copy vào `/var/www/html/feedback-web/`
- **S3**: Upload với prefix `feedback-web/`
- **CDN**: Deploy với path `/feedback-web/`
- **Nginx**: Serve với location `/feedback-web`

### 3. Cấu hình server fallback

```nginx
# Nginx example
location /feedback-web/ {
    try_files $uri $uri/ /feedback-web/index.html;
}
```

## 🔌 API Endpoint

### POST `/feedback`

```json
{
  "content": "Nội dung góp ý"
}
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {token}
```

**Response Success (200):**

```json
{
  "id": "feedback_123",
  "status": "success",
  "message": "Feedback received"
}
```

## 🐛 Error Handling

- **Không có token**: Hiển thị warning
- **Network error**: "Không thể kết nối đến server"
- **401 Unauthorized**: "Token không hợp lệ"
- **403 Forbidden**: "Không có quyền thực hiện"
- **Generic error**: "Có lỗi xảy ra"

## 📱 Mobile Responsive

Breakpoints:

- Desktop: > 768px
- Mobile: ≤ 768px

Features:

- Touch-friendly buttons
- Readable font sizes
- Proper spacing
- Collapsible navigation

## 🔍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Development Notes

1. **Token Security**: Trong production, validate `event.origin`
2. **API Timeout**: Thêm timeout cho fetch requests
3. **Error Logging**: Integrate với error tracking service
4. **Analytics**: Thêm tracking cho user interactions
5. **Offline**: Xem xét thêm offline support

## 🤝 Integration với Native App

### Android (WebView)

```java
webView.evaluateJavascript(
    "window.postMessage({type:'AUTH_TOKEN', token:'" + token + "'}, '*');",
    null
);
```

### iOS (WKWebView)

```swift
let script = "window.postMessage({type:'AUTH_TOKEN', token:'\(token)'}, '*');"
webView.evaluateJavaScript(script, completionHandler: nil)
```

### React Native (WebView)

```javascript
const injectedJavaScript = `
  window.postMessage({type:'AUTH_TOKEN', token:'${token}'}, '*');
  true;
`;

<WebView
  source={{ uri: "https://your-domain.com/feedback-web/" }}
  injectedJavaScript={injectedJavaScript}
/>;
```

---

**🎉 Mini App sẵn sàng để tích hợp!**
