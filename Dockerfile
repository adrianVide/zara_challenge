# syntax=docker/dockerfile:1

############################
# Stage 1: Dependencies
############################
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
RUN npm install -g npm@9.9.4

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

############################
# Stage 2: Builder
############################
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN npm install -g npm@9.9.4

WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

############################
# Stage 3: Runner
############################
FROM node:20-alpine AS runner

WORKDIR /app

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
