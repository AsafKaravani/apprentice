
# Directory containing the YAML files
yaml_dir="k8s"

# Check if the directory exists
if [ ! -d "$yaml_dir" ]; then
    echo "Directory $yaml_dir does not exist."
    exit 1
fi

# Loop over all .yaml files in the specified directory
for file in "$yaml_dir"/*.yaml; do
    echo "Processing $file..."

    # Make a temporary copy of the file
    cp "$file" "$file.tmp"

    # Read each line in the file
    while IFS= read -r line; do
        # Search for patterns that match ${SOME_ENV_VAR}
        if [[ "$line" =~ \${(.+)} ]]; then
            env_var_name="${BASH_REMATCH[1]}"
            env_var_value="${!env_var_name}"

            # If the environment variable is set, replace its placeholder with the actual value
            if [ ! -z "$env_var_value" ]; then
                # Use the env var value to replace in the file
                # Note: Using @ as delimiter in sed to avoid conflict with file paths
                sed -i "s@\${$env_var_name}@$env_var_value@g" "$file.tmp"
            fi
        fi
    done < "$file"

    # Replace the original file with the modified temporary file
    mv "$file.tmp" "$file"
    echo "$file updated."
done

echo "All YAML files in $yaml_dir processed."