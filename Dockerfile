FROM node:19-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM --platform=linux/amd64 node:20-bullseye-slim
# 음.. 제발
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
