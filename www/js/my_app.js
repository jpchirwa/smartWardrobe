// Initialize app
var myApp = new Framework7({
    material: true
});
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


var myDB = null;


var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
var view2 = myApp.addView('#profile');
var view3 = myApp.addView('#roster');

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
	window.open = cordova.InAppBrowser.open;
	myDB = window.sqlitePlugin.openDatabase({name: "rl.db", location: 'default'});
	
myDB.transaction(function(transaction) {
	transaction.executeSql('DROP TABLE IF EXISTS users');
	transaction.executeSql('CREATE TABLE IF NOT EXISTS users (name,pin,pic VARCHAR(65635))', [],
		function(transaction, result) {
		console.log("The Table created successfully");
	},
	function(error) {
	console.log("Error occurred while creating the table.");
	});
});
	
	myDB.transaction(function(transaction) {
	//var usernames = ["john","jack","mary"];
	//var pins = [123,124,125];

	var emp="Halima";
    var emppin = 1234;
	var pic = "http://www.itb.ie/StudyatITB/images/Kyle_000.jpg";
	
	transaction.executeSql('INSERT INTO users VALUES (?,?,?)', [emp,emppin,pic]);
  }, function(error) {
    alert('Transaction ERROR: ' + error.message);
  }, function() {
    alert('Welcome');
});
})
function add() {
    window.open = cordova.InAppBrowser.open;
    myDB = window.sqlitePlugin.openDatabase({ name: "smartwardrobe.db", location: 'default' });

    myDB.transaction(function (transaction) {
        transaction.executeSql('DROP TABLE IF EXISTS closet');
        transaction.executeSql('CREATE TABLE IF NOT EXISTS closet (shirt VARCHAR(65635),dress VARCHAR(65635),accessories VARCHAR(65635),shoes VARCHAR(65635))', [],
            function (transaction, result) {
                alert("Closet database created");
            },
            function (error) {
                alert("Error occurred while creating the table.");
            });
    });

    myDB.transaction(function (transaction) {
        //var usernames = ["john","jack","mary"];
        //var pins = [123,124,125];

        var shirt = "shirt";
        var dress = "dress";
        var accessories = "accessories";
        var shoes = "shoes";

        transaction.executeSql('INSERT INTO closet VALUES (?,?,?,?)', [shirt, dress, accessories, shoes]);
    }, function (error) {
        alert('Transaction ERROR: ' + error.message);
    }, function () {
        alert('Welcome');
    });
}
$$('.form-from-data').on('click', function(){
	 
	var time = new Date();
	myDB.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM users', [], function(transaction, rs) {
		var fname = document.getElementById("username").value;
        var fpin =  document.getElementById("password").value;
		var len = rs.rows.length;
		var uname = len.fname;
        var pasw= len.fpin;
		var formData = myApp.formToJSON('#my-form');
                    if(len>0)
                    {
                        for (var i = 0; i < len; i++) 
                        {
							if(fname == rs.rows.item(i)['name'] && fpin == rs.rows.item(i)['pin']){
								
							
								if(time.getHours()>=12 && time.getHours()<18){
								alert("Goodafternoon \t\n" + fname);
								myApp.closeModal();
								}
								if(time.getHours()>=18 && time.getHours()<24){
								alert("Evening \t\n" + fname);
								myApp.closeModal();
								}
								else{
								alert("Goodmorning \t\n" + fname);
								myApp.closeModal();
								}
							}else{
								alert('wrong username or password');
								window.location.reload(true);
							}
      //alert('usernames: ' + rs.rows.item(i)['name'] + '\n' + 'pins: ' + rs.rows.item(i)['pin'] + '\n' + rs.rows.item(i)['pic'] + '\n');
	  var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
};
var sos = rs.rows.item(i)['pic'];
img.src = sos;
						}
					}
    }, function(transaction, error) {
      alert('SELECT error: ' + error.message);
    });
 
});
}); 
function database() {
    add();
    alert("Terms & Conditions By uploading and applying your Image, you warrant and represent that you own or otherwise control all of the rights to your Image, including all the rights necessary for you to provide, post, upload, input or submit the Image, and to transfer all such rights to Z Palette.");
}