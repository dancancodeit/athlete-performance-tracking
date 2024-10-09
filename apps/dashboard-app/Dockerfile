# Base image
FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Development Stage
FROM base as dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Build Stage
FROM base as build
COPY . .
RUN npm run build

# Production stage is handled by nginx
