var myApp = angular.module('MiAplicacion', []);

myApp.controller('Principal',function($scope, obtieneContactos,insertarContacto,eliminarContacto){
    
    $scope.refresh = function()
		{
        	obtieneContactos.obtieneContacto(function(res)
											 {
												$scope.listaContactos = res;
												$scope.contacto = "";
											});
		};
    $scope.refresh();
		
		$scope.insert = function()
		{
				var informacion = {Nombre:$scope.contacto.Nombre,Correo:$scope.contacto.Correo,Telefono:$scope.contacto.Telefono};
				console.log(informacion);
				insertarContacto.insertarContacto($scope.contacto,function(res)
				{
					console.log(res.res);
				});
				$scope.refresh();
			
		};
		
		$scope.delete = function(id)
		{
				eliminarContacto.eliminarContacto(id,function(res)
				{
					alert(res.respondio +' '+ res.usuario);
				});
				$scope.refresh();
			
		};
    
});


myApp.controller('AppCtrl',function ($scope, $http) 
{
    console.log("--Hola Mundo-- Desde el Controlador");
    //el $scope se utiliza para conectarse con la html
    //el $http se utiliza para conectarse con el server js

	var refresh = function(){
		$http.get('/listaContactos').success(function(response){
			//Esta es la funcion que obtine los datos de mongo
			console.log("Yo obtengo los datos de de MongoDB");
            $scope.ordenar = function(array, llave){
                return array.sort(function(a,b){
                    var x = a[llave]; var y = b[llave];
                    return((x<y) ?-1: ((x>y)? 1: 0));
                });    
            }
			$scope.listaContactos = $scope.ordenar(response,'Nombre');
			$scope.contacto = "";
		});
	};//Obtiene los datos de la base de DSatos
	refresh();

	//Utiliza la clase addContact para agregar nuevos contactos a mongo
	$scope.addContact = function() {
		console.log($scope.contacto);
		$http.post('/listaContactos',$scope.contacto).success(function(response){
			console.log(response);
			refresh();//para actualizar
		});//Hace la conexión con la base de Datos insertar los datos
	};

	//Remueve de MongoDB un contacto
	$scope.remove = function(id) {
	  console.log(id);
	  $http.delete('/listaContactos/' + id).success(function(response) {
	    refresh();
	  });
	};

	//Edita los Datos en la base de Datos
	$scope.edit = function(id) {
	  console.log(id);
	  $http.get('/listaContactos/' + id).success(function(response) {
	    $scope.contacto = response;
	  });
	};

	//Actualiza en la bases de Datos
	$scope.update = function() {
	  console.log($scope.contacto._id);
	  $http.put('/listaContactos/' + $scope.contacto._id, $scope.contacto).success(function(response) {
	    refresh();
	  })
	};

	$scope.deselect = function() {
	  $scope.contact = "";
	}


});
