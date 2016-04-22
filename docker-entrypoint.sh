#!/bin/bash
set -e

if [ -z "$MONGODB_CONNECTION" ]; then
    echo "MONGODB_CONNECTION environment variable required"
    exit 1
fi

echo "MONGODB: ${MONGODB_CONNECTION}"

# execute nodejs application
exec npm start