# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY feedback-mini-app/package*.json ./feedback-mini-app/
COPY home-page-mini-app/package*.json ./home-page-mini-app/

# Install dependencies
RUN npm install
RUN cd feedback-mini-app && npm install
RUN cd home-page-mini-app && npm install

# Copy source code
COPY feedback-mini-app/ ./feedback-mini-app/
COPY home-page-mini-app/ ./home-page-mini-app/

# Build applications
RUN cd feedback-mini-app && npm run build
RUN cd home-page-mini-app && npm run build

# Production stage
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/

# Copy built applications
COPY --from=builder /app/feedback-mini-app/dist /usr/share/nginx/html/feedback-mini-app
COPY --from=builder /app/home-page-mini-app/dist /usr/share/nginx/html/home-page-mini-app

# Create nginx user and set permissions
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
