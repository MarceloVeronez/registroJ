var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'RDTrabalho', //env var: PGDATABASE
  password: '12345', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

