# Deploy and run

For running this project on local you have to remove baseHref and deployUrl 
("baseHref": "./" "deployUrl": "./") 
and also "  
"fileReplacements": [{
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.prod.ts"
}],"

# Prod - these are equivalent
ng build --configuration=production
ng build --c=production

# Dev - and so are these
ng build --configuration=development
ng build --c=development

# spans

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

cmd `ng build --configuration=production`

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


