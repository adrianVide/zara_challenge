# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
RUN npm install -g npm@9.9.4

WORKDIR /app
COPY package.json package-lock.json ./

# Instalación con cache persistente
RUN --mount=type=cache,target=/root/.npm \
    npm ci

############################
# Stage 2: Test
############################
FROM node:20-alpine AS test

RUN apk add --no-cache libc6-compat
RUN npm install -g npm@9.9.4

WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NODE_ENV=test para que React.act funcione
ENV NODE_ENV=test
RUN npm test

############################
# Stage 3: Builder
############################
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN npm install -g npm@9.9.4

WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build de producción
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

############################
# Stage 4: Runner
############################
FROM node:20-alpine AS runner

WORKDIR /app

ARG API_BASE_URL
ARG API_KEY
ENV API_BASE_URL=$API_BASE_URL
ENV API_KEY=$API_KEY
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3060
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3060
CMD ["node", "server.js"]
