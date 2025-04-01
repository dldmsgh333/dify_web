FROM --platform=linux/amd64 node:20-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node",".next/standalone/server.js"]
