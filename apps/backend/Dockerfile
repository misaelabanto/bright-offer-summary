FROM node:20-slim AS base

FROM base AS builder

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
RUN npm install -g pnpm@9.9.0
RUN npm install -g turbo
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=backend

FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

CMD node apps/backend/dist/migrate.js && node apps/backend/dist/main.js
