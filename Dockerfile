# Use the official Node.js image as the base image
FROM node:alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to install dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the port that your application will run on
EXPOSE 3000

# Specify the command to run your application
CMD ["yarn", "start"]
