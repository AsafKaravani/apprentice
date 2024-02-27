replace_env_vars() {
    local filename=$1

    if [ ! -f "$filename" ]; then
        echo "File does not exist: $filename"
        return 1
    fi

    local tmpfile=$(mktemp)

    envsubst < "$filename" > "$tmpfile" && mv "$tmpfile" "$filename"
    echo "Processed $filename"
}

# Loop over all .yaml files in the k8s/ directory
for file in k8s/*.yaml; do
    replace_env_vars "$file"
done