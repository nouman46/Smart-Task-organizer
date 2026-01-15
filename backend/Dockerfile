# backend/Dockerfile

# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Your app binds to port 5000, so expose it
EXPOSE 5000

# Command to run the application
# Use "node" for production, not "nodemon"
CMD [ "node", "server.js" ]