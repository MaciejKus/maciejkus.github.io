angular.module('baseball.controllers', []).
controller('baseballController', function($scope) {
  var actionPoss = ['High','Middle','Low']; 
  var outs = 0;
  var strikes = 0;
  var score = {home: 0, away:0};
  $scope.homeScore = score.home;
  $scope.awayScore = score.away;
  $scope.curTeamAction = 'Swing';
  $scope.otherTeamAction = 'Pitch';
  var curTeam = 'home';
  $scope.curTeam = curTeam;
  var bases = [0,0,0];
  var hitPoss = ['Single', 'Double', 'Triple', 'Homerun'];
  $scope.gameInfo = 'Play Ball!';

  $scope.action = function(homeAction) {
    var awayAction = actionPoss[Math.floor(Math.random()*actionPoss.length)]; 
    var result = 'Strike';
    $scope.pitch = awayAction;
    $scope.wasHit = '';
    if(homeAction === awayAction) {
      $scope.wasHit = 'Hit!';
      //swinging low or high gives two possibilities
      //for the high the lower will be taken
      //meaning that a high hit is more likely to lead to a single
      //while a low hit takes the higher value meaning
      //a homerun is more likely and single less likely
      var chance1 = Math.floor(Math.random()*hitPoss.length);
      var chance2 = Math.floor(Math.random()*hitPoss.length);
      if(homeAction === 'Low' && Math.random() < 0.4) {
         result = chance1 > chance2 ? hitPoss[chance1] : hitPoss[chance2];
       } 
       else if (homeAction === 'Middle' && Math.random() < .5) {
         result = hitPoss[chance1];
       } 
       else if (homeAction === 'High' && Math.random() < 0.6) {
         result = chance1 < chance2 ? hitPoss[chance1] : hitPoss[chance2];
       } 
       else {
         $scope.wasHit = "Pop up, that's an out!";
         yerOut();
         return;
       }//end else 
       $scope.wasHit += '  ' + result;
       
    } //end if 
   runBases(result);
  }; //end action()

  function yerOut() {
    strikes = 0;
    if(++outs > 2) {
       curTeam = (curTeam === 'home') ? 'away' : 'home';
       if(curTeam === 'home') {
         $scope.curTeamAction = 'Swing';
         $scope.otherTeamAction = 'Pitch';
       } else {
         $scope.curTeamAction = 'Pitch';
         $scope.otherTeamAction = 'Swing';
       }
       bases = [0,0,0];
       outs = 0;
       $scope.pitch = '';
     }
     drawBases('Out');
  }

  function runBases(result) {
    if (result === 'Strike') {
      if(++strikes > 2) {
        strikes = 0;
        yerOut();
        return;
      } 
    drawBases('Strike');
    return;
    } //end if strike
    strikes = 0;
    var value = hitPoss.indexOf(result);
    for (var i = 2; i >= 0; i--) {
       if (bases[i] > 0) {
        --bases[i];
        ++bases[i+value+1] || (bases[i+value+1] =1);
      }
    } //end for
    ++bases[value] || (bases[value] =1);
    score[curTeam] += bases.reduce(
      function (prev, cur, i, a) {
        if (i > 2) {
          a[i] = 0;
          return prev + cur;
         }
        return prev;
      }, 0
    );
    $scope.homeScore = score.home;
    $scope.awayScore = score.away;
    drawBases(result);
  } //end of runBases
  
  function drawBases(result) {
    $scope.gameInfo = 'The ' + curTeam + ' team got a ' + result + '. Away: ' + score.away + ' Home: ' + score.home +'\n' + $scope.gameInfo;
    $scope.curTeam = curTeam;
    $scope.strikes = strikes;
    $scope.outs = outs; 
    $scope.first = bases[0] ? '@' : '';
    $scope.second = bases[1] ? '@' : '';
    $scope.third = bases[2] ? '@' : '';
  }
    
//drawBases();
});
