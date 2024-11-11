# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate

FROM nginx:alpine
# Copy static files
COPY --from=builder /app/.output/public /usr/share/nginx/html
# Set correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf