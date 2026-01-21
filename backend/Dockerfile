# --- BUILD STAGE ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=development

COPY .. .
RUN npm run build

# --- PRODUCTION STAGE ---
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY .. .

EXPOSE 3000

CMD ["node", "dist/main.js"]
