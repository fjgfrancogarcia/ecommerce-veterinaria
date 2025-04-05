#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Use db push instead of migrate deploy - this works better with existing databases
npx prisma db push --accept-data-loss

# Build the Next.js application
npm run build 