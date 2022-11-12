# FROM node:alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --production
# COPY . .
# CMD ["node", "index.js"]

FROM node:alpine

# Create app directory
# WORKDIR /usr/src/app
WORKDIR /

# Install app dependencies
COPY package*.json ./

# Run npm install in our local machine
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8004

CMD [ "node", "index.js" ]
