myApp.controller('userController', function ($scope, userFactory, $location, $localStorage,
    $sessionStorage) {

  ////////////////////////////////////////////////////////
  //                user                               //
  ////////////////////////////////////////////////////////
  var duplicated_name = false;
  var required = false;




$scope.current_user = userFactory.getCurrentUser();
$scope.user = userFactory.getIt();

  userFactory.getUsers(function(data){
  //  console.log(data);
    $scope.users = data;
    $scope.username = $localStorage.username;
  });

  $scope.addUser = function(){
    //console.log($scope.new_user);

    if(!$scope.new_user){
      required = true;
      $scope.error = "This field is required.";
      console.log("$scope.error:", $scope.error);
    } else {
    //console.log($scope.users);
    for(var i in $scope.users) {
            if($scope.new_user.name === $scope.users[i].name) {
              console.log('true');
                duplicate_found = true;
                $scope.error = "There is already a user with that name.";
                console.log("$scope.error:", $scope.error);
            }
      }
    }
      if(!duplicated_name && !required){
        $localStorage.username = $scope.new_user.name;
         userFactory.usernme = $scope.new_user.name;
           $location.url('/dashboard');
          userFactory.addUser($scope.new_user, function (errors) {
           $scope.errors = errors;

           userFactory.username = $scope.new_user.name;
           userFactory.getUsers(function(data){
             $scope.users = data;
           });
        })

    }
    $scope.new_user = {};
  }


  $scope.logout = function(){
    userFactory.logout();
    $location.url('/')
  }


  ////////////////////////////////////////////////////////
  //                   bucket                           //
  ////////////////////////////////////////////////////////
 $scope.addBucket = function(){
   if ($scope.new_bucket.title && $scope.new_bucket.description) {
			if ($scope.new_bucket.user_id == $scope.current_user._id) {
				userFactory.addBucket($scope.new_bucket, function(data){
					$scope.buckets = data;
					$scope.new_bucket = {};
				});
			} else {
				userFactory.addBucket($scope.new_bucket, function(data){
					$scope.new_bucket.user_id = $scope.current_user._id;
          userFactory.addBucket($scope.new_bucket, function(data){
  					$scope.buckets = data;
            console.log($scope.buckets);
  					$scope.new_bucket = {};
					});
				});
			}
	}
 }
//console.log($scope);
 // userFactory.showBuckets($scope.current_user._id, function(data){
 //   $scope.bukctes = data;
 // })

 $scope.Check = function(id) {
   console.log(id);
		info = {_id: id, userid: $scope.current_user._id};
		userFactory.Check(info, function(data) {
			$scope.buckets = data;
		})
	}

  $scope.goHome = function(id){
    userFactory.goHome(id , function(output){
      $scope.user = output;
      $localStorage.user = output;
    });
    $location.url('/user/'+id);
  }




});
