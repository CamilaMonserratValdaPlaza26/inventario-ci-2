# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia primero los manifiestos para aprovechar la cache de Docker
COPY package*.json ./
RUN npm ci --omit=dev

# Copia el codigo fuente
COPY . .

# Etapa 2: runtime
FROM node:20-alpine
WORKDIR /app

# Copia solo lo necesario desde la etapa de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
