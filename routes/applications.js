var mongo=require('mongodb');
var ObjectID=mongo.ObjectID;
var express = require('express');
var router = express.Router();
var bodyparser=require('body-parser');
var addItem=require('../models/add.js');
var retrieve=require('../models/retrieve.js');


/* GET to add a applications */
router.get('/', function(req, res) {
  	console.log('Inside applications GET request');
	retrieve.retrieveRecords("applications",function(err,docs){
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

/* GET to application by ID */
router.get('/:id', function(req, res) {
  	console.log('Inside applications GET request');
	retrieve.retrieveRecordByID("applications",req.params.id,function(err,doc){
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

/* POST to add a application */
	router.post('/', function(req, res) {
	  	console.log('Inside applications POST request');
		console.log(req.body);
		addItem.add("applications",req.body.params,function(err,resBody){

		if(err){
			return callback(err);
		}
		else{
			var json={"payload": {
       								 "status": "200",
       								 "message":"Application Added successfully."
								    }
								};
			res.send(json);

		}
		});
	  	
	});

/* POST to add a application for a given tenant */
	router.post('/tenantID/:id', function(req, res) {
	  	console.log('Inside applications POST request');
		console.log(req.body);
		var appJson=req.body.params;
		appJson.tenantID=new ObjectID(req.params.id);
		addItem.add("applications",appJson,function(err,resBody){

		if(err){
			return callback(err);
		}
		else{
			var json={"payload": {
       								 "status": "200",
       								 "message":"Application Added successfully."
								    }
								};
			res.send(json);

		}
		});
	  	
	});

module.exports = router;