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




document.addEventListener('DOMContentLoaded', function () {
	// // alert('from event listener');
	// moocbGenerator.testFunction()
	data = chrome.extension.getBackgroundPage().data
	if (data.userid && data.goalid){
		$('form').remove()
		$('.user_content').append('<h1>You are logged in </h1>');
		$('.user_content').append('<h1> User Id: ' +data.userid +   '</h1>');

		$('.user_content').append('<h1> Goal Id :' +data.goalid +   '</h1>');
	}

	else{


	$(' button#login ').click( function(){
		username =  $('[name="username"]').val();
		password = $('[name="password"]').val();
		$('h1').text('')
		chrome.extension.getBackgroundPage().login(username, password)
		//login()
	});


	}
	$('h1').css("color", "#A3A3F3");




});




