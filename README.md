realtime-practice
=================

Requirements
------------

- OS X 10.10

Setup
-----

Have config.js contain something like this;

```
var config = {
    sango_server: "ws://lite.mqtt.shiguredo.jp:8080/mqtt",
    sango_user: "xxxxxxxx@github",
    sango_pass: "xxxxxxxx"
};
```

Usage
-----

```
$ ./runserver
```

starts HTTP server at http://localhost:8000
