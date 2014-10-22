var mongo=require('mongodb');
var mongoClient= mongo.MongoClient;
var assert=require('assert');
var ObjectID=mongo.ObjectID;

function suspend(coll,id,callback){

	mongoClient.connect("mongodb://localhost:27017/eventsAnalytics", function(err,db){
		assert.equal(null,err);
		var obj_id = new ObjectID(id);
		if(err===null){
			var collection= db.collection(coll);
			collection.update({"_id":obj_id},{$set:{"block":"true"}},function(err,docUpdated){
				console.log("Suspended item successfully in collection "+coll);
				suspendAssociatedUsers(obj_id,db,function(err,docsUpdated){
					if(err===null){
					var json={"payload": {
       								 "status": "200",
       								 "message":"Tenants and its Users Suspended successfully.",
       								"numberOfUsersSuspended":docsUpdated
								    }
								};
					return callback(null,json);
				}
				else{
					return callback(err);
				}

				});
				
			});
		}
		else{
			return callback(err);
		}
	});
}

function suspendAssociatedUsers(tenant_obj_id,db,callback){
	var collection= db.collection("users");
	console.log("In suspendAssociatedUsers for tenant "+tenant_obj_id);
	collection.update({"tenantID":tenant_obj_id},{$set:{"block":"true"}},function(err,docsUpdated){
		if(err===null){
			console.log("Suspended users which belong to tenant "+tenant_obj_id+" successfully.");
			callback(null,docsUpdated);
		}
		else{
			callback(err);
		}
	});

}

module.exports.suspend=suspend;