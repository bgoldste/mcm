console.log('background running')

var data = {};
console.log('data = ')
console.log(data);

chrome.storage.sync.get(['userid', 'goalid'], function(result){
	console.log('checking for info in storage       ' + typeof result.userid)
	

	if (result.userid === undefined) {
		console.log('user id not found in storage, starting login')
		// chrome.tabs.create({url:"popup.html"});
		//login()
	}
	else {
		console.log('updating local var from storage');
		data.goalid = result.goalid;
		data.userid = result.userid;
	}
});





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
			
			console.log('success ! data: ' + 'userid ' +  response.userid + 'data goal ' + response.goals[0].id);

			if(response.userid && response.goals[0].id){
				alert('storing data.userid! ' + response.userid + 'data goal ' + response.goals[0].id);
				chrome.storage.sync.set({'userid': response.userid, 'goalid': response.goals[0].id}, function() {
			          // Notify that we saved.
			          console.log('storing userid and goal');
			    });
			    data.userid = response.userid;
			    data.goalid = response.goals[0].id;


			}
			else if (data.userid){
				alert("no  goal!");
				chrome.storage.sync.set({'userid': data.userid}, function() {
			          // Notify that we saved.
			          console.log('only able to store userid');
			         
			    });
			}
			else{
				alert('no goal or uid found');
				console.log('nothing saved');
			}
			



	});
};


// var login = function(){
// 	jQuery.ajax({
// 	  type: "POST",
// 	  url: "https://salty-inlet-9116.herokuapp.com/login_json/",

// 	  data : {'username': 'ben', 'password': '1'},
// 	  dataType: 'json',
// 	}) 
	
// 	.error(function(err){
// 		console.log('error' + err);

// 	})
// .success(function( data ) {
		
// 		console.log('success ! data: ' + data.user);
// 		  });
// }();

// var select_goal = function(){
// 	jQuery.ajax({
// 	  type: "POST",
// 	  url: "https://salty-inlet-9116.herokuapp.com/select_goal/",

// 	  data : {},
// 	  dataType: 'json',
// 	}) 
	
// 	.error(function(err){
// 		console.log('error' + err);

// 	})
// .success(function( data ) {
		
// 		console.log('success ! data: ' + data.user);
// 		console.log('msg: ' + data.msg)
// 		  });
// }();

