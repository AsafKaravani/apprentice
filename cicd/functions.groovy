def tagBuild() {
	script {
    // Get the current build number from environment variable
    def buildNumber = env.BUILD_NUMBER
    // Get the current commit hash
    def commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
    
    // Set Git user email and name
    sh "git config --global user.email bot@jenkins.com"
    sh "git config --global user.name jenkins-bot"
    
    // Set the remote URL with the Git password from environment variable
    sh "git remote set-url origin https://asafkaravani:${env.GIT_PASSWORD}@github.com/asafkaravani/apprentice.git"
    
    // Tag the commit with the build number
    sh "git tag -a \"✔build_${buildNumber}\" -m 'Build ${buildNumber}' ${commitHash}"
    
    // Push the tag to the remote repository
    sh "git push origin \"✔build_${buildNumber}\""
	}
}