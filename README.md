# OpsGenie OpenAPI Specification

This project based on [Swagger version 2.0.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) and [RESTful API of OpsGenie](https://docs.opsgenie.com/docs/alert-api).

---

### How To Combine YAML Files To Single JSON
Prerequisites
- [Node.js](https://nodejs.org/en/download/) with npm 

You need to install the node dependencies once.
```bash
cd $PROJECT_ROOT/multi-file-swagger
npm install
```

Now you can generate the single swagger json file.
```bash
cd $PROJECT_ROOT
node ./multi-file-swagger/index.js -- swagger.yaml > swagger.json
```

---

### How To Generate Swagger Classes (for Java)
At this stage, we are using __our swagger-codegen__ implementation and use special params like x-collapse-params. However, you can also use default [swagger-codegen](https://github.com/swagger-api/swagger-codegen)  during the Java SDK generation.

```bash
cd $PROJECT_ROOT
mvn clean install
cd ./target/generated-sources/java
mvn install
```

For configuration of pom.xml, you can refer [here](https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen-maven-plugin)