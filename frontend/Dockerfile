# Use an official Node.js image as a base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy over project
COPY . .
# build package
RUN npm run build

# Expose the port Vite dev server will use (default 3000)
EXPOSE 3000

# Start Vite development server
CMD ["npm", "run", "preview"]
