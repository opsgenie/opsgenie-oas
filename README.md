# Opsgenie OpenAPI Specification

This project based on [Swagger version 2.0.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) and [RESTful API of Opsgenie](https://docs.opsgenie.com/docs/alert-api). You can refer to [swagger.json](https://github.com/opsgenie/opsgenie-oas/blob/master/swagger.json) for combined specification.

---

### How To Combine YAML Files Into A Single JSON
Prerequisites
- [Node.js](https://nodejs.org/en/download/) with npm 

You need to install the node dependencies:
```bash
cd $PROJECT_ROOT/multi-file-swagger
npm install
```

Now you can generate a single swagger json file:
```bash
cd $PROJECT_ROOT
node ./multi-file-swagger/index.js swagger.yaml > swagger.json
```

---

### How To Selectively Combine YAML Files Into A Single JSON For Selective Domains

You can generate a single swagger json file for selective domains along with the common files:
```bash
cd $PROJECT_ROOT
node ./multi-file-swagger/index.js swagger.yaml [DomainName1] [DomainName2] [DomainName3] > swagger.json
```

Some of the Possible DomainName values are: alert, heartbeat, incident

---

### How To Generate Swagger Classes (For Java)
At this stage, we are using __our custom swagger-codegen__ implementation and use special params like x-collapse-params. However, you can also use default [swagger-codegen](https://github.com/swagger-api/swagger-codegen)  for the Java SDK generation.

```bash
cd $PROJECT_ROOT
mvn clean install
cd ./target/generated-sources/java
mvn install
```

For configuration of pom.xml, you can refer [here](https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen-maven-plugin)