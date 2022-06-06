FROM node:latest
ENV NODE_ENV=production

WORKDIR /app 
COPY ["package.json", "package-lock.json", "./"]
COPY ["apps/frontend/project.json", "apps/frontend/"]

RUN npm install --production --silent
COPY . . 

RUN npm install -g nx

RUN nx build frontend --prod
 
EXPOSE 4200
CMD nx serve frontend --prod


# ====
# Dockerfile based on the official example: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# ====

# FROM node:latest AS deps
# # # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# # RUN apk add --no-cache libc6-compat python3 make g++
# WORKDIR /app
# COPY ["package.json", "package-lock.json", "./apps/frontend/project.json", "./"]
# RUN npm install --production

# # Rebuild the source code only when needed
# FROM node:latest AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Install nx
# RUN npm install -g nx

# # Build the application
# RUN nx build frontend --prod
# COPY ["./apps/frontend/dist", "./"]

# # Production image, copy all the files and run next
# FROM node:16-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# # `/app/.next/standalone` will exist iff `nextConfig.experimental.outputStandalone === true`
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/apps/frontend ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# EXPOSE 3000
# ENV PORT 3000

# CMD ["node", "server.js"]