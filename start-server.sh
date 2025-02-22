#!/bin/bash

# Define log files
FRONTEND_LOGFILE="frontend.log"
BACKEND_LOGFILE="backend.log"
BACKEND_PORT=4000

# Function to check if the port is in use and kill the process
kill_process_on_port() {
  local PORT=$1
  local PID=$(sudo lsof -t -i:$PORT)
  if [ ! -z "$PID" ]; then
    echo "Process with PID $PID is using port $PORT. Terminating it..."
    sudo kill -9 $PID
  else
    echo "No process found using port $PORT."
  fi
}

# Kill any process using the backend port
kill_process_on_port $BACKEND_PORT

# Start the frontend server and redirect both stdout and stderr to the frontend log file
npm start > $FRONTEND_LOGFILE 2>&1 &

# Get the process ID of the frontend server command
FRONTEND_PID=$!
echo "Frontend server is running with PID: $FRONTEND_PID"

# Start the backend server and redirect both stdout and stderr to the backend log file
node server.js > $BACKEND_LOGFILE 2>&1 &

# Get the process ID of the backend server command
BACKEND_PID=$!
echo "Backend server is running with PID: $BACKEND_PID"
