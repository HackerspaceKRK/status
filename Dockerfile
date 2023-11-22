FROM node:current-alpine as builder

# install and cache app dependencies
WORKDIR /app/
COPY . /app/
RUN node --version
RUN npm install
RUN npm run build
# Remove build artifacts not needed on prod
RUN RM /app/.next/cache

# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM node:current-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public


RUN npm install --production

USER node
EXPOSE 3000
CMD [ "npm", "start" ]
