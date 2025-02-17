# Cyolo Home Assignment

## Requirements

- Docker

## Instructions

There are four relevant environments for this project:

1. **Development Environment**  
   This env enables to run the services ONLY, independently, so interaction from localhost is enabled.  
   In order to connect to all services add NODE_ENV=dev to your localhost env.
   Navigate to the development environment directory:  
   `cd docker/dev`  
   

2. **Quality Assurance Environment**  
   Navigate to the QA environment directory:  
   `cd docker/qa`   
   

3. **Testing Environment**  
   This env is  a container which performs tests and outputs the result to a file located in docker/tests/test-result       
   Navigate to the testing environment directory:  
   `cd docker/test`  

4. **Production Environment**  
   This env is  a production env which deploys production dependencies only      
   Navigate to the testing environment directory:  
   `cd docker/prod`

## Setup and Execution
execute the following command:

docker-compose -p cyolo_namespace down --volumes --remove-orphans && docker-compose -p cyolo_namespace build --no-cache && docker-compose -p cyolo_namespace up -d



