# Base image: Node.js Alpine for smaller image size
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Transpile TypeScript to JavaScript
RUN npm install --only=development # Install devDependencies for tsc
RUN npm run build
RUN npm prune --production # Remove devDependencies after build

# --- Production Stage ---
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expose port
EXPOSE ${PORT:-5001}

# Command to run the application
CMD ["node", "dist/server.js"] 