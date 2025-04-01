FROM node:19-alpine AS base
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=base /usr/src/app/public ./public
COPY --from=base /usr/src/app/.next/standalone ./
COPY --from=base /usr/src/app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
