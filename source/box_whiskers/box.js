calc = function() {
  //box whiskers. maciejkus.com//
  //The math calculations ///
  var nums = document.getElementById('input').value;
  nums = nums.replace(/,/g, ' '); 
  nums = nums.replace(/\s\s+/g, ' ').trim();
  nums = nums.split(' ');
  nums = nums.map(function (x) {
    return parseInt(x);
  }).sort(numSort);
  function numSort(a,b) { return a - b; };

  var min = Math.min.apply(Math, nums); 
  var max = Math.max.apply(Math, nums); 
 
  var midtop, midbottom; //where to start and end  quartile calculations from
  function median(arr) {
    var len = arr.length;
    if (len % 2 !== 0) {
      midtop = Math.ceil(len / 2);
      midbottom = Math.floor(len/2);
      return arr[midbottom];
    } else {
      midtop = len/2;
      midbottom = len/2;
      return (arr[(len/2)-1] + arr[len/2])/2;
    }       
  } //end median()
 
  med = median(nums);
  var firstquartile, thirdquartile;

  function quarters(t,b) {
    thirdquartile = median(nums.slice(t));
    firstquartile = median(nums.slice(0,b));
  }
  quarters(midtop,midbottom);

  ////end of calculations///
   
  document.getElementById('numbers').innerHTML = nums;
  document.getElementById('minimum').innerHTML = min;
  document.getElementById('maximum').innerHTML = max;
  document.getElementById('median').innerHTML = med;
  document.getElementById('first').innerHTML = firstquartile;
  document.getElementById('third').innerHTML = thirdquartile;

  //draw canvas graph ///
 
  var c = document.getElementById('boxCanvas');
  var context = c.getContext('2d');
  context.clearRect(0, 0, c.width, c.height);
  context.beginPath();
  var unit = 400/max;
  context.moveTo(10,100);
  context.lineTo(410,100);
  context.strokeStyle = 'black';
  context.stroke();
  context.beginPath();
  context.rect(firstquartile*unit,50,(med-firstquartile)*unit,100);
  context.rect(med*unit,50,(thirdquartile-med)*unit,100);
  context.fillStyle="#fff";
  context.fill();
  context.stroke();
  context.font = '16px Ariel';
  context.fillStyle="#000";
  context.fillText(min,2,120);
  context.fillText(max,390,120);
  context.fillText(med,med*unit - 5,180);
  context.fillText(firstquartile,firstquartile*unit-5,40);
  context.fillText(thirdquartile,thirdquartile*unit-5,40);
} //end calc()
