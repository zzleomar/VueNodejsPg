const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

//postgres

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/sabates';


const app = express();



const routes = require('./routes/index');
//Configuraciones

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'html');

//middeware
app.use((req,res, next) =>{
	console.log(req.url, req.method);
	next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'dist')));

//archivos estaticos

app.use(express.static("public"));

//rutas
//app.use(routes);
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', routes);

//servidor
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});

//errores

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
