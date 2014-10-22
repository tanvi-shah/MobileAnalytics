var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var mongoClient= mongo.MongoClient;
var ObjectID=mongo.ObjectID();
var BSON = require('mongodb').BSONPure;
var bodyparser=require('body-parser');
var addItem=require('../models/add.js');
var retrieve=require('../models/retrieve.js');

/* GET to add a events */
router.get('/', function(req, res) {
  	console.log('Inside events GET request');
	retrieve.retrieveRecords("events",function(err,docs){
		if(err){
			return callback(err);
		}
		else{
			responseSuccess={"payload": {
       							 "status": "200",
        						 "response": {
									"data":docs
								     }
								    }
							}
			res.send(responseSuccess);
		}
	});

  	
});

/* GET to events by ID */
router.get('/:id', function(req, res) {
  	console.log('Inside events GET request');
	retrieve.retrieveRecordByID("events",req.params.id,function(err,doc){
		if(err){
			return callback(err);
		}
		else{
			responseSuccess={"payload": {
       							 "status": "200",
        						 "response": {
									"data":doc
								     }
								    }
							}
			res.send(responseSuccess);
		}
	});

  	
});

/* POST to add a events */
	router.post('/', function(req, res) {
	  	console.log('Inside events POST request');
		console.log(req.body);
		mongoClient.connect("mongodb://localhost:27017/eventsAnalytics", function(err,db){
			if(err===null){
				var collection=db.collection("applications");
				var objId=req.body.params.appID;
				collection.findOne({_id:objId},{fields:{appToken:1}},function(err,doc){
				console.log(doc);
				var appToken=req.body.params.appToken;
				console.log(objId+" "+appToken);
				if(doc!==null && doc.appToken===appToken){
					console.log("app present");
					addItem.add("events",req.body.params,function(err,resBody){

					if(err){
						return callback(err);
					}
					else{
						var json={"payload": {
			       								 "status": "200",
			       								 "message":"Event Added successfully."
											    }
											};
						res.send(json);

					}
					});
				}
				else{
				var json={"payload": {
			       								 "status": "500",
			       								 "message":"Event wasn't added successfully"
											    }
											};
						res.send(json);
			}

			}
			
			);
			}
			else{
				var json={"payload": {
			       								 "status": "500",
			       								 "message":"Could not connect to Database."
											    }
											};
						res.send(json);
			}
	  	});
	});

module.exports = router;