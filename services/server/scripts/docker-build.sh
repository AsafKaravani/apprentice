

SERVICE_DIR=$(pwd)
ROOT_DIR=$(pwd)/../../
RELATIVE_DIR=$(realpath --relative-to="$ROOT_DIR" "$SERVICE_DIR")

# extract the service name and version from package.json
PACKAGE_VERSION=$(grep -oP '(?<="version": ")[^"]*' package.json)
SERVICE_NAME=$(grep -oP '(?<="name": ")[^"]*' package.json)
# remove the "@" from the service name
SERVICE_NAME=${SERVICE_NAME//@/}

DOCKER_COMMAND="docker build -t $SERVICE_NAME:$PACKAGE_VERSION -f $SERVICE_DIR/Dockerfile $ROOT_DIR"
echo $DOCKER_COMMAND
eval $DOCKER_COMMAND


