var mongoose = require('mongoose');
var User = mongoose.model('User');
var Bucket = mongoose.model('Bucket');

module.exports = (function(){
  return {
    addUser: function(req,res){
      var user = new User(req.body);
      user.save(function(err){
        if(err){
          console.log('save userd server controller errors:', user.errors);
          res.json({title: "you have errors", errors: user.errors});
        } else {
        //  console.log("user added: ", user);
          User.findOne({_id:user._id}, function(err, newuser){
            if(err){
              console.log("something went wrong");
            } else {
              res.json(newuser);
            }
          })
        }
      })
    },

    showUsers: function(req,res){
      User.find({}, function(err,result){
        if(err){
          console.log("error in mongo was found: ", err);
        } else {
          console.log(result);
          res.json(result);
        }
      })
    },
    addBucket: function(req,res){
      console.log(req.body);
      User.findOne({_id: req.body.user_id})
            .populate('buckets')
            .exec(function(err, user){
              console.log('///////////////');
        console.log(user);
  console.log('///////////////');
      var bucket = new Bucket({title: req.body.title, description:req.body.description, date: req.body.date, check: req.body.check, user_id: user._id});
      user.buckets.push(bucket);
      bucket.save(function(err){
        if(err){
          console.log('save bucket server controller errors:', bucket.errors);
          res.json({title: "you have errors", errors: bucket.errors});
        } else {
          user.save();
          console.log("bucket added: ", bucket);
          console.log("user is", user);
          res.json(user);
        }
      });
    });
    },

    getBucket:function(req,res){
    User.findOne({_id:req.body}).populate('buckets').exec(function(err,result){
      if(err){
        console.log('something went wrong');
      } else {
        console.log('/////////////injaaaaa');
          console.log(result);
          console.log('/////////////');
          res.json(result);
      }
    })
  },
  toggle: function(req, res) {
		Bucket.findByIdAndUpdate({_id: req.body._id}, {$set: {check: true}}, function(err, bucket) {
			if (err) {
				console.log(err);
			} else {
				User.findOne({_id: req.body.userid}).populate('buckets').exec(function(err, buckets) {
					if (err) {
						console.log(err);
					} else {
						res.json(buckets);
					}
				});
			}
		});
	},
  showUser: function(req,res){
    User.findOne({_id: req.body._id}, function(err, user){
      if(err){
        console.log("errrrrrrror");
      } else {
        res.json(user);
      }
    })
  }





  }
})();
