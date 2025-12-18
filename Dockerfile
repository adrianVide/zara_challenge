# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Cache bust and install ALL dependencies (production + development)
# This ARG invalidates the cache to ensure fresh install
ARG CACHEBUST=1
RUN echo "Cache bust: ${CACHEBUST}" && \
    npm ci --legacy-peer-deps && \
    echo "Installed packages:" && \
    ls -la node_modules/.bin/ | head -20

# Verify critical dev dependencies are present
RUN if [ ! -f node_modules/.bin/prettier ] || [ ! -f node_modules/.bin/eslint ]; then \
      echo "❌ ERROR: Dev dependencies not found!"; \
      echo "Contents of node_modules/.bin/:"; \
      ls -la node_modules/.bin/ || echo "Directory does not exist"; \
      exit 1; \
    else \
      echo "✅ Dev dependencies installed successfully"; \
    fi

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files (needed for npm scripts)
COPY package.json package-lock.json ./

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1

# Run quality checks before building
RUN echo "Running code quality checks..." && \
    npm run format:check && \
    npm run lint && \
    npm run type-check

# Set production environment for build
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3060
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3060

CMD ["node", "server.js"]
