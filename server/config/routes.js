var user = require('../controllers/users.js');
module.exports= function(app){

  app.post('/adduser', function(req,res){
     user.addUser(req,res);
    });

  app.get('/users', function(req,res){
     user.showUsers(req,res);
    });

  app.post('/newbucket', function(req,res){
   user.addBucket(req,res);
  });

  app.post('/buckets', function(req,res){
     user.getBucket(req,res);
    });

  app.post('/check', function(req, res) {
		user.toggle(req, res);
	})

  app.post('/user', function(req,res){
     user.showUser(req,res);
    });





}
