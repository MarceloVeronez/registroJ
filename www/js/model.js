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
  database: 'TrabalhoRD', //env var: PGDATABASE
  password: '12345', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

app.post('/insere', function (req, res) {
	var aux = req.params.uga;
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into mapas (txtOrigem, txtDestino) values (' + '\'' + aux.txtOrigem + '\', ' + '\'' + aux.txtDestino + '\'' + ')', function(err, result) {
		//call `done()` to release the client back to the pool
		done();

		if(err) {
		  return console.error('error running query', err);
		}

		res.setHeader('Access-Control-Allow-Origin','*');
		res.json(result.rows); // servidor retorna a consulta em formato json
	  });
	});
	});




app.listen(3000)