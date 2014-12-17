console.log('background running')


//initialize data and state by calling from storage, and setting to defaults if not found.
var data; 

var state;

var startTime;

chrome.storage.sync.get(['state', 'data', 'startTime'], function(result){
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

	if(result.startTime){
		startTime = result.startTime;
	}
	else{
		startTime = new Date();
	}


});



var logout = function(){
	resetStartTime();
	data = {};
	state = 'not_logged_in';
	chrome.storage.sync.set({'state': 'not_logged_in', 'data': {} },
			refreshPopup()
		);
	
};


var resetStartTime = function(){
	startTime = new Date();
	data.startTime = startTime;
	chrome.storage.sync.set({'startTime': data.startTime});

}




var startTimer = function  () {
	console.log('running start');
	if (data.startTime === undefined){
		state = 'in_class';
		resetStartTime();
		refreshPopup();
		goToClass();
	}
};


var submitTime = function(elapsedTime){
	state = 'submit_time';
	data.elapsedTime = elapsedTime;
	chrome.storage.sync.set({'elapsedTime': data.startTime, 'state': 'submit_time'},
		refreshPopup
		);
};




var refreshPopup = function() {
    for (var i = 0; i < chrome.extension.getViews().length; i++){
	    if(chrome.extension.getViews()[i].location.href != window.location.href){
	   		chrome.extension.getViews()[i].location.reload();
		}
	}
}


var goToClass = function(){
	var createProperties = {'url': data.goal.url};
	chrome.tabs.create(createProperties);

};

var updateTimeWorked = function(timeWorked){
	data.goal.time_worked = timeWorked;
}


var addTime = function(){ 
	//arbitrary time so that you don't add crazy amount of time (tho this would still be crazy)
	if(data.userid && data.goal.id){
		if(startTime.valueOf() > 1357002000){
			console.log('time found, running add user')
			var timeToAdd = new Date() - startTime;
			var url = ("https://salty-inlet-9116.herokuapp.com/add/?user=" + data.userid + "&time=" + timeToAdd + '&goal=' + data.goal.id)
			console.log(url);
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
				resetStartTime();
				updateTimeWorked(responseData.new_goal_time);
				console.log('time worked updated to ' + responseData.new_goal_time);


				
			});

		}
		else{
			resetStartTime();
			addTime();
			console.log('no start time found, resetting and addign!');
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



