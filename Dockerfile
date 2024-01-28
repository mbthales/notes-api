FROM node:20.11.0-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml .
COPY package.json .

RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "dev"]