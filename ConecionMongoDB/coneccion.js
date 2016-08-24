var fs = require('fs'); 
var MongoClient = require('mongodb').MongoClient;

var readJsonFile = function() {
    //Se lee el archivo de configuración de la base de datos
    var connectionParams = fs.readFileSync("./dbConfiguration.json");
    var dbConfig = {};

    try {
        //se convierte a JSON
        dbConfig = JSON.parse(connectionParams);
    } 
    catch (err) {
        console.log(err);
    }
    return dbConfig;
};

exports.findDocuments = function(queryParams, callback) {

    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);
	
    MongoClient.connect(dbUrl, function(err, db)
						{
							var collection = db.collection(queryParams.collection);
							console.log(queryParams.query);
							collection.find().toArray(function(err, docs)
                            {
                                db.close(); 
                                console.log(docs);
                                callback(docs);
                            }); 
						});
};

exports.addDocument = function(queryParams, callback) {
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);

    MongoClient.connect(dbUrl, function(err, db){
          var collection = db.collection(queryParams.collection);
          collection.insert(queryParams.query, function(err, result) 
          {
                db.close(); 
                var res = {resultado: "Se añadio", res:result}
                callback(res);
          }); 
    });
};

exports.deleteContact = function(queryParams , callback)
{
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);

    MongoClient.connect(dbUrl, function(err, db)
    {
          var collection = db.collection(queryParams.collection);
          collection.find({"_id": queryParams.query},function(err,doc)
          {
              console.log(doc);
          });
          
          collection.remove({"_id": queryParams.query}, {_id: 0},function(err)
          {
              var doc = {respondio:"Se añadio", usuario: queryParams.query};
              console.log("Estoy en la connecion");
              console.log(queryParams.query);
              db.close(); 
              if(err)
              {
                  callback(err);
              }
              else{
                  callback(doc);
              }
          });
    });  
};