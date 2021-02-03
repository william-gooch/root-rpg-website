FROM alpine:latest

# Install node.js
RUN apk add --no-cache nodejs yarn git

# Copy code to app path
COPY . /app

# Set working directory to /app
WORKDIR /app

# Install packages
RUN yarn
# Build React app
RUN yarn build
# Expose port 5000 to HTTP
EXPOSE 5000

# Serve website
CMD ["yarn", "serve"]
