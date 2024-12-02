#!/bin/bash

git pull origin main
npm install


if [ -f .env ]; then
  echo ".env file already exists. Setup aborted."
  exit 1
fi

# Prompt user for PORT number
read -p "Enter the PORT number: " PORT

# Prompt user for MongoDB connection string
read -p "Enter the MongoDB connection string: " MONGO_URI

# Prompt user for database name
read -p "Enter the database name: " DB_NAME

# Prompt user for JWT secret key
read -p "Enter the JWT secret key: " JWT_SECRET

# Write the values to the .env file
echo "PORT=$PORT
MONGO_URI=$MONGO_URI
DB_NAME=$DB_NAME
JWT_SECRET=$JWT_SECRET" > .env



yarn start-dev