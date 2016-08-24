var controladorC = require('./Controlador/controladorContactos')

/****************************************************************/
//Configuraciones principales del servidor, solo con esto escucha las peticiones... 
bodyParser = require('body-parser');
var express  = require('express'),
      app    = express(),
      server = require('http').createServer(app),
      port   = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/publico'));
/****************************************************************/

app.get('/obtenerContactos',controladorC.obtieneContactos);

app.post('/insertarContacto/',controladorC.insertaContacto)

app.post('/eliminarContacto/:id',controladorC.eliminarContacto);


server.listen(port, function(){
  console.log('Server listening on port: ' + port);
});
