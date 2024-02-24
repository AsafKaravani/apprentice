# wait 5 seconds for the services to start
echo "Waiting for services to start..."
sleep 5

# set ROOT_DIR to the directory of the script
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


# Run DB migrations and seed data
cd $ROOT_DIR/services/db
yarn deploy
yarn seed

# Run Hasura metadata apply
cd $ROOT_DIR/services/client
yarn apply
