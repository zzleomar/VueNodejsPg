/*

const express = require('express');
const  router = express.Router();


const IndexController = require('../controllers/indexController');

router.get('/', IndexController.index );
router.get('/ventas', IndexController.ventas);
router.get('/actos', IndexController.actos);
router.get('/inicio', IndexController.inicio);
router.get('/gacetas', IndexController.gacetas);
router.get('/venta', IndexController.venta);
router.get('/nuevaGaceta', IndexController.nuevaGaceta);
router.get('/nuevoActo', IndexController.nuevoActo);
router.get('/plan-cuenta', IndexController.PlanCuenta);
router.get('/usuario', IndexController.Usuario);



router.get('*', (req,res,next) =>{
	res.end('Ruta no encontrada');
});


module.exports =router;







*/


var express = require('express');
var router = express.Router();
//var Book = require('../models').Book;
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/pruebas';

// GET ALL BOOKS 
router.get('/', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM books ORDER BY _id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


// GET SINGLE BOOK BY ID 
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM books WHERE _id=($1)",
      [id]);
    // After all data is returned, close connection and return results
    query.on('row', function(row) {
      done();
      return res.json(row);
    });
  });
});

// SAVE BOOK 

router.post('/', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {isbn: req.body.isbn, title: req.body.title, author: req.body.author, description: req.body.description, published_year: req.body.published_year, publisher: req.body.publisher, _id:req.body._id};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      return next(err);
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO books(isbn, title,author, description,published_year, publisher, _id) values($1, $2,$3, $4,$5, $6,$7)',
    [data.isbn , data.title ,data.author , data.description ,data.published_year , data.publisher, data._id ]);
      done();
      return res.json(data);
  });
});


// UPDATE BOOK 
router.put('/:id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.id;
  // Grab data from http request
  const data = { isbn: req.body.isbn, title: req.body.title, author: req.body.author, description: req.body.description, published_year: req.body.published_year, publisher: req.body.publisher};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE books SET isbn=($1), title=($2),author=($3), description=($4),published_year=($5), publisher=($6) WHERE _id=($8)',
    [data.isbn , data.title ,data.author , data.description ,data.published_year , data.publisher, id]);
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM books ORDER BY _id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

// DELETE BOOK 
router.delete('/:id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM books WHERE _id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM books ORDER BY _id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


module.exports = router;