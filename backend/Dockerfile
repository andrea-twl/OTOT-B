FROM node:alpine
WORKDIR /usr/app/src
COPY package*.json ./
RUN npm install --production
COPY src .
CMD ["node", "index.js"]

# FROM node:alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# # Run npm install in our local machine
# RUN npm install

# # Bundle app source
# COPY . .

# EXPOSE 8004

# CMD [ "node", "index.js" ]
