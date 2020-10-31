FROM node:latest

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY . .

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 8000

ENV NODE_ENV=production

# Run the specified command within the container.
CMD [ "npm", "start" ]