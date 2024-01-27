This project contains the template for all the frontend projects with:
- @mui/material 
- @reduxjs/toolkit
- i18next
- oidc-client

# How to use this template

## Create the new frontend repository
- In Github create a new repository
- In `Repository template` selector choose `apsys-mx/apsys.frontend.base.turkey`
- Complete the additional information and create the repository
- In your development environment, clone the new created repository
- Open the files using any text editor like Visual Code or any other tool

## Configure code review with Sonar

This repository contains the templates to configure code review with SonarCloud or SonarQube. 
Check the documentation below

### Configure with SonarCloud

To configure code review with SonarCloud do the next configuration in the `master-pipeline.yml` or `devel-pipeline.yml`

```yml
...
- script: npm install
- template: 'templates-sonar/sonar-cloud-prepare.yml'
parameters:
    enabled: true
    sonarServiceName: ${{variables.sonarServiceName}}
    sonarProjectKey: ${{variables.sonarProjectKey}}
    sonarProjectName: ${{variables.sonarProjectName}}
    sonarCloudOrganization: ${{variables.sonarCloudOrganization}}
- script: npm run $(buildScript)
- template: 'templates-sonar/sonar-cloud-execute.yml'
parameters:
    enabled: true
    sonarServiceName: ${{variables.sonarServiceName}}
    sonarCloudOrganization: ${{variables.sonarCloudOrganization}}
...
```

### Configure with SonarQube

To configure code review with SonarQube do the next configuration in the `master-pipeline.yml` or `devel-pipeline.yml`

```yml
...
- script: npm install
- template: 'templates-sonar/sonarqube-prepare.yml'
parameters:
    enabled: true
    sonarServiceName: ${{variables.sonarServiceName}}
    sonarProjectKey: ${{variables.sonarProjectKey}}
    sonarProjectName: ${{variables.sonarProjectName}}
- script: npm run $(buildScript)
- template: 'templates-sonar/sonarqube-execute.yml'
parameters:
    enabled: true
    sonarServiceName: ${{variables.sonarServiceName}}
...
```

### Configure Sonar variables

Open the  `ci\templates-sonar\sonar-config.yml` file

```yml
# Change the variable values according to your sonar configuration
variables:
  sonarServiceName: 'sonar-service-name'    # Service name from Azure Service connections. Use SonarCloud or SonarQube service connection 
  sonarProjectKey: 'apsys-devops_apsys.frontend.base.turkey'
  sonarProjectName: 'apsys.frontend.base.turkey'  
  sonarCloudOrganization: 'apsys-devops'    # This value is required only for SonarCloud configuration

```

## Configure Octopus deploy

Open the  `ci\templates-octopus\octopus-config.yml` file

```yml
# Change the variable values according to your octopus deploy configuration
variables:
  octopusServer: 'octopus-server-url'
  octopusSpaceName: 'octopus-space-name'
  octopusDevelopmentName: 'development-environment-name'
  octopusTestingName: 'testing-environment-name'
  packageName: 'package-name'
  octopusProjectName: 'octopus-project-name'
```


## Configure Identity authority and backend connection

Open the  `.env`, `.env.qas` and `.env.prd` files

```
# Change the variable values according to your identity authority and backend connection
VITE_APP_ROOT='/'
VITE_APP_CLIENT_ID='app-client-id'
VITE_IDENTITY_SERVER_URL='https://identity-server-url'
VITE_BACKEND_URL=http://backend-url
```
