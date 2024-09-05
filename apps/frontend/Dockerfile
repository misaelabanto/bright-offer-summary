FROM node:20-slim AS base

FROM base AS builder
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN npm install -g pnpm@9.9.0
RUN npm install -g turbo
WORKDIR /app

ENV VITE_BACKEND_URL=${BACKEND_URL}

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=frontend

FROM nginx:latest AS runner
WORKDIR /app

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

