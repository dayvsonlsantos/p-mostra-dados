# Angular04Echarts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Adjustments

Change the API URL in src/environments/environment.ts and also in src/environments/environment.prod.ts to that of the backend.

## Docker

```bash
# Set up the Dockerfile requirements.
$ make file

# Bring up/start the docker-compose
$ make up

# Stop the docker-compose
$ make stop

# To stop the container, its volumes, and anything related to it.
# Remove the image created by the docker-compose."
$ make kill

# Run make stop and make kill.
$ make down

# Run make stop and make kill, then restart the docker-compose.
$ make remake

# Stop and restart the docker-compose
$ make edit
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
