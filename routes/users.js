var express = require('express');
var router = express.Router();
var bodyparser=require('body-parser');
var addItem=require('../models/add.js');
var retrieve=require('../models/retrieve.js');

/* GET to add a user */
router.get('/', function(req, res) {
  	console.log('Inside users GET request');
	retrieve.retrieveRecords("users",function(err,docs){
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

/* GET to user by ID */
router.get('/:id', function(req, res) {
  	console.log('Inside users GET request');
	retrieve.retrieveRecordByID("users",req.params.id,function(err,doc){
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

/* POST to add a user */
	router.post('/', function(req, res) {
	  	console.log('Inside users POST request');
		console.log(req.body);
		addItem.add("users",req.body.params,function(err,resBody){

		if(err){
			return callback(err);
		}
		else{
			var json={"payload": {
       								 "status": "200",
       								 "message":"User Added successfully."
								    }
								};
			res.send(json);

		}
		});
	  	
	});

module.exports = router;