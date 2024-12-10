# Base image for Node.js
FROM node:18

# Set the working directory in the container for the backend
WORKDIR /app/backend

# Copy the package.json and package-lock.json files into the container
COPY backend/package*.json ./

# Install build tools for native modules like bcrypt
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code into the container
COPY backend ./

# Expose the backend port
EXPOSE 50001

# Command to run the backend server
CMD ["npm", "start"]


# # Base image for Node.js
# FROM node:18

# # Set the working directory for the frontend
# WORKDIR /app/frontend

# # Copy the package.json and package-lock.json files for the frontend
# COPY frontend/package*.json ./

# # Install build tools for React and native modules
# RUN apt-get update && apt-get install -y \
#     python3 \
#     make \
#     g++ \
#     && rm -rf /var/lib/apt/lists/*

# # Install frontend dependencies
# RUN npm install

# # Copy the rest of the frontend code into the container
# COPY frontend ./

# # Build the React app
# RUN npm run build

# # Install a static file server to serve the React build
# RUN npm install -g serve

# # Expose the frontend port
# EXPOSE 3000

# # Command to serve the React app
# CMD ["serve", "-s", "build", "-l", "3000"]
