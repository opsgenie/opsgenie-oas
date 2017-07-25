'use strict';

var JsonRef = require('json-refs');
var YAML = require('yaml-js');
var FS = require('fs');
var URI = require('url');

function findValue (obj, path) {
  var value = obj;

  path.forEach(function (seg) {
    seg = decodeURI(seg);

    if (seg in value) {
      value = value[seg];
    } else {
      throw Error('JSON Pointer points to missing location: #/' + path.join('/'));
    }
  });

  return value;
}

function setValue (obj, refPath, value) {
  findValue(obj, refPath.slice(0, refPath.length - 1))[decodeURI(refPath[refPath.length - 1])] = value;
}

function collect (obj, fields, path) {
  var collection = {};
  fields.forEach(function (field) {
    if (obj[field] === undefined) {
      console.log('Can not find ' + path.slice().concat([field]).join('.'));
    } else {
      collection[field] = obj[field];
    }
  });

  return collection;
}

function resolve (obj, path, rootObj) {
  if (obj.uri.indexOf('?') === -1) {
    return false;
  }

  try {
    var url = URI.parse(obj.uri.trim().replace(/^#+/, ''), true);
    var fields = url.query.fields;
    var refPath = JsonRef.pathFromPtr(url.pathname);
    var collection = collect(findValue(rootObj, refPath), fields.split(/\s*,\s*/), refPath);
    setValue(rootObj, path, collection);
  } catch (e) {
    console.log(e);
  }
}

function merge (obj, path) {
  try {
    var tmp = findValue(obj, path);
    var res = {};

    if (Array.isArray(tmp)) {
      Object.assign.apply(Object, [res].concat(tmp));
      setValue(obj, path, res);
    }
  } catch (e) {
    console.log(e);
  }

  return obj;
}

module.exports = function (rootFile, destFile) {
  var options = {
    filter: ['relative', 'remote'],
    loaderOptions: {
      processContent: function (res, callback) {
        callback(null, YAML.load(res.text));
      }
    }
  };
  var root = YAML.load(FS.readFileSync(rootFile).toString());

  JsonRef.clearCache();
  return JsonRef.resolveRefs(root, options).then(function (res) {
    merge(res.resolved, ['definitions']);
    merge(res.resolved, ['parameters']);
    merge(res.resolved, ['paths']);
    merge(res.resolved, ['responses']);

    JsonRef.findRefs(res.resolved, {
      filter: function (obj, path) {
        resolve(obj, path, res.resolved);
        return false;
      }
    });

    if (destFile) {
      FS.writeFileSync(destFile, JSON.stringify(res.resolved, null, 2));    
    } else {
      console.log(JSON.stringify(res.resolved, null, 2));
    }
  });
};
