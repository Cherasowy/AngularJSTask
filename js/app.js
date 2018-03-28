(function(){

	var app = angular.module('myApp',[]);

	app.controller('MyController',function($scope, $http){
		//variable used to control view of Edit Selected and Submit All buttons
    $scope.editAll = false;
		//getData from users.json file and put it in $scope.people
		$http({
      method: 'GET',
      url: 'users.json'
    }).then(function(success){
      $scope.people = success.data;

    },function(error){
      console.log(error);
    });
		//delete chosen person from people
		$scope.del = function(id){
			var index = getIndex(id);
			$scope.people.splice(index,1);
		};
		//edit person's data
		$scope.edit = function(id){
			var index = getIndex(id);
			$scope.people[index].editMode = true;
		};
		//submit changes
		$scope.submit = function(id){
			var index = getIndex(id);
			$scope.people[index].editMode = false;
		};
		//submit all people data
    $scope.submitAll = function(){
      for( var i = 0; i < $scope.people.length; i++){
			  $scope.submit($scope.people[i].id);
			}
      $scope.editAll = false;
    }
		//edit selected people
		$scope.editSelected = function(){
			for( var i = 0; i < $scope.people.length; i++){
				//if true edit
				if($scope.people[i].checkbox === true){
					$scope.edit($scope.people[i].id);
          $scope.editAll = true;
				}
				//else submit
				else if ($scope.people[i].checkbox === false) {
					$scope.submit($scope.people[i].id);
				}
			}
		}
		//help function to get position in people array(in case of deleting someone or adding unordered id)
		function getIndex(id){
			for( var i = 0; i < $scope.people.length; i++){
				if($scope.people[i].id === id){
					return i;
				}
			}
		};
	});




})();
