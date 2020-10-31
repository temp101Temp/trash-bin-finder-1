# Trash bin Finder

## Installation

Use this command in each service.

```bash
npm install
```

## QuickStart

start the service

```bash
npm start
```

testing

```bash
npm test
```
Make sure that these ports are not occupied

```bash
trash-bin-finder-service:3000
elasticsearch-dal:9000
postgres-dal:8000
tests:4444
```

swagger accsessable at

```bash
http://localhost:3000/swagger
```
## Running on  Docker

simply open cmd/powershell in each service repository and run dockerDeploymentScript.sh with the desierd version.
example:

```bash
C:\Users\username\Documents\Trash-bin-Finder\trash-bin-finder-service>.\dockerDeploymentScript.sh 1.0
```

## Notes

* Tests are located in trash-bin-finder-service
* Make sure that you run redis locally and expose port 6379 
(if you have redis allready installed that expose another port just change the configuration)
* Make sure that you run postgres locally and expose port 5342 
* You can find DI implemention in postgres-dal & trash-bin-finder-service
