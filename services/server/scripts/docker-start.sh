
# extract the service name and version from package.json
PACKAGE_VERSION=$(grep -oP '(?<="version": ")[^"]*' package.json)
SERVICE_NAME=$(grep -oP '(?<="name": ")[^"]*' package.json)
# replace "/" with "-" from the service name
# remove the "@" from the service name
SERVICE_NAME=${SERVICE_NAME//@/}

DOCKER_COMMAND="docker container run -d --env-file ../../.env.local $SERVICE_NAME:$PACKAGE_VERSION"
echo $DOCKER_COMMAND
eval $DOCKER_COMMAND

