#!/bin/bash
# ----------------------------
# Full Project Setup: Backend + Frontend
# ----------------------------

# --- Variables ---
ROOT_DIR=$(pwd)
GIT_REPO="https://github.com/shaikh24/WorkChain-Mian.git"
BRANCH="main"

# --- Backend Setup ---
echo "➡️  Setting up backend..."
BACKEND_DIR="apps/api"
mkdir -p $BACKEND_DIR

echo "➡️  Cloning backend..."
git clone --depth 1 --branch $BRANCH $GIT_REPO temp-backend
rsync -av --progress temp-backend/apps/api/ $BACKEND_DIR/
rm -rf temp-backend

echo "➡️  Installing backend dependencies..."
cd $BACKEND_DIR
pnpm install

echo "➡️  Building backend..."
pnpm run build

# --- Frontend Setup ---
echo "➡️  Setting up frontend..."
FRONTEND_DIR="apps/web"
mkdir -p $FRONTEND_DIR

echo "➡️  Cloning frontend..."
git clone --depth 1 --branch $BRANCH $GIT_REPO temp-frontend
rsync -av --progress temp-frontend/apps/web/ $FRONTEND_DIR/
rm -rf temp-frontend

echo "➡️  Installing frontend dependencies..."
cd $FRONTEND_DIR
pnpm install

echo "➡️  Building frontend..."
pnpm run build

echo "✅ Full project setup complete!"
echo "➡️  Backend ready at $BACKEND_DIR"
echo "➡️  Frontend ready at $FRONTEND_DIR"
