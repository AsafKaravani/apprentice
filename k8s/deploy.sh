source  ./k8s/set-node-ports.sh

replace_env_vars() {
    local filename=$1
    local dirname=$(dirname "$filename")
    local basename=$(basename "$filename")
    
    if [ ! -f "$filename" ]; then
        echo "File does not exist: $filename"
        return 1
    fi

    # Create a new filename for the processed file
    # This creates a file with a suffix indicating it's processed, in the same directory
    local new_filename="${dirname}/tmp/${basename}"

    # Use envsubst to replace environment variables and save to a new file
    envsubst < "$filename" > "$new_filename"
    echo "Processed $filename and saved changes to $new_filename"
}

# Loop over all .yaml files in the k8s/ directory
for file in k8s/*.yaml; do
    replace_env_vars "$file"
done

echo $KUBE_CONFIG | base64 --decode > decoded-kube-config.yaml

# Option 1: Set the KUBECONFIG environment variable to use the decoded file
export KUBECONFIG=decoded-kube-config.yaml

# Now you can use kubectl commands directly
kubectl delete persistentvolume ${NAMESPACE}-postgres-pv
kubectl apply -f k8s/tmp/namespace.yaml
kubectl apply -f k8s/tmp/config-map.yaml
kubectl apply -f k8s/tmp

rm decoded-kube-config.yaml

echo "Cleaning up temporary files..."
find k8s/tmp -type f -name '*.yaml' -exec rm {} +

echo "Cleanup complete."

echo  "Services:"
echo "	- hasura: http://$NAMESPACE.hasura.$DOMAIN"
echo "	- client: http://$NAMESPACE.client.$DOMAIN"
echo "	- server: http://$NAMESPACE.server.$DOMAIN"
echo "	- pstgre: http://$DOMAIN:$POSTGRES_NODEPORT"

# # echo "Waiting for services to start..."
# # sleep 20

# echo "Running migrations and seeding data..."
# ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
# echo $ROOT_DIR

# # Run DB migrations and seed data
# cd $ROOT_DIR/services/db
# yarn prisma migrate deploy
# yarn ts-node seed/seed-db.ts

# # Run Hasura metadata apply
# cd $ROOT_DIR/services/client
# source ./scripts/apply.sh
