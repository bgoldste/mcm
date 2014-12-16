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
	data = {};
	state = 'not_logged_in';
	chrome.storage.sync.set({'state': 'not_logged_in', 'data': {}})
};



var startTimer = function  () {
	if (data.startTime === undefined){
		startTime = new Date();
		data.startTime = startTime;
		chrome.storage.sync.set({'startTime': data.startTime});
		refreshPopup();
	}
};



var submitTime = function(elapsedTime){
	state = 'submit_time';
	data.elapsedTime = elapsedTime;
	chrome.storage.sync.set({'elapsedTime': data.startTime, 'state': 'submit_time'});
	refreshPopup();


};




var refreshPopup = function() {
    for (var i = 0; i < chrome.extension.getViews().length; i++){
	    if(chrome.extension.getViews()[i].location.href != window.location.href){
	   		chrome.extension.getViews()[i].location.reload();
		}
	}

}




var login = function(username, password){
	//example response
	//{"msg": "success!",
	//  "userid": 1,
	//   "user": "ben", 
	//   "goals": [{"name": "ads", "id": 1}]
	// }

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
			
			//console.log('success ! data: ' + 'userid ' +  response.userid + 'data goal ' + response.goals[0].id);
			if(response.userid && response.goals[0].id){
				console.log('storing data.userid! ' + response.userid + 'data goal ' + response.goals[0].id);
				// chrome.storage.sync.set({'userid': response.userid, 'goalid': response.goals[0].id}, function() {
			 //          // Notify that we saved.
			 //          console.log('storing userid and goal');
			 //    });
			    data.userid = response.userid;
			    data.goalid = response.goals[0].id;
			    state = 'logged_in';
			    chrome.storage.sync.set({'state': 'logged_in', 'data': {'userid': response.userid, 'goalid': response.goals[0].id}})
			    refreshPopup();
			}
			else if (data.userid){
				console.log("no  goal!");
				
			}
			else{
				console.log('no goal or uid found');
				console.log('nothing saved');
			}
			



	});
};
