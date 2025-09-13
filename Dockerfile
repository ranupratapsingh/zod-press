FROM oven/bun:1.2.20

ARG APP_DIR=/opt/zod_press
WORKDIR $APP_DIR

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY . .

RUN adduser --uid 10001 --disabled-password zod_press
RUN chown -R zod_press:zod_press .

USER zod_press

EXPOSE 3000/tcp
CMD ["bun", "run", "start"]
