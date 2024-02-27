// Function to check if there are changes in a specific directory
def call(String directory) {
    return sh(script: "git diff --quiet HEAD HEAD~ -- ${directory}/", returnStatus: true) != 0
}
