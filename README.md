# Calculator App

A simple calculator application built with Node.js backend and React.js frontend, running in Docker containers.

## 🐳 Docker-Based Application

This application is **completely containerized** using Docker, which means:

- ✅ **No local dependencies required** - No need to install Node.js, npm, or any other tools
- ✅ **Consistent environment** - Works the same on any machine with Docker
- ✅ **Isolated containers** - Backend and frontend run in separate, secure containers
- ✅ **Easy deployment** - One command starts the entire application
- ✅ **Production-ready** - Uses multi-stage builds and Nginx for optimal performance

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Modern, responsive UI with gradient design
- RESTful API backend with error handling
- Docker containerization for both frontend and backend
- Docker Compose orchestration for easy management
- Nginx reverse proxy for production-ready frontend serving

## Project Structure

```
calculator-app/
├── backend/           # Node.js Express API
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   └── Dockerfile     # Backend container config
├── frontend/          # React.js application
│   ├── src/           # React source code
│   ├── public/        # Static files
│   ├── package.json   # Frontend dependencies
│   ├── Dockerfile     # Frontend container config
│   └── nginx.conf     # Nginx configuration
├── docker-compose.yml # Container orchestration
└── README.md          # This file
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker Desktop installed and running
- Git (for cloning the repository)

### Using Docker Compose (Recommended)

**This is the easiest way to run the entire application:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Afsheen-se/Docker-Compose-CT.git
   cd Docker-Compose-CT/calculator-app
   ```

2. **Start the entire application with one command:**
   ```bash
   docker-compose up --build
   ```
   
   **What this command does:**
   - Builds both backend and frontend Docker images
   - Creates a Docker network for container communication
   - Starts the backend container (Node.js API)
   - Starts the frontend container (React app with Nginx)
   - Handles all networking and dependencies automatically

3. **Access the application:**
   - **Frontend**: http://localhost:3000 (Beautiful calculator interface)
   - **Backend API**: http://localhost:5000/api/health (API health check)

### 🎯 What Happens When You Run Docker Compose

1. **Backend Container**:
   - Builds Node.js application
   - Installs dependencies (Express, CORS)
   - Starts Express server on port 5000
   - Handles calculation requests

2. **Frontend Container**:
   - Builds React application
   - Creates production build
   - Serves static files with Nginx
   - Proxies API requests to backend

3. **Docker Network**:
   - Creates isolated network for containers
   - Allows frontend to communicate with backend
   - No external dependencies required

### Using Individual Docker Commands

**Alternative method for advanced users who want more control:**

#### Backend Container
```bash
# Build backend image
docker build -t calculator-backend ./backend

# Run backend container
docker run -d -p 5000:5000 --name calculator-backend calculator-backend
```

#### Frontend Container
```bash
# Build frontend image
docker build -t calculator-frontend ./frontend

# Run frontend container
docker run -d -p 3000:80 --name calculator-frontend calculator-frontend
```

**Note**: Individual commands require manual networking setup and are more complex than Docker Compose.

## API Endpoints

- `POST /api/calculate` - Perform calculations
- `GET /api/health` - Health check

### Calculate Request Format
```json
{
  "operation": "add|subtract|multiply|divide",
  "num1": 10,
  "num2": 5
}
```

### Calculate Response Format
```json
{
  "result": 15
}
```

## 🐳 Docker Architecture Explained

### Backend Dockerfile
```dockerfile
FROM node:18-alpine          # Use lightweight Node.js image
WORKDIR /app                 # Set working directory
COPY package*.json ./        # Copy dependency files
RUN npm install             # Install dependencies
COPY . .                    # Copy source code
EXPOSE 5000                 # Expose port 5000
CMD ["npm", "start"]        # Start the application
```

### Frontend Dockerfile (Multi-stage Build)
```dockerfile
# Stage 1: Build React app
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build           # Create production build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose Configuration
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    container_name: calculator-backend
    ports:
      - "5000:5000"
    networks:
      - calculator-network

  frontend:
    build: ./frontend
    container_name: calculator-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - calculator-network

networks:
  calculator-network:
    driver: bridge
```

## 🛠️ Development

### Local Development (Without Docker)
```bash
# Backend Development
cd backend
npm install
npm run dev

# Frontend Development
cd frontend
npm install
npm start
```

### Docker Development
```bash
# Rebuild and restart with changes
docker-compose up --build

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend
```

## 🛑 Stopping the Application

```bash
# Stop all containers
docker-compose down

# Stop and remove containers with volumes
docker-compose down -v

# Remove all images (cleanup)
docker-compose down --rmi all
```

## 🔧 Troubleshooting

1. **Port conflicts**: Make sure ports 3000 and 5000 are available
2. **Container issues**: Check logs with `docker-compose logs [service-name]`
3. **Build issues**: Try `docker-compose up --build --force-recreate`
4. **Network issues**: Use `docker-compose down` then `docker-compose up --build`
5. **Permission issues**: Run Docker Desktop as administrator

## 📊 Docker Commands Reference

```bash
# Check running containers
docker ps

# Check all containers (including stopped)
docker ps -a

# View container logs
docker logs calculator-backend
docker logs calculator-frontend

# Execute commands inside container
docker exec -it calculator-backend sh
docker exec -it calculator-frontend sh

# Remove all containers
docker rm -f $(docker ps -aq)

# Remove all images
docker rmi -f $(docker images -q)
```
