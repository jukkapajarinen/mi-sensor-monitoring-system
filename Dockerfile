FROM node:18.14.1

# Install SQLite
RUN apt-get update && apt-get install -y sqlite3

# Create the application directory and set permissions
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create SQLite database file
RUN touch /home/node/app/database.sqlite && \
    chown node:node /home/node/app/database.sqlite && \
    chmod 666 /home/node/app/database.sqlite

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Switch to the non-root user
USER node

# Install npm dependencies
RUN npm install

# Copy the application code
COPY --chown=node:node . .

# Expose the port
EXPOSE 8080
