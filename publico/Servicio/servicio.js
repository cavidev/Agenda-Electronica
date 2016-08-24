(function(){
    'use strict';
    angular
        .module('MiAplicacion') 
        .factory('obtieneContactos', 
            function(requestService) 
            {
                var obtieneContacto =  function(callback){
                    requestService.getRequest({params:'', data: ''}, {url: '/obtenerContactos/'})
                      .then(function(res){
                        callback(res);
                    });
                };
                return {
                    obtieneContacto: function(callback){
                        obtieneContacto(callback)
                    }
                };
            })
            .factory('insertarContacto', 
            function(requestService) 
            {
                var insertarContacto =  function(datos,callback){
                    requestService.postRequest({params:'', data: datos}, {url: '/insertarContacto/'})
                      .then(function(res){
                        callback(res);
                    });
                };
                return {
                    insertarContacto: function(datos,callback){
                        insertarContacto(datos,callback)
                    }
                };
            })
            .factory('eliminarContacto', 
            function(requestService) 
            {
                var eliminarContacto =  function(datos,callback){
                    requestService.deleteRequest({params:datos, data:''}, {url: '/eliminarContacto/'})
                      .then(function(res){
                        callback(res);
                    });
                };
                return {
                    eliminarContacto: function(datos,callback){
                        eliminarContacto(datos,callback)
                    }
                };
            });
})();