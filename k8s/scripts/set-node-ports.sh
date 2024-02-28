#!/bin/bash

# Define the NodePort range
start_port=30000
end_port=32767

# Define your array of service names
service_names=("POSTGRES") # Example service names

# Array to keep track of allocated ports
allocated_ports=()

# Function to check if a port is already allocated
is_port_allocated() {
    local port=$1
    for allocated_port in "${allocated_ports[@]}"; do
        if [ "$allocated_port" -eq "$port" ]; then
            return 0 # Port is allocated
        fi
    done
    return 1 # Port is not allocated
}

# Function to find the next free port
find_free_port() {
    for ((port=start_port; port<=end_port; port++)); do
        # Check if port is not in use by Kubernetes and not already allocated
        if ! kubectl get services --all-namespaces --output=jsonpath="{.items[*].spec.ports[*].nodePort}" | grep -wq $port && ! is_port_allocated $port; then
            echo $port
            return
        fi
    done
    echo "No free port found in the range $start_port-$end_port."
    exit 1
}

# Iterate over service names to find and assign a free port
for service_name in "${service_names[@]}"; do
    free_port=$(find_free_port)
    allocated_ports+=($free_port) # Add the allocated port to the list
    # Set an environment variable with the format SERVICENAME_NODEPORT=X
    export "${service_name^^}_NODEPORT=$free_port" # ^^ converts service name to uppercase
    echo "Exported ${service_name^^}_NODEPORT=$free_port"
done

echo "Node ports have been set for the following services:"
echo $POSTGRES_NODEPORT