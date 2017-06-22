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

app.post('/insere/mapas', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into mapas (txtorigem, txtdestino,distancia, tempo, hora) values (' + '\'' + req.body[0].txtOrigem + '\'' + ','  
	  																							+ '\'' + req.body[0].txtDestino + '\'' + ',' 
	  																							+ '\'' + req.body[0].distancia + '\'' + ',' 
	  																							+ '\'' + req.body[0].tempo + '\'' + ',' 
	  																							+ '\'' + req.body[0].hora + '\'' + ')', function(err, result) {
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

app.post('/insere/direcao', function (req, res) {
	pool.connect(function(err, client, done) {
		console.log(req.body.inicio);
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into direcao (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')' , function(err, result) {
		//call `done()` to release the client back to the pool
		done();
		if(err) {
		  return console.error('error running query', err);
		}
		 res.setHeader('Access-Control-Allow-Origin','*');
		 res.json(result.rows);
	}); 
	});
	});

app.post('/insere/refeicao', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into refeicao (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/descanso', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into descanso (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/carga', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into carga (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/descarga', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into descarga (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/abastecimento', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into abastecimento (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/tempoc', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into tempoc (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/fiscalizacao', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into fiscalizacao (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/manutencao', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into manutencao (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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

app.post('/insere/pernoite', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('insert into pernoite (inicio,fim) values (' + '\'' + req.body.inicio + '\'' + ','  
	  															+ '\'' + req.body.fim + '\'' + ')', function(err, result) {
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