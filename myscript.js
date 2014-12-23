// count = 0;
// var add_time = function() {

// 	var current_mooc = {};
// 	console.log('running from myscript');
// 	current_mooc.current_status = "ranndom thing";

// 	jQuery.ajax({
// 	  type: "POST",
// 	  url: "https://salty-inlet-9116.herokuapp.com/add/?user=1&time=50&goal=3",
// 	  data : {'asda': 'asdsad'},
// 	  dataType: 'json',
// 	}) 
	
// 	.error(function(err){
// 		console.log('error' + err);

// 	})
// .success(function( data ) {
		
// 		console.log('success ! data' + data.goal);
// 		data2 = data;
// 		console.log(data2);
// 		count++;
//   })
// };

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








// // setInterval(function(){console.log('from intdata2 :' + count)}, 4000)


// console.log('background running');

// var login = function(){
// 	//example response
// 	//{"msg": "success!",
// 	//  "userid": 1,
// 	//   "user": "ben", 
// 	//   "goals": [{"name": "ads", "id": 1}]
// 	// }
// 	jQuery.ajax({
// 	  type: "POST",
// 	  url: "https://salty-inlet-9116.herokuapp.com/login_json/",

// 	  data : {'username': 'ben', 'password': '1'},
// 	  dataType: 'json',
// 	}) 
	
// 	.error(function(err){
// 		console.log('error' + err);

// 	})
// 	.success(function( data ) {
			
// 			console.log('success ! data: ' + 'userid ' +  data.userid + 'data goal ' + data.goals[0].id);

// 			if(data.userid && data.goals[0].id){
// 				alert('storing data.userid! ' + data.userid + 'data goal ' + data.goals[0].id);
// 				chrome.storage.sync.set({'userid': data.userid, 'goalid': data.goals[0].id}, function() {
// 			          // Notify that we saved.
// 			          console.log('storing userid and goal');
			         
// 			    });

// 			}
// 			else if (data.userid){
// 				alert("no  goal!");
// 				chrome.storage.sync.set({'userid': data.userid}, function() {
// 			          // Notify that we saved.
// 			          console.log('only able to store userid');
			         
// 			    });
// 			}
// 			else{
// 				alert('no goal or uid found');
// 				console.log('nothing saved');
// 			}
			



// 	});
// };

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
// };

// var main = function(){
// 	login();
// 	select_goal();
// 	chrome.storage.sync.set({'value1': 'theValue'}, function() {
//           // Notify that we saved.
//           console.log('message saved')
//           message('Settings saved');
//         });
// 	retrieved_value = chrome.storage.sync.get('value1', function(result){
// 		console.log('printing from retrieved_value');
// 		console.log(result.value1);
// 	})

// };





// $(document).ready(function(){
// 	alert('running login')
// 	//login()
// 	alert('login complete now getting from storage')



// 	chrome.storage.sync.get(['userid','goalid'], function(result){
// 		console.log('printing from retrieved_value');
// 		console.log('user id :' + result.userid);
// 		console.log('goalid :' + result.goalid);
// 	})




// });

