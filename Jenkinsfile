pipeline {
		agent any
		stages {
				stage('Build') {
						steps {
								echo 'Building... ${BUILD_NUMBER}'
								echo 'Building... $BUILD_NUMBER'
								echo 'Building... ${PG_HOST}'
								echo 'Building... $PG_HOST'
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