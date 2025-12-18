#!/bin/bash
set -e

echo "🔨 Building Docker image..."
docker build -t zara-challenge-test . 2>&1 | tee /tmp/docker-build.log

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 Image size:"
    docker images zara-challenge-test --format "{{.Repository}}:{{.Tag}} - {{.Size}}"
else
    echo "❌ Build failed!"
    echo "Last 50 lines of build log:"
    tail -50 /tmp/docker-build.log
    exit 1
fi
