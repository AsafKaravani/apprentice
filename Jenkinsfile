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