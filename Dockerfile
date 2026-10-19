# Stage 1: build the frontend
FROM node:20-slim AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: backend + serve built frontend
FROM node:20-slim
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
COPY --from=frontend-build /frontend/build ./public

EXPOSE 3000
CMD ["node", "server.js"]