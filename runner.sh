#!/bin/bash

mvn clean

if [ $# != 0 ]
then
    for domainName in "$@"
    do
        node ./multi-file-swagger/index.js -- ./individual-domains/yaml/$domainName-swagger.yaml > ./individual-domains/json/$domainName-swagger.json
        mvn install "-DdomainName=$domainName"
    done
else
    for domainName in "./individual-domains/yaml"/*
    do
        domainName=$(echo $domainName| cut -d'/' -f 4)
        domainName=$(echo $domainName| cut -d'.' -f 1)
        domainName=$(echo $domainName| cut -d'-' -f 1)
        node ./multi-file-swagger/index.js -- ./individual-domains/yaml/$domainName-swagger.yaml > ./individual-domains/json/$domainName-swagger.json
        mvn install "-DdomainName=$domainName"
    done
fi