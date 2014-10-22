var mongo=require('mongodb');
var express = require('express');
var router = express.Router();
var bodyparser=require('body-parser');
var addItem=require('../models/add.js');
var retrieve=require('../models/retrieve.js');
var suspend=require('../models/suspend.js');
var ObjectID=mongo.ObjectID;

/* GET to tenants */
router.get('/', function(req, res) {
  	console.log('Inside tenants GET request');
	retrieve.retrieveRecords("tenants",function(err,docs){
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

/* GET to tenant by ID */
router.get('/:id', function(req, res) {
  	console.log('Inside tenants GET request');
	retrieve.retrieveRecordByID("tenants",req.params.id,function(err,doc){
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

/* PUT to suspend tenant by ID */
router.put('/suspend/:id', function(req, res) {
  	console.log('Inside tenants PUT request');
	suspend.suspend("tenants",req.params.id,function(err,json){
		if(err){
			return callback(err);
		}
		else{
			responseSuccess=json;
			res.send(responseSuccess);
		}
	});

  	
});

/* POST to add a tenant */
	router.post('/', function(req, res) {
	  	console.log('Inside tenants POST request');
		console.log(req.body);
		addItem.add("tenants",req.body.params,function(err,resBody){

		if(err){
			return callback(err);
		}
		else{

			var defaultUsers=resBody;

			for(var i=0;i<defaultUsers.length;i++){

				var defaultJson=defaultUsers[i];
				console.log("Inside for to add default user");
				var emailID= "";
				var password=makePassword();
				var tenant_id=null;
				var username="";

				if(defaultJson.hasOwnProperty('companyEmailID'))
				{
					emailID=defaultJson.companyEmailID;
					username=defaultJson.companyEmailID;
				}
				else
				{
					username=makeUsername()+"_admin";
				}
				if(defaultJson.hasOwnProperty('_id'))
				{
					tenant_id=new ObjectID(defaultJson._id);
				}
				var defaultUserJson={
					"username":username,
					"password":password,
					"tenantID":tenant_id,
					"emailID":emailID,
					"isAdmin":"true"
				};

				addItem.add("users",defaultUserJson,function(err,usrResBody){


					if(err){
						return callback(err);
					}

				});
			}
			var json={"payload": {
       								 "status": "200",
       								 "message":"Tenant Added successfully."
								    }
								};
			res.send(json);

		}
		});
	  	
	});

function makePassword()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function makeUsername()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = router;
