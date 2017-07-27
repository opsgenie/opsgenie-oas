# OpsGenie Client SDK Swagger

### Generate a single json from separated yaml's.

Prerequisites
- Node.js with npm (https://nodejs.org/en/download/)

You need to install the node dependencies once.
```bash
cd multi-file-swagger
npm install
```

Now you can generate the single swagger json file.
```bash
node ./multi-file-swagger/index.js -- swagger.yaml > swagger.json
```
