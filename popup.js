

document.addEventListener('DOMContentLoaded', function() {


	state = chrome.extension.getBackgroundPage().state;
	data = chrome.extension.getBackgroundPage().data;
	totalTime =chrome.extension.getBackgroundPage().totalTime;
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




	else if(state === 'in_class'){
		chrome.extension.getBackgroundPage().keepTotalTime();
		$('form').hide();
		
		//now = new Date() 
		$('p').text("You're in class now, get to work!");
		$('.timer').append('<h3 id = "elapsed"> Elapsed Time: seconds </h3>');
		setInterval(function(){ 
			console.log('setint from in class popup')
			elapsedTime = totalTime; 
			chrome.extension.getBackgroundPage().checkGoalIsActive();
			$('#elapsed').html('Elapsed Time: ' + elapsedTime + ' seconds');

		}, 200);



		$('.timer').append('<button id="submitTime">Submit your time</button>');
		$('#submitTime').click(function(){
			console.log('submitting time ' + elapsedTime);
			alert('running addtime line 46');
			chrome.extension.getBackgroundPage().addTime();
		});
	
	}





	else if(state === 'logged_in'){
		$('h1').css("color", "blue");
		$('form').hide();
		// setInterval(function(){ 
				
		// 		chrome.extension.getBackgroundPage().checkGoalIsActive();
				
		// 	}, 500);

		$('.user_content').append('<h1>You are logged in </h1>');
		$('.user_content').append('<ul class = "userinfo"></ul>');
			$('.userinfo').append('<li> user: ' +  data.user       + '</li>');
			$('.userinfo').append('<li> goal name: ' +  data.goal.name       + '</li>');
			$('.userinfo').append('<li> date started: ' +  data.goal.start_date      + '</li>');
			//$('.userinfo').append('<li> end date: ' +  data.goal.       + '</li>');
			$('.userinfo').append('<li> total time completed: ' +  data.goal.time_worked       + '</li>');
			$('.userinfo').append('<li> time goal: ' +  data.goal.time_goal      + '</li>');
			$('.userinfo').append('<li> url: ' +  data.goal.url       + '</li>');




		if(totalTime > 0 ){
			//now = new Date() 
			$('.timer').append('<h3 id = "elapsed"> Elapsed Time: seconds </h3>');
			setInterval(function(){ 
				elapsedTime = totalTime; 

				$('#elapsed').html('Elapsed Time: ' + elapsedTime + ' seconds');
			}, 200);



			$('.timer').append('<button id="submitTime">Submit your time</button>');
			$('#submitTime').click(function(){
				console.log('submitting time ' + elapsedTime);
				alert('running addtime line 46');
				chrome.extension.getBackgroundPage().addTime();
			})

		}
		else{
			$('.timer').append('<button id = "timer">Start Time</button');
			$('#timer').click(function(){
				chrome.extension.getBackgroundPage().keepTotalTime();
				chrome.extension.getBackgroundPage().goToClass();
			});
		}

		$('.user_content').append('<a id= "logout" href = "">logout</a>');
		$('#logout').click(function(){
			chrome.extension.getBackgroundPage().logout();
		});


	}
});




