
echo "Port-forwarding into the cluster..."
export PG_POD=$(kubectl get pods -n $NAMESPACE -l app=postgres -o custom-columns=:metadata.name --no-headers) # Get the name of the postgres pod
echo "Postgres pod: $PG_POD" 

TEMP_FILE=$(mktemp)

kubectl port-forward pod/$PG_POD 0:5432 -n $NAMESPACE > $TEMP_FILE 2>&1 &

PID=$! # Save the process ID to kill the port-forwarding later
sleep 2 # Wait for the port-forwarding to start
echo $output
LOCAL_PG_PORT=$(grep -o '127.0.0.1:[0-9]*' $TEMP_FILE | tail -n 1 | awk -F ':' '{print $2}')

trap "kill $PID" EXIT # Kill the port-forwarding when the script exits


echo "Port forwarding setup on local port: $LOCAL_PG_PORT"


# Set endpoints for initialization
export VITE_SERVER_ENDPOINT="http://${NAMESPACE}.server.${DOMAIN}"
export VITE_HASURA_GQL_ENDPOINT="http://${NAMESPACE}.hasura.${DOMAIN}/v1/graphql"
export HASURA_ENDPOINT="http://${NAMESPACE}.hasura.${DOMAIN}"
export HASURA_METADATA_DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:$LOCAL_PG_PORT/${POSTGRES_DB}"
export HASURA_GRAPHQL_DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:$LOCAL_PG_PORT/${POSTGRES_DB}"
export PG_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:$LOCAL_PG_PORT/${POSTGRES_DB}"

echo "VITE_SERVER_ENDPOINT: $VITE_SERVER_ENDPOINT"
echo "VITE_HASURA_GQL_ENDPOINT: $VITE_HASURA_GQL_ENDPOINT"
echo "HASURA_ENDPOINT: $HASURA_ENDPOINT"
echo "HASURA_METADATA_DATABASE_URL: $HASURA_METADATA_DATABASE_URL"
echo "HASURA_GRAPHQL_DATABASE_URL: $HASURA_GRAPHQL_DATABASE_URL"
echo "PG_URL: $PG_URL"
