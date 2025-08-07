#!/bin/bash

# 🧪 Test Local Deployment Script
# Test built apps locally to verify paths work correctly

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Test with Python HTTP server (simulates basic hosting)
test_with_python() {
    log_info "Testing with Python HTTP server..."
    
    # Create a temporary directory structure
    rm -rf test-deploy
    mkdir -p test-deploy
    
    # Copy built files
    if [ -d "feedback-mini-app/dist" ]; then
        cp -r feedback-mini-app/dist test-deploy/feedback-mini-app
        log_success "Copied feedback-mini-app"
    else
        log_error "feedback-mini-app/dist not found. Run build first."
        exit 1
    fi
    
    if [ -d "home-page-mini-app/dist" ]; then
        cp -r home-page-mini-app/dist test-deploy/home-page-mini-app
        log_success "Copied home-page-mini-app"
    fi
    
    cd test-deploy
    
    log_info "Starting Python HTTP server on port 8080..."
    log_info "Test URLs:"
    log_info "  - Feedback: http://localhost:8080/feedback-mini-app/"
    log_info "  - Home: http://localhost:8080/home-page-mini-app/" 
    log_warning "Press Ctrl+C to stop the server"
    
    # Start Python server
    if command -v python3 &> /dev/null; then
        python3 -m http.server 8080
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer 8080
    else
        log_error "Python not found. Cannot start test server."
        cd ..
        rm -rf test-deploy
        exit 1
    fi
}

# Test with Node.js serve package
test_with_serve() {
    log_info "Testing with Node.js serve package..."
    
    if ! command -v npx &> /dev/null; then
        log_error "npx not found. Install Node.js first."
        exit 1
    fi
    
    # Create a temporary directory structure
    rm -rf test-deploy
    mkdir -p test-deploy
    
    # Copy built files
    if [ -d "feedback-mini-app/dist" ]; then
        cp -r feedback-mini-app/dist test-deploy/feedback-mini-app
        log_success "Copied feedback-mini-app"
    else
        log_error "feedback-mini-app/dist not found. Run build first."
        exit 1
    fi
    
    if [ -d "home-page-mini-app/dist" ]; then
        cp -r home-page-mini-app/dist test-deploy/home-page-mini-app
        log_success "Copied home-page-mini-app"
    fi
    
    cd test-deploy
    
    log_info "Starting serve on port 8080..."
    log_info "Test URLs:"
    log_info "  - Feedback: http://localhost:8080/feedback-mini-app/"
    log_info "  - Home: http://localhost:8080/home-page-mini-app/"
    log_warning "Press Ctrl+C to stop the server"
    
    npx serve -p 8080
}

# Cleanup
cleanup() {
    log_info "Cleaning up test files..."
    rm -rf test-deploy
    log_success "Cleanup completed"
}

# Show help
show_help() {
    echo "🧪 Test Local Deployment"
    echo ""
    echo "Usage: $0 [METHOD]"
    echo ""
    echo "Methods:"
    echo "  python     Test with Python HTTP server"
    echo "  serve      Test with Node.js serve package (recommended)"
    echo "  cleanup    Clean up test files"
    echo "  help       Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 serve       # Test with serve (better SPA support)"
    echo "  $0 python     # Test with Python HTTP server"
    echo "  $0 cleanup    # Remove test files"
}

# Main function
main() {
    case "${1:-serve}" in
        "python")
            test_with_python
            ;;
        "serve")
            test_with_serve
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Cleanup on exit
trap cleanup EXIT

# Run main function
main "$@"
