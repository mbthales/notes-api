FROM oven/bun:1-slim

WORKDIR /app

COPY bun.lockb .
COPY package.json .

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "dev"]