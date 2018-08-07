const USERKEY = "USERONLINE";
const PLATEKEY = "LICENSEPLATE";

function test() {
	alert("TEST-ALERT");
	//window.location.href="http://www.w3schools.com";
}


function switchPage(newSite) {
	setTimeout(function(){
		document.location.href = newSite;
	},10);
}

//Confirm Login-Data
function validate() {
	var licensePlate = document.getElementById("licensePlate").value;
	var password = document.getElementById("password").value;
	
	if (validateUser(licensePlate,password)==true) {
		//alert(window.location.href);
		//does not work
		setLicensePlate(licensePlate);
		switchPage("index.html");
	} else {
		alert("Password or license plate is not correct!");
	}
	
}

//validateUser-Password Combo via Information from MongoDB
function validateUser(lp, pw) {
	if(lp!="") {
		return true;
	} else {
		return false;
	}
}



function setUser(user) {
	//find automatically via unique lincense plate
	localStorage.setItem(USERKEY,user);
}

function getUser() {
	return localStorage.getItem(USERKEY);
}


//Remember LICENSEPLATE (Login)
function setLicensePlate(lp) {
	localStorage.setItem(PLATEKEY,lp);
}

function getLicensePlate() {
	return localStorage.getItem(PLATEKEY);
}

//checks whether or not a user is logged in
function loggedIn() {
	if(localStorage.getItem(PLATEKEY)!=null) {
		return true;
	} else {
		return false;
	}
}

function logOut() {
	localStorage.removeItem(PLATEKEY);
}

//switch pages if user not logged in
function findPage() {
	if(loggedIn()==false) {
		switchPage("login.html");
		//alert("NOONE THERE"); 
	} else {
		setFields();
	}	
}

//return licensePlate if user logged in
function getLoggedLP() {
	if(loggedIn()==true) {
		return getLicensePlate();
	} else {
		return "NO LICENSE PLATE IS LOGGED IN";
	}
}

//Check if index.html with old user is still opened
function checkUser() {
	document.addEventListener("visibilitychange", function() {
		console.log( document.visibilityState );
		if(document.visibilityState=="visible") {
			var textInSite = document.getElementById("LicensePlate").innerHTML;
			if(textInSite!=getLicensePlate()) {
				alert("License Plate " + getLicensePlate() + " is logged in\n" + textInSite + " was logged out!");
				//switchPage("login.html");
				location.reload();
			}
		}
	});
}

//dynamically add new text fields (for registration)
function addInput(inp, num) {
	if(inp.value=="") {
		/*if(document.getElementById("lp"+(num+1))!=null && num!=1) {
			document.getElementById("lp"+(num)).outerHTML="";
			document.getElementById("lp"+(num+1)).setAttribute("placeholder","license plate #" + num);
		}*/
	} else {
		
		var container = document.getElementById("lps");
		//var newNum = container.childNodes.length -1;
		var newNum=num+1;
		if(document.getElementById("lp" + newNum)==null && inp.value.length>0 && newNum<=3) {
			var elem = document.createElement("input");
			elem.setAttribute("type","text");
			elem.setAttribute("id","lp" + newNum);
			elem.setAttribute("placeholder","license plate #" + newNum);
			elem.setAttribute("onchange","addInput(this," + newNum + ")");
			//referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			//doucment.getElementByClassName("register-form").insertBefore(elem,inp.nextSibling);
			//inp.insertBefore(elem,inp.nextSibling);
			container.appendChild(elem);
		}
	}
	
}

//Set Fields for logged in user
function setFields() {
	document.getElementById("LicensePlate").innerHTML = getLicensePlate();
}

//register new user in database
function registerUser() {
	alert("User was successfully registered, you can now log in");
	
}

