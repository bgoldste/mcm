console.log('background running')


//initialize data and state by calling from storage, and setting to defaults if not found.
var data; 

var state;

// var startTime;

var timer;

var totalTime;

var isActive;

//initialize variables based on call to storage
chrome.storage.sync.get(['state', 'data', 'totalTime'], function(result){
	if(result.state){
		state = result.state;
	}
	else{
		state = 'not_logged_in';
	}

	if(result.data){
		data = result.data;
	}
	else{
		data = {}
	}

	// if(result.startTime){
	// 	startTime = result.startTime;
	// }
	// else{
	// 	startTime = new Date();
	// }

	if(result.totalTime){
		totalTime = result.totalTime;
	}
	else{
		totalTime = 0;
	}
});


var logout = function(){
	//resetStartTime();
	resetTotalTime();
	data = {};
	state = 'not_logged_in';
	chrome.storage.sync.set({'state': 'not_logged_in', 'data': {} },
			refreshPopup()
		);
};


// var resetStartTime = function(){
// 	startTime = new Date();
// 	data.totalTime = startTime;
// 	chrome.storage.sync.set({'startTime': data.startTime});

// }

var resetTotalTime = function(){
	totalTime = 0;
	chrome.storage.sync.set({'totalTime': totalTime});
}


// var startTimer = function  () {
// 	console.log('running start');
// 	if (data.startTime === undefined){
// 		state = 'in_class';
// 		resetStartTime();
// 		//refreshPopup();
// 		goToClass();
// 	}
// };


// var submitTime = function(elapsedTime){
// 	state = 'submit_time';
// 	data.elapsedTime = elapsedTime;
// 	chrome.storage.sync.set({'elapsedTime': data.startTime, 'state': 'submit_time'},
// 		refreshPopup
// 		);
// };



var refreshPopup = function() {
    for (var i = 0; i < chrome.extension.getViews().length; i++){
	    if(chrome.extension.getViews()[i].location.href != window.location.href){
	   		chrome.extension.getViews()[i].location.reload();
		}
	}
}

//opens url in new tab
var goToClass = function(){
	var createProperties = {'url': data.goal.url};
	chrome.tabs.create(createProperties);
};


// var updateTimeWorked = function(timeWorked){
// 	data.goal.time_worked = timeWorked;
// }


var addTime = function(){ 
	//arbitrary time so that you don't add crazy amount of time (tho this would still be crazy)
	if(data.userid && data.goal.id){
		if(totalTime >= 1 ){
			console.log('adding time:', totalTime);
			var timeToAdd = totalTime;
			var url = ("https://salty-inlet-9116.herokuapp.com/add/?user=" + data.userid + "&time=" + timeToAdd + '&goal=' + data.goal.id)
			
			jQuery.ajax({  type: "POST",
				url: url,
				data : {'asda': 'asdsad'},
				dataType: 'json',
			}) 
			.error(function( data, err) {
				console.log(data);
				console.log(err);
			})
			.success(function( responseData ) {
				console.log('succesfully posted to add printing respones below');
				console.log(responseData);
				resetTotalTime();
				// updateTimeWorked(responseData.new_goal_time);
				// console.log('time worked updated to ' + responseData.new_goal_time);
				refreshPopup();

				
			});

		}
		//total time is less than 60
		else{
			
			//addTime();
			console.log('no start time found, resetting and addign! THIS SHOULD BE CHANGED');
		}

		state = 'logged_in';
		chrome.storage.sync.set({'state': 'logged_in'},
			refreshPopup
		);
	}
	else{
		logout();
	}
};


var login = function(username, password){
	logout();

	jQuery.ajax({
	  type: "POST",
	  url: "https://salty-inlet-9116.herokuapp.com/login_json/",
	  data : {'username': username, 'password': password},
	  dataType: 'json',
	}) 
	
	.error(function(err){
		console.log('error' + err);

	})
	//todo - change response to throw an error if it doesn't work (instead of in status)
	.success(function( response ) {
			
			if (response.status === 'success'){
			    state = 'logged_in';
			    data  = response;
			    chrome.storage.sync.set( {'state': 'logged_in', 'data': response },  refreshPopup); 
			    	
			}
			else{
				console.log('no goal or uid found');
				console.log('nothing saved');
			}
	});
};





var checkGoalIsActive = function () {
	console.log('checking if goal url is active');
	if (data.goal.url){
		
		chrome.tabs.query({active:true, highlighted:true, }, function(tabs){
			
			for (var i = 0; i < tabs.length; i++){
				if(data.goal.url === tabs[i].url){
					console.log('goal url tab is active');
					isActive = true;
					sendGoalState(isActive);
					return true;
				}
				console.log('tab is not active');
				isActive = false;
			}
			sendGoalState(isActive);
			return false;
		});

	}
	else{
		return false;
	}
};

var sendGoalState = function(goalState){
	console.log('sendgoal state' + goalState);
	console.log(goalState);
	if(goalState === true){
		//if not currently in class, set to in class and refresh
		keepTotalTime()
		if(state !== 'in_class'){
			state = 'in_class';
			refreshPopup();
		}	
	
	}
	else{
		// clearInterval(timer);
		// addTime();
		if (state !== 'logged_in'){
			state = 'logged_in';
			//refreshPopup();
		}
	}

};

var keepTotalTime = function(){
	//if timer is not started, start it
	if(timer === undefined){
		console.log('no timer found, starting time');
		timer = setInterval(function(){
			checkGoalIsActive()
			if (isActive === true ){
				console.log('active, incrementing');
				totalTime += 1;
			}
		}, 1000);
	}
	//if timer exists, check if active still
	else{
		console.log('timer found');

	}
};















