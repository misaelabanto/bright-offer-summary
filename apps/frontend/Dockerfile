FROM node:20-slim AS base

FROM base AS builder

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune frontend --docker

FROM base AS installer
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm install -g pnpm@9.9.0
RUN npm install -g turbo
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=frontend

FROM nginx:latest AS runner
WORKDIR /app

COPY --from=installer /app/apps/frontend/_infrastructure/nginx.conf /etc/nginx/nginx.conf
COPY --from=installer /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

