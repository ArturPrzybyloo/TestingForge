# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and yarn.lock (or package-lock.json)
COPY package*.json ./
# If you use yarn, copy yarn.lock and use yarn install
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# If you use yarn: RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build
# If you use yarn: RUN yarn build

# Stage 2: Serve the static files using Nginx
FROM nginx:1.25-alpine

# Copy the build output from the builder stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copy nginx configuration (if you have a custom one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf 
# For now, using default Nginx configuration for serving static files

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
 