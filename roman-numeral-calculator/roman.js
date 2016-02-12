var num  = document.getElementById('num');
num.onchange = function() {
  var value = this.value;
  //remove nondigits
  value = value.replace(/\D/g, "");
  document.getElementById('roman').innerHTML = toRoman(value);
}

function toRoman(n) {
  var rA = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  var dA = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

  var ans = '';
  for( var x = 0, y = rA.length; x < y; x++) {
    while(n >= dA[x]) {
      n -= dA[x];
      ans = ans + rA[x];
    }
  }
  return ans;
}

