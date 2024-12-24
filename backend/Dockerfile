# Use an official Node.js image as a base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json  ./
RUN npm install

# Run build
COPY . .
RUN npm run build

# Expose the port the backend will run on (default 5000)
EXPOSE 5000

# Start backend
CMD ["npm", "run", "start"]
