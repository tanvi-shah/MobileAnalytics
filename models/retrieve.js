var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var assert=require('assert');
var ObjectID=mongo.ObjectID;
var BSON = require('mongodb').BSONPure

function retrieveRecords(coll,callback){
	mongoClient.connect("mongodb://localhost:27017/eventsAnalytics",function(err,db)
		{
			if (err===null)
			{
				db.collection(coll).find().toArray(function(err,docs){
					if(err===null)
					{
						console.log("Collection Array Length:"+docs.length);
						return callback(null,docs);
					}
				});
				
			}
		});
}

function retrieveRecordByID(coll,id,callback){
	mongoClient.connect("mongodb://localhost:27017/eventsAnalytics",function(err,db)
		{
			var obj_id = new ObjectID(id);
			if (err===null)
			{
				db.collection(coll).findOne({"_id":obj_id},function(err,doc){
					if(err===null)
					{
						console.log("ID:"+id+" :"+JSON.stringify(doc));
						return callback(null,JSON.stringify(doc));
					}
				});
				
			}
		});
}

module.exports.retrieveRecords=retrieveRecords;
module.exports.retrieveRecordByID=retrieveRecordByID;