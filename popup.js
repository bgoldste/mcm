

document.addEventListener('DOMContentLoaded', function() {


	state = chrome.extension.getBackgroundPage().state;
	data = chrome.extension.getBackgroundPage().data;
	
	console.log(state);
	console.log(data);
	if(state === 'not_logged_in' || state === undefined){
		$('h1').css("color", "green");
		$(' button#login ').click( function(){
			username =  $('[name="username"]').val();
			password = $('[name="password"]').val();
			chrome.extension.getBackgroundPage().login(username, password);	
			$('h1').append('<h2> Loading!</h2>');
		});


	}


	// if(state === 'submit_time'){
	// 	$('form').hide();
	// 	$('.user_content').append('<h1>Submit your time of : ' + data.elapsedTime + '!</h1>');
	// 	$('.user_content').append('<a id= "logout" href = "">logout</a>');
	// 	$('#logout').click(function(){
	// 		chrome.extension.getBackgroundPage().logout();
	// 	});
	// }

	else if(state === 'in_class'){
		$('form').hide();
		if(data.startTime){
			//now = new Date() 
			$('p').text("You're in class now, get to work!");
			$('.timer').append('<h3 id = "elapsed"> Elapsed Time: seconds </h3>');
			setInterval(function(){ 
				elapsedTime = (new Date() - data.startTime)/1000; 
				chrome.extension.getBackgroundPage().checkGoalIsActive();
				$('#elapsed').html('Elapsed Time: ' + elapsedTime + ' seconds');

			}, 200);



			$('.timer').append('<button id="submitTime">Submit your time</button>');
			$('#submitTime').click(function(){
				console.log('submitting time ' + elapsedTime);
				chrome.extension.getBackgroundPage().addTime();
			});
		}
	}





	else if(state === 'logged_in'){
		$('h1').css("color", "blue");
		$('form').hide();

		$('.user_content').append('<h1>You are logged in </h1>');
		$('.user_content').append('<ul class = "userinfo"></ul>');
			$('.userinfo').append('<li> user: ' +  data.user       + '</li>');
			$('.userinfo').append('<li> goal name: ' +  data.goal.name       + '</li>');
			$('.userinfo').append('<li> date started: ' +  data.goal.start_date      + '</li>');
			//$('.userinfo').append('<li> end date: ' +  data.goal.       + '</li>');
			$('.userinfo').append('<li> total time completed: ' +  data.goal.time_worked       + '</li>');
			$('.userinfo').append('<li> time goal: ' +  data.goal.time_goal      + '</li>');
			$('.userinfo').append('<li> url: ' +  data.goal.url       + '</li>');


		if(data.startTime){
			//now = new Date() 
			$('.timer').append('<h3 id = "elapsed"> Elapsed Time: seconds </h3>');
			setInterval(function(){ 
				elapsedTime = (new Date() - data.startTime)/1000; 

				$('#elapsed').html('Elapsed Time: ' + elapsedTime + ' seconds');
			}, 200);



			$('.timer').append('<button id="submitTime">Submit your time</button>');
			$('#submitTime').click(function(){
				console.log('submitting time ' + elapsedTime);
				chrome.extension.getBackgroundPage().addTime();
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
});




