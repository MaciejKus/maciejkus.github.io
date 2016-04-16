function calc() {
  var money = parseInt(document.getElementById('money').value);
  document.getElementById('vti').innerHTML = money *.5;
  document.getElementById('vxus').innerHTML = money *.25;
  document.getElementById('vwo').innerHTML = money *.05;
  document.getElementById('bsv').innerHTML = money *.08;
  document.getElementById('vcsh').innerHTML = money *.02;

};
