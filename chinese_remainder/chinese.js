//Chinese remainder theorem/ method of successive substitution calculator
//by Maciej Kus
//MaciejKus.com
function chinese() {
	var equations = document.getElementById("input").value;
	equations = equations.replace(/ /g, "");
	equations = equations.toLowerCase();
	equations = equations.split(/\n/);
	if (equations[equations.length-1]=="") {
		equations.pop();
	}
	var regmod = /mod([0-9]*)/,
	rega = /=([0-9]*)mod/
	mods = new Array(), // x = a mod b ; mods will be 'b' and as will be 'a'
	as = new Array();
	var length = equations.length; //makes things faster
	for (var i=0; i< length; i++) {
		//exec returns an array, the first value is the exact match, the second is only the parenthesis value. so we are itnerested in mods[i][1] which is just the number
		mods[i] = regmod.exec(equations[i]); //populate 'b' (remember it is mods[i]
		mods[i] = parseInt(mods[i][1]);
		as[i] = rega.exec(equations[i]); //populate 'a'
		as[i][1] = parseInt(as[i][1]);
	}//end for i in equatins	
	//Na[] is an array because the last value of NA is used to calculate current value of Na at one point. just references Na[i-1]	
	var Na = [as[0][1]];
	//Nb is really just the mods[i] all multiplied together
	var Nb = mods[0];
	for (var i=0; i< length; i++) {
		if (equations[(i+1)]) {
			var a = Na[i]-as[i+1][1];
			var b = mods[i+1]-Nb; // a-a=bx-bx
			// check to see if things are negative
			//if both are less than 0 can just cancle the negative
			while ((a<0) && (b>0)) {
				a += mods[i+1]; //add latest mod until positive
			} 
			while ((b<0) && (a>0)) {
				b = -b;
				a= -a;
				a += mods[i+1];
			}
			// change from two negatives to two positives
			if ((a<0) &&(b<0)) {
				a = -a;
				b = -b;
			}
			//add mod until able to divide by 'b' evenly, 1=2b needs to have mod added 1 one until divisable by 2.
			var x = 0;
			//some problems are not possible?
			while ((a%b!=0)) {
				a += mods[i+1];
				if ( x > 800) { 
					document.getElementById('answer').innerHTML = "This looks to have no solutions";
					return;}
				x++;
			}
			Na[i+1] = a/b;
			Na[i+1] = Na[i+1] * Nb + Na[i]; //Why Na needed to be array
			Nb = mods[i+1]*Nb;
	
		} else {
			
			//remember Na is an array
			var answer = Na[Na.length-1];
			var least_common = LCM(mods);
			//makes sure answer is smallest positive number:
			while ((answer-least_common) > 0 ){
				answer = answer - least_common;
			}
			document.getElementById('answer').innerHTML = answer;
			var solution = "";
			for (var i =0; i < mods.length; i++) {
				solution += "(" +answer+ "-"+ as[i][1] +")/" + mods[i] + " = " + ((answer-as[i][1])/mods[i]) + "<br>"; 
			}
			document.getElementById('check').innerHTML = solution;
			document.getElementById('lcm').innerHTML = least_common +".";
		}
	}

}

function LCM(A)  // A is an integer array (e.g. [-50,25,-45,-18,90,447])
{   
    var n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var b = Math.abs(A[i]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; } 
       a = Math.abs(c*A[i])/(a+b);
     }
    return a;
}


