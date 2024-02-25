# This script is used to run after the docker-compose command to run migrations, seed data, apply metadata etc.

# wait 5 seconds for the services to start
echo "Waiting for services to start..."
sleep 5

# set ROOT_DIR to the directory of the script
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


# Run DB migrations and seed data
cd $ROOT_DIR/services/db
yarn deploy # Run Prisma migrations
yarn seed # Seed data

# Run Hasura metadata apply
cd $ROOT_DIR/services/client
yarn apply # Apply Hasura metadata
