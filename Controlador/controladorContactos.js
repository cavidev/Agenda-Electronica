var logica = require('../Logica/logica');

exports.obtieneContactos = function(rRequest, rResponse) 
{	
	logica.getAllContact(rRequest.params, function(data)
	{
		rResponse.send(data);
	});	
};

exports.insertaContacto = function(rRequest,rResponse)
{
	logica.insertContact(rRequest.body,function(res)
	{
		rResponse.send(res);
	})
};

exports.eliminarContacto = function(rRequest,rResponse)
{
	logica.deleteContact(rRequest.params,function(res)
	{
		rResponse.send(res);
	});
}