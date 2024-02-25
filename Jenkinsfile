pipeline {
		agent any
		stages {
				stage('Env Variables') {
						steps {
								sh 'printenv'
						}
				}
				stage('Build') {
						steps {
								echo 'Building...'
						}
				}
				stage('Tagging') {
            steps {
                script {
                    // Get the current build number
                    def buildNumber = "${BUILD_NUMBER}"
                    // Get the current commit hash
                    def commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    // Tag the commit with the build number
                    sh "git tag -a build_${buildNumber} -m 'Build ${buildNumber}' ${commitHash}"
                    // Push the tag to the remote repository
                    sh "git push origin build_${buildNumber}"
                }
            }
        }
				stage('Test') {
						steps {
								echo 'Testing...'
						}
				}
				stage('Deploy') {
						steps {
								echo 'Deploying....'
						}
				}
		}
}