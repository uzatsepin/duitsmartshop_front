# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Copy public directory explicitly
COPY ./public ./public
RUN npm run generate

FROM nginx:alpine
COPY --from=builder /app/.output/public /usr/share/nginx/html
# Ensure static files are copied
COPY --from=builder /app/public /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html