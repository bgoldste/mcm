// var moocbGenerator = {

// 	testFunction: function(){
		

// 		chrome.storage.sync.get(['userid','goalid'], function(result){
// 				console.log('printing from retrieved_value ' + result.goalid + "     user:   " + result.userid);
// 				// alert('user id :' + result.userid);
// 				// alert('goalid :' + result.goalid);
// 			})

// 		// alert('user id :' + result.userid);
// 		// alert('goalid :' + result.goalid);

// 	}
// };




document.addEventListener('DOMContentLoaded', function() {
	state = chrome.extension.getBackgroundPage().state;
	data = chrome.extension.getBackgroundPage().data;
	console.log(state);
	if(state === 'not_logged_in' || state === undefined){
		$('h1').css("color", "red");
		$(' button#login ').click( function(){
			username =  $('[name="username"]').val();
			password = $('[name="password"]').val();
			chrome.extension.getBackgroundPage().login(username, password);	
		});

	}


	if(state === 'submit_time'){
		$('form').hide();
		$('.user_content').append('<h1>Submit your time of : ' + data.elapsedTime + '!</h1>');

	}





	if(state === 'logged_in'){
		$('h1').css("color", "blue");
		$('form').hide();
		$('.user_content').append('<h1>You are logged in </h1>');
		$('.user_content').append('<h1> User Id: ' +data.userid +   '</h1>');

		$('.user_content').append('<h1> Goal Id :' +data.goalid +   '</h1>');

		if(data.startTime){
			//now = new Date() 
			$('.timer').append('<h3 id = "elapsed"> Elapsed Time: seconds </h3>');
			setInterval(function(){ 
				elapsedTime = (new Date()- data.startTime)/1000; 

				$('#elapsed').html('Elapsed Time: ' + elapsedTime + ' seconds');
			}, 200);



			$('.timer').append('<button id="submitTime">Submit your time</button>');
			$('#submitTime').click(function(){
				console.log('submitting time ' + elapsedTime);
				chrome.extension.getBackgroundPage().submitTime(elapsedTime);
			})

		}
		else{
			$('.timer').append('<button id = "timer">Start Time</button');
			$('#timer').click(function(){
				chrome.extension.getBackgroundPage().startTimer();
			});
		}

		$('.user_content').append('<a id= "logout" href = "">logout</a>');
		$('#logout').click(function(){
			chrome.extension.getBackgroundPage().logout();
		});
	}





	// // alert('from event listener');
	// // moocbGenerator.testFunction()
	// console.log('getting data from background now');
	// data = chrome.extension.getBackgroundPage().data


	// if (data.userid && data.goalid > 0 ){
	// 	//window.location.href='popup.html';
	// 	$('form').remove()
	// 	$('.user_content').append('<h1>You are logged in </h1>');
	// 	$('.user_content').append('<h1> User Id: ' +data.userid +   '</h1>');

	// 	$('.user_content').append('<h1> Goal Id :' +data.goalid +   '</h1>');
	// 	$('.user_content').append('<a id= "logout" href = "">logout</a>');
	// 	$('#logout').click(function(){
	// 		var logoutCallback = function() {
	// 			console.log('running logout call back');
	// 			chrome.extension.getBackgroundPage().data = {};
	// 			//setTimeout(function(){window.location.reload();}, 700);
				
	// 		}();

	// 	})
	// }	

	// else{


	// $(' button#login ').click( function(){
	// 	username =  $('[name="username"]').val();
	// 	password = $('[name="password"]').val();
	// 	$('h1').text('')
	// 	console.log('running login');
	// 	$('.user_content').append('<h1>You are logged in </h1>');
	// 	$('.user_content').append('<h1> User Id: ' +data.userid +   '</h1>');

	// 	$('.user_content').append('<h1> Goal Id :' +data.goalid +   '</h1>');
	// 	$('.user_content').append('<a id= "logout" href = "">logout</a>');
	// 	var login2 = function(callback){
	// 		chrome.extension.getBackgroundPage().login(username, password);
	// 		callback()
	// 	};
	// 	var loginCallback = function() {
	// 		console.log('running login call back');
	// 		//chrome.extension.getBackgroundPage().login(username, password);
	// 		$('form').hide()
	// 		window.location.reload();
			
	// 	};
	// 	login2(loginCallback);
	// 	console.log('finished login');
		
	// });


	// }
	// $('h1').css("color", "#A3A3F3");




});




