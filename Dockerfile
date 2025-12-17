FROM node:18-alpine

# Connect to the backend directory
WORKDIR /opt/app

# Install dependencies (from backend folder)
COPY backend/package.json backend/package-lock.json ./
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production

# Copy backend source code
COPY backend/ .

# Build and Start
ENV NODE_ENV=production
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
