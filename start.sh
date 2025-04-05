#!/usr/bin/env bash
# exit on error
set -o errexit

# Ensure the database schema is up to date
npx prisma db push --accept-data-loss

# Start the Next.js application
npm start 