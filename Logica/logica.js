var dbConnection = require('../ConecionMongoDB/coneccion.js');

exports.getAllContact = function (data, callback)
{
	var queryParams ={
                        query: data.parametros, 
                        collection: 'listaContactos'
                      }; 
	
	 dbConnection.findDocuments(queryParams, function (res)
     {
		 var ordenar = function(array, llave)
		 {
			return array.sort(function(a,b){
				var x = a[llave]; var y = b[llave];
				return((x<y) ?-1: ((x>y)? 1: 0));
			});    
		 }
		 var contactosOrdenados = ordenar(res,'Nombre');
        callback(ordenar(res,'Nombre'));
     }) 
};

exports.insertContact =  function(data,callback)
{
	var queryParams ={
                        query: data, 
                        collection: 'listaContactos'
                      };
	dbConnection.addDocument(queryParams,function(res)
	{
		callback(res);
	})
	
};

exports.deleteContact = function(data,callback)
{
	var queryParams ={
                        query: data.id, 
                        collection: 'listaContactos'
                      };
	dbConnection.deleteContact(queryParams,function(res)
	{
		callback(res);
	});	
};