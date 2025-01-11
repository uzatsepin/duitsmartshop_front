# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Ensure public directory is copied before generate
COPY ./public /app/public/
COPY public/icons /usr/share/nginx/html/icons
RUN npm run generate

FROM nginx:alpine
# Copy all generated files
COPY --from=builder /app/.output/public /usr/share/nginx/html
# Copy public assets
COPY --from=builder /app/public /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html