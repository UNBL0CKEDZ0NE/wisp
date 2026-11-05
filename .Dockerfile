FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --omit=dev
COPY server.js ./
ENV HOST=0.0.0.0
EXPOSE 5001
CMD ["node", "server.js"]
