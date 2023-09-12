# Use an official Node.js runtime as the base image
FROM node:16 as build-stage

# Set the working directory in the container
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node.js runtime for serving the application
FROM node:14-slim as production-stage

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build-stage /app/build ./build

# Install a simple HTTP server for serving the application
RUN npm install -g serve

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to start the application
CMD ["serve", "-s", "build", "-l", "3000"]

# Optionally, set environment variables if needed
# ENV REACT_APP_API_URL="http://your-api-server:4000"

# You can set other environment variables as required
# ENV REACT_APP_ANOTHER_VARIABLE="value"

# Define any other configuration or setup steps as needed
