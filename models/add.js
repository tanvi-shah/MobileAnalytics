var mongo=require('mongodb');
var mongoClient= mongo.MongoClient;
var assert=require('assert');


function add(coll,json,callback){

	mongoClient.connect("mongodb://localhost:27017/eventsAnalytics", function(err,db){
		assert.equal(null,err);
		if(err===null){
			var collection= db.collection(coll);
			collection.insert(json,function(err,docsInserted){
				console.log("Data added successfully in collection "+coll);
				console.log(docsInserted);

				if(err)
					return callback(err);
				else
					return callback(null,docsInserted);
			});
			//return callback(err,returnJson);
			
		}
		else{
			return callback(err);
		}
	});
}

module.exports.add=add;