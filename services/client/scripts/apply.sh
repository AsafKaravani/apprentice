cd ../hasura

hasura metadata apply --admin-secret "$HASURA_GRAPHQL_ADMIN_SECRET" --endpoint "$HASURA_ENDPOINT" --log-level DEBUG