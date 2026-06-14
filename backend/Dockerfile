FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy application source code
COPY src/ ./src/

# Expose the backend port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
