console.log('background running')


var login = function(){
	jQuery.ajax({
	  type: "POST",
	  url: "https://salty-inlet-9116.herokuapp.com/login_json/",

	  data : {'username': 'ben', 'password': '1'},
	  dataType: 'json',
	}) 
	
	.error(function(err){
		console.log('error' + err);

	})
.success(function( data ) {
		
		console.log('success ! data: ' + data.user);
		  });
}();

var select_goal = function(){
	jQuery.ajax({
	  type: "POST",
	  url: "https://salty-inlet-9116.herokuapp.com/select_goal/",

	  data : {},
	  dataType: 'json',
	}) 
	
	.error(function(err){
		console.log('error' + err);

	})
.success(function( data ) {
		
		console.log('success ! data: ' + data.user);
		console.log('msg: ' + data.msg)
		  });
}();

setInterval(login, 3000)
