FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine as runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN yarn global add pm2
RUN mkdir -p /app/logs && chown node:node /app/logs
USER node
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]