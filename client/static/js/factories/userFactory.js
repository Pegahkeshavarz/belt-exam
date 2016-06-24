myApp.factory('userFactory', function($http, $sessionStorage, $localStorage){
  var users=[];
  var current_user = [];
  var buckets =[];
  var user =[];
  var factory = {};


////////////////////////////////////////////////////////
//                   user                               //
////////////////////////////////////////////////////////
    factory.getUsers = function(callback){
       $http.get('/users').success(function(output){
         users= output;
         callback(users);
       });
    }

    factory.addUser = function(user, callback){
      $http.post('/adduser', user).success(function(result){
        users.push(result);
        $sessionStorage.currUser = result;

        callback(users);
      });
    }

    factory.getCurrentUser = function(){
      return $sessionStorage.currUser;
    }



  // factory.user = function(){
  //   return $sessionStorage.current_user;
  // }

  factory.logout = function(){
    $localStorage.$reset()
  }


    ////////////////////////////////////////////////////////
    //                   bucket                           //
    ////////////////////////////////////////////////////////
    factory.addBucket = function(newbucket,callback){
      newbucket.date = Date();
		  newbucket.check = false;
      $http.post('/newbucket', newbucket).success(function(result){
        callback(result);
        console.log(result);
      });
    }

    factory.showBuckets = function(info, callback){
      info = {_id: info};
      $http.post('/buckets', info).success(function(data){
        callback(data);
      })
    }

    factory.Check = function(info, callback) {
		$http.post('/check', info).success(function(data) {
			callback(data);
		})
	}

  factory.goHome = function(info, callback){
    info = {_id: info};
    $http.post('/user', info).success(function(output){
      $sessionStorage.user = output
      callback(output);
    })
  }

factory.getIt = function(){
    return $sessionStorage.user;
  }



  return factory;
})
