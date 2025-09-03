#!/bin/bash
# ----------------------------
# Setup frontend from GitHub repo
# ----------------------------

# Variables
FRONTEND_DIR="apps/web"
GIT_REPO="https://github.com/shaikh24/WorkChain-Mian.git"
BRANCH="main"

echo "➡️  Setting up frontend in $FRONTEND_DIR ..."

# Create apps/web if not exists
mkdir -p $FRONTEND_DIR

# Pull latest frontend from repo
echo "➡️  Cloning frontend files..."
git clone --depth 1 --branch $BRANCH $GIT_REPO temp-frontend

# Move frontend files
echo "➡️  Moving frontend files..."
rsync -av --progress temp-frontend/apps/web/ $FRONTEND_DIR/

# Clean up temp folder
rm -rf temp-frontend

# Install dependencies
echo "➡️  Installing frontend dependencies..."
cd $FRONTEND_DIR
pnpm install

# Build frontend
echo "➡️  Building frontend..."
pnpm run build

echo "✅ Frontend setup complete!"
