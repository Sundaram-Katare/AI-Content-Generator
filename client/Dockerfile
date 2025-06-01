# client/Dockerfile

# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose Vite's dev server port
EXPOSE 5173

CMD ["npm", "run", "dev"]
