function event1()                                   
{
    var n1 = document.forms["hackbuzz-form"]["team"]; 
	// var n2 = document.forms["signupform"]["inp2"]; 
	// var n3 = document.forms["signupform"]["inp3"]; 
	// var n4 = document.forms["signupform"]["inp4"];
    // var n5 = document.forms["signupform"]["inp5"];

    if(n1.value=="gokul"){
        window.alert("Some fields are empty");
		return false;
    }

    // else if(n2.value<18){
    //     window.alert("Age is underlimit")
    //     return false;
    // }
    
    // else{
    //     window.open('success.html');
    // }
}