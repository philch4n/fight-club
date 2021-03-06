'use strict';

angular.module('myApp')

	.controller("chatCtrl", ['$location', '$scope', '$rootScope', '$cookies', 'Chat', function($location,$scope, $rootScope, $cookies, Chat){
	  	$scope.chatroom = {};
	  	$scope.chatroom.chats = [];
	  	$rootScope.messages = [
	      "The supreme art of war is to subdue the enemy without fighting",
	      "70% of statistics don't need sources",
	      "Remember: If their opinion is different, it's wrong.",
	      "U WOT M8?!",
	      "Rule #3: Please refer back to rule 1",
	      "Freedom is hammered out on the anvil of discussion, dissent, and debate",
	      "Sometimes by losing a battle you find a new way to win the war",
	      "The opposite of a correct statement is a false statement. But the opposite of a profound truth may well be another profound truth",
	      "For good ideas and true innovation, you need human interaction, conflict, argument, debate",
	      "Deliberation and debate is the way you stir the soul of our democracy",
	      "Debate and divergence of views can only enrich our history and culture",
	      "It is never smart, even in a strong democracy, to declare some debate off limits",
	      "You can choose to not let little things upset you",
	      "To be offended is a choice we make; it is not a condition inflicted or imposed upon us by someone or something else",
	      "There is no such thing as an impartial jury because there are no impartial people. There are people that argue on the web for hours about who their favorite character on 'Friends' is",
	      "Fear not those who argue but those who dodge"
	  	];
	  	$rootScope.randoMessage;
	  	var name = $cookies.get('myUsername')
	  	var session = $cookies.get('myCookie')
	  	var room = 'thisroom';

		$rootScope.random = function(){
			var rando = Math.round(Math.random() * $rootScope.messages.length - 1)
			$rootScope.randoMessage = $rootScope.messages[rando];
	    	$scope.checkLogin();
		}
	  	$scope.chatroom.postChat = function(message){
	  		var chat = {
	  			username: name,
	  			room: room,
	  			message: message
	  		}
	  		Chat.postChat(chat)
	  		$scope.chatroom.chats.push({
	  			username: name,
	  			message: message
	  		});
	  		$scope.chatroom.fetchChats(room);
	  		$scope.chatroom.message = "";
	  	};


	  	$scope.chatroom.fetchChats = function(room){
	  		Chat.fetchChatLog(room)
	  		.then(function(chatobj){
	  			console.log('chatobj retrieved=====', chatobj)
	  		})
	  		.catch(function(err){
	  			console.log('Error in fetch =====', err)
	  		})

	  		//in then => if chatobj with that id and not the username from the cookie 
	  		//does not exist in array , push to array
	  		//post to db instead of array?

	  	};

	  	// setInetrval(function(){
	  	// 	$scope.chatroom.fetchChats(room);
	  	// }, 3000);

		$rootScope.signout = function(){
			$cookies.remove('myCookie')
			$cookies.remove('myUsername')
			$location.path('/')
		}
		$scope.checkLogin = function(){
		  // check if they are logged in, if not redirect to main page
		  if($cookies.get('myCookie')){
		    return false;
		  }else{
		    $location.path('/')
		  }
		}
		$rootScope.random();
		$scope.checkLogin();
	}]);





