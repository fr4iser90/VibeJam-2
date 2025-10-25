# Multi-stage build für optimale Performance
FROM node:18-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package files kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm ci --only=production

# Alle Projektdateien kopieren
COPY . .

# Production build (für statische Dateien nur kopieren)
RUN npm run build || echo "No build step needed"

# Production stage mit nginx
FROM nginx:alpine

# Nginx Konfiguration kopieren
COPY nginx.conf /etc/nginx/nginx.conf

# Statische Dateien aus builder stage kopieren
COPY --from=builder /app /usr/share/nginx/html

# Port freigeben
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]
