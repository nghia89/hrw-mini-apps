#!/bin/bash

# 🚀 HRW Mini Apps Build & Deploy Script
# Usage: ./deploy.sh [vercel|docker|both]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check dependencies
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    log_success "Dependencies check passed"
}

# Install all dependencies
install_deps() {
    log_info "Installing dependencies..."
    
    # Root dependencies
    log_info "Installing root dependencies..."
    npm install
    
    # Feedback app dependencies
    log_info "Installing feedback-mini-app dependencies..."
    cd feedback-mini-app && npm install && cd ..
    
    # Home app dependencies  
    if [ -d "home-page-mini-app" ]; then
        log_info "Installing home-page-mini-app dependencies..."
        cd home-page-mini-app && npm install && cd ..
    fi
    
    log_success "All dependencies installed"
}

# Build all applications
build_apps() {
    log_info "Building applications..."
    
    # Build feedback app
    log_info "Building feedback-mini-app..."
    cd feedback-mini-app
    npm run build
    cd ..
    
    # Build home app if exists
    if [ -d "home-page-mini-app" ]; then
        log_info "Building home-page-mini-app..."
        cd home-page-mini-app
        npm run build
        cd ..
    fi
    
    log_success "All applications built successfully"
}

# Deploy to Vercel
deploy_vercel() {
    log_info "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Build first
    build_apps
    
    # Deploy
    vercel --prod
    
    log_success "Deployed to Vercel successfully"
    log_info "URLs:"
    log_info "  - Feedback: https://your-project.vercel.app/feedback-mini-app/"
    log_info "  - Home: https://your-project.vercel.app/home-page-mini-app/"
}

# Deploy to Docker
deploy_docker() {
    log_info "Building Docker image..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    # Build Docker image
    docker-compose build
    
    # Stop existing containers
    docker-compose down
    
    # Start new containers
    docker-compose up -d
    
    log_success "Docker deployment completed"
    log_info "URLs:"
    log_info "  - Feedback: http://localhost/feedback-mini-app/"
    log_info "  - Home: http://localhost/home-page-mini-app/"
    log_info "  - Health: http://localhost/health"
}

# Test build locally
test_build() {
    log_info "Testing build locally..."
    
    build_apps
    
    # Check if dist folders exist
    if [ ! -d "feedback-mini-app/dist" ]; then
        log_error "feedback-mini-app build failed"
        exit 1
    fi
    
    if [ -d "home-page-mini-app" ] && [ ! -d "home-page-mini-app/dist" ]; then
        log_error "home-page-mini-app build failed"
        exit 1
    fi
    
    log_success "Build test passed"
}

# Clean build artifacts
clean() {
    log_info "Cleaning build artifacts..."
    
    rm -rf feedback-mini-app/dist
    rm -rf feedback-mini-app/node_modules
    
    if [ -d "home-page-mini-app" ]; then
        rm -rf home-page-mini-app/dist
        rm -rf home-page-mini-app/node_modules
    fi
    
    rm -rf node_modules
    
    log_success "Cleanup completed"
}

# Show help
show_help() {
    echo "🚀 HRW Mini Apps Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  vercel     Deploy to Vercel"
    echo "  docker     Deploy to Docker"
    echo "  both       Deploy to both Vercel and Docker"
    echo "  build      Build all applications"
    echo "  test       Test build locally"
    echo "  install    Install all dependencies"
    echo "  clean      Clean build artifacts"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 vercel          # Deploy to Vercel only"
    echo "  $0 docker          # Deploy to Docker only" 
    echo "  $0 both            # Deploy to both platforms"
    echo "  $0 build           # Build applications only"
}

# Main script
main() {
    log_info "🚀 HRW Mini Apps Deployment Script"
    
    case "${1:-help}" in
        "vercel")
            check_dependencies
            deploy_vercel
            ;;
        "docker")
            check_dependencies
            deploy_docker
            ;;
        "both")
            check_dependencies
            deploy_vercel
            deploy_docker
            ;;
        "build")
            check_dependencies
            install_deps
            build_apps
            ;;
        "test")
            check_dependencies
            install_deps
            test_build
            ;;
        "install")
            check_dependencies
            install_deps
            ;;
        "clean")
            clean
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function
main "$@"
