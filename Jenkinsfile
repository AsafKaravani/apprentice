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
										// set email and name
										sh "git config --global user.email bot@jenkins.com"
										sh "git config --global user.name jenkins-bot"
										sh '''
											git config --global user.name "${GIT_USERNAME}"
											git config --global user.password "${GIT_PASSWORD}"
											git push --set-upstream origin qa
											'''
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