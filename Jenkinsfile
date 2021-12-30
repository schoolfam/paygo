#!/usr/bin/env groovy

node {
      env.HEROKU_API_KEY: '23a2ea48-7821-4d1a-95e3-d5472923de6f',


    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }
    stage('deployment') {
        withCredentials([[$class: 'StringBinding', credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_API_KEY']]) {

        sh "./gradlew deployHeroku --no-daemon"
     }
       
    }

    stage('clean') {
        sh "chmod +x gradlew"
        sh "./gradlew clean --no-daemon"
    }
    stage('nohttp') {
        sh "./gradlew checkstyleNohttp --no-daemon"
    }

    stage('npm install') {
        sh "./gradlew npm_install -PnodeInstall --no-daemon"
    }
   
    
    stage('packaging') {
        sh "./gradlew bootJar -x test -Pprod -PnodeInstall --no-daemon"
        archiveArtifacts artifacts: '**/build/libs/*.jar', fingerprint: true
    }

    

}
