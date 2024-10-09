# Development Stage
FROM node:18-alpine AS dev

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install


# Copy the rest of the application code
COPY . .

RUN npm run generate

# Expose ports for development
EXPOSE 3000

# Start the application in development mode with nodemon
CMD ["nodemon", "src/index.ts"]

# Production Stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller image for the production runtime
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the port your app will run on
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]  # Adjust if your entry point is different
