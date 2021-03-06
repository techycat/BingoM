var usedNums_P1 = new Array(61);
var usedNums_P2 = new Array(61);
var usedLuckyNums = new Array(61);

var bingoTable_P1 = new Array(25);
var bingoTable_P2 = new Array(25);
var bingoRunningTable_P1 = new Array(25);
var bingoRunningTable_P2 = new Array(25);
var luckyNumber = 0;
var luckyNumCount = 0;
var isPlayer1_Ready=false;
var isPlayer2_Ready=false;
var isGameRunning = false;
var score_P1 = 0;
var score_P2 = 0;
var isRowMatchFound_P1 = new Array(5);
var isRowMatchFound_P2 = new Array(5);
var isColMatchFound_P1 = new Array(5);
var isColMatchFound_P2 = new Array(5);
var isCornerPatternFound_P1 = false;
var isCornerPatternFound_P2 = false;
var isFullPatternFound_P1 = false;
var isFullPatternFound_P2 = false;
var isLastGameFinish = true;

var canClaim = true;
var claimArray_P1 = new Array(14);
var claimArray_P2 = new Array(14);
var claimSuccessArray_P1 = new Array(14);
var claimSuccessArray_P2 = new Array(14);

var startInterval = 8000;
var maxTime = 170000;
var isDiffLevel =false;
var isRoboPlay = true;
var claimScoreRobo = new Array(14);
var claimMaxScore = [25,4,5,5,5,5,5,5,5,5,5,5,5,5];
//TEST
var debug = false;
var LuckNumIndex=0;
var testArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

function main() {
  setUP();
  newCard();
}
function setUP() {
  isRoboPlay = false;
  isPlayer1_Ready=false;
  isPlayer2_Ready=false;
  isGameRunning = false;
  canClaim = true;
  isDiffLevel = false;

  for(var k=0; k<claimArray_P1.length; k++) {
      claimArray_P1[k] = false;
      claimArray_P2[k] = false; 
      claimSuccessArray_P1[k] = 0; 
      claimSuccessArray_P2[k] = 0; 
      claimScoreRobo[k] = 0;
    }
}

function playRobo() {
  isRoboPlay=true;
  var robo=document.getElementById('playComputerId');
  robo.style.backgroundColor='green';
  startGame_P2();
}
function playDiffLevel() {
  isDiffLevel = true;
  startInterval=7000;
//  maxTime = 166000;
  var diffLevel=document.getElementById('diffLevel');
  diffLevel.style.backgroundColor='green';
}

function newCard_P1() {
  //Starting loop through each square card
  for(var i=0; i < 25; i++) {  //<--always this code for loops. change in red
    var currSquare = "P1_square"+i;
    setSquare_P1(currSquare,i);
  } 
}
function newCard_P2() {
  //Starting loop through each square card
  for(var i=0; i < 25; i++) {  //<--always this code for loops. change in red
    var currSquare = "P2_square"+i;
    setSquare_P2(currSquare,i);
  } 
}
function newCard() {
  newCard_P1();
  newCard_P2();
}

function setSquare_P1(currSquare,thisSquare) {
  var currSquare = "P1_square"+thisSquare;
  var newNum;
  if(!debug) {
    do {
      newNum = getNewNum();
    }
    while (usedNums_P1[newNum] || usedNums_P2[newNum]);
  }
  else {
    newNum=thisSquare+1;
  }
  
  
  usedNums_P1[newNum] = true;
  //usedNums_P2[newNum] = true;
  var parent = document.getElementById(currSquare);
  var updateLinkElem= document.getElementById("link_P1_"+thisSquare);
  if(updateLinkElem) {
    parent.removeChild(updateLinkElem);
  }
  var link = document.createElement('a');
  link.id= "link_P1_"+thisSquare;
  link.textContent = newNum;
  link.href = '#';
  link.onclick=function(currSquare) {updateBingo_P1(thisSquare);}
  parent.appendChild(link);

  //document.getElementById(currSquare).innerHTML = newNum;
}

function setSquare_P2(currSquare,thisSquare) {
  var currSquare = "P2_square"+thisSquare;
  var newNum;
  if(!debug) {
    do {
      newNum =getNewNum();
    }
    while (usedNums_P2[newNum] || usedNums_P1[newNum]);
  }
  else {
    newNum=26+thisSquare;
  }
  
  //usedNums_P1[newNum] = true;
  usedNums_P2[newNum] = true;
  var parent = document.getElementById(currSquare);
  var updateLinkElem= document.getElementById("link_P2_"+thisSquare);
  if(updateLinkElem) {
    parent.removeChild(updateLinkElem);
  }
  var link = document.createElement('a');
  link.id= "link_P2_"+thisSquare;
  link.textContent = newNum;
  link.href = '#';
  link.onclick=function(currSquare) {updateBingo_P2(thisSquare);}
  parent.appendChild(link);
  //document.getElementById(currSquare).innerHTML = newNum;
}
function getNewNum() {
  return Math.floor(Math.random() * 60)+1;
  
}

function anotherCard_P1() {
  if(!isGameRunning && !isPlayer1_Ready) {
    for(var i=1; i<usedNums_P1.length; i++) {
      usedNums_P1[i] = false;
    }
  
    newCard_P1();
    var newGameBtn = document.getElementById("myDIV");
  }
}
function anotherCard_P2() {
  if(!isGameRunning && !isPlayer2_Ready) {
    for(var i=1; i<usedNums_P2.length; i++) {
      usedNums_P2[i] = false;
    }
  
    newCard_P2();
  }

}

function startGame_P1() {
  if(!isGameRunning) {
  for(var i=0; i<bingoTable_P1.length-1; i++) {
    var square = document.getElementById("P1_square"+i);
    bingoTable_P1[i]=square.innerText;

  }
  for(var i=0; i<bingoRunningTable_P1.length; i++) {
    bingoRunningTable_P1[i] = false;
  }
  isPlayer1_Ready=true;
  if(isPlayer2_Ready){
    startTheGame();
  }
}
}

function updateBingo_P1(cell) {
  if(isGameRunning) {
    var square = document.getElementById("P1_square"+cell);
    var cellNumber = parseInt(cell);
    var cellVal = parseInt(square.innerText);
    if(cellVal==luckyNumber){
      bingoRunningTable_P1[cellNumber]=true;
      //alert("Yaaahooo...Got a match..");
      checkPatternExist("P1",bingoRunningTable_P1)
      square.style.backgroundColor = "green";
    }
    else {
      square.style.backgroundColor = "#A93226";
      score_P1=score_P1-2;
      document.getElementById("P1_Score").innerHTML = score_P1;
    }
  }

}
function startGame_P2() {
  if(!isGameRunning) {
  for(var i=0; i<bingoTable_P2.length-1; i++) {
    var square = document.getElementById("P2_square"+i);
    bingoTable_P2[i]=square.innerText;

  }
  for(var i=0; i<bingoRunningTable_P2.length; i++) {
    bingoRunningTable_P2[i] = false;
  }
  isPlayer2_Ready=true;
  if(isPlayer1_Ready){
    startTheGame();
  }
}
}

function updateBingo_P2(cell) {
  
  if(isGameRunning) {
    //alert("Check Value");
    var square = document.getElementById("P2_square"+cell);
    var cellNumber = parseInt(cell);
    var cellVal = parseInt(square.innerText);
    if(cellVal==luckyNumber){
      bingoRunningTable_P2[cellNumber]=true;
      //alert("Yaaahooo...Got a match..");
      checkPatternExist("P2",bingoRunningTable_P2)
      square.style.backgroundColor = "green";
    }
    else {
      if(!isRoboPlay){
        square.style.backgroundColor = "#A93226";
        score_P2=score_P2-2;
        document.getElementById("P2_Score").innerHTML = score_P2;
    }
    }
  }
}
function runTotalProgressbar(totalTime) {
  var elem = document.getElementById("progressBar");   
  var width = 1;
  var id = setInterval(frame, 1700);
  function frame() {
    if (width >= totalTime/1700) {
      clearInterval(id);
    } else {
      width+=1; 
      elem.style.width = width + '%'; 
    }
  }
}
function updateClaim_P1(claim) {
  if(canClaim) {
    if(claim<14) {
      var claimElem=document.getElementById("P1_claim_cell"+claim);
      claimElem.style.backgroundColor = "green"
      claimArray_P1[claim] = true;
      claimSuccessArray_P1[claim] = 1;
    }
  }
}function updateClaim_P2(claim) {
  if(canClaim) {
    if(claim<14) {
      var claimElem=document.getElementById("P2_claim_cell"+claim);
      claimElem.style.backgroundColor = "green"
      claimArray_P2[claim] = true;
      claimSuccessArray_P2[claim] = 1;
    }
  }
}

function startTheGame() {
  if(!isGameRunning) {
    for(var i=1; i<usedNums_P1.length; i++) {
      usedNums_P1[i] = false;
      usedNums_P2[i] = false;
      usedLuckyNums[i] = false;
    }
    for(var j=0; i<isRowMatchFound_P1.length; i++) {
      isRowMatchFound_P1[j] = false;
      isRowMatchFound_P2[j] = false;
      isColMatchFound_P1[j] = false;
      isColMatchFound_P2[j] = false;

    }
    
    var isCornerPatternFound_P1 = false;
    var isCornerPatternFound_P2 = false;
    var isFullPatternFound_P1 = false;
    var isFullPatternFound_P2 = false;

    isLastGameFinish = false;
    isGameRunning = true;
    luckyNumCount = 0;
    updateLuckyNum();
    document.getElementById("P1_Score").innerHTML = 0;
    document.getElementById("P2_Score").innerHTML = 0;
    runTheGame();
  }
}

function runTheGame() {
  if(debug) {
      var baseInterval = 10000;
      var intervalExec = setInterval(updateLuckyNum, baseInterval);
      var runnerObj = setTimeout(finishGame, 250000);
    }
    else {
      var intervalExec = setInterval(updateLuckyNum, startInterval);
      runTotalProgressbar(maxTime);
      //var interval1 = setTimeout(reduceInterval,80000);
       var timer1 = setTimeout(function(){
              reduceInterval(2000);
          },64000);
       var timer2 = setTimeout(function(){
              reduceInterval(2000);
          },112000);
      var timer3 = setTimeout(function(){
             reduceInterval(2000);
         },144000);
    
      
        
      var runnerObj = setTimeout(finishGame, maxTime);
    
      function reduceInterval(time) {
        clearInterval(intervalExec);
        startInterval = startInterval - time;
        intervalExec = setInterval(updateLuckyNum, startInterval);
      }
      function finishGame() {
        clearInterval(intervalExec);
        publishWinner();
        canClaim = true;
      }
    }
}

function finalScoreUpdate() {
  for(var i=0;i<claimSuccessArray_P1.length;i++) {
    if(claimSuccessArray_P1[i]==1) {
      score_P1=score_P1-5;
    }
    if(claimSuccessArray_P2[i]==1) {
      score_P2=score_P2-5;
    }
  }
}
function publishWinner() {
  if(isGameRunning) {
    isGameRunning = false;
    isLastGameFinish = true;
    finalScoreUpdate();
    document.getElementById("P1_Score").innerHTML = score_P1;
    document.getElementById("P2_Score").innerHTML = score_P2;
    if(score_P1>score_P2) {
      //alert("Winner is Player1");
      document.getElementById("winnerText").innerHTML = "Winner : Player1";
    }
    else if(score_P1<score_P2) {
      //alert("Winner is Player2");
      document.getElementById("winnerText").innerHTML = "Winner : Player2";
    }
    else {
      //alert("It's Tie");
      document.getElementById("winnerText").innerHTML = "It's Tie";
    }
   // alert("luckyNumCount : "+luckyNumCount);
    var newGame = setTimeout(reloadNew, 30000); 
    function reloadNew() {
      location.reload();
    }
    
  }
}
function updateLuckyNum() {
  if(!debug) {
    luckyNumber = getLuckyNumber();
  }
  else {
    luckyNumber=testArr[LuckNumIndex];
    LuckNumIndex=LuckNumIndex+1;
  }
  luckyNumCount=luckyNumCount+1;
 
  document.getElementById("luckyNum").innerHTML = luckyNumber;
  if(isDiffLevel && luckyNumCount>=27){
      canClaim = false;
      var progressBar=document.getElementById('progressBar');
      progressBar.style.backgroundColor='#8B0000';
  }
  if(!isDiffLevel && luckyNumCount>=20){
      canClaim = false;
      var progressBar=document.getElementById('progressBar');
      progressBar.style.backgroundColor='#8B0000';
  }

  if(isRoboPlay) {
    //alert("Check Value");
    for(var i=0;i<bingoTable_P2.length;i++) {
      if(bingoTable_P2[i]==luckyNumber) {
        //alert("Check Value");
              var timer = setTimeout(function(){
              update_Robo(i);
          },500);
        
        break;
      }
    }
    
  }
}
function update_Robo(cell) {
  updateBingo_P2(cell);
  if(canClaim) {
    makeClaim(bingoRunningTable_P2,cell);
  }
  
}
function makeClaim(bingoArray,cell) {
  claimScoreRobo[0]=claimScoreRobo[0]+1;
  if(cell==0 || cell==4 || cell==20 || cell==24) {
      claimScoreRobo[1]=claimScoreRobo[1]+1;
  }
  var col = cell%5;
  var row = Math.floor(cell/5);
  claimScoreRobo[7+col] = claimScoreRobo[7+col]+1;
  claimScoreRobo[2+row] = claimScoreRobo[2+row]+1;
  
  for(var i=0;i<claimScoreRobo.length;i++) {
     var probability = (claimScoreRobo[i]/claimMaxScore[i])*100;
     if(probability>=50) {
        updateClaim_P2(i);
        if(i>=2 && i<7) {
          claimScoreRobo[12]= claimScoreRobo[i];
          updateClaim_P2(12);
        }
        if(i>=7 && i<12) {
          claimScoreRobo[13]= claimScoreRobo[i];
          updateClaim_P2(13);
        }
       }
  }
}
function getLuckyNumber() {

  var luckyNum;
  do {
    luckyNum =getNewNum();
  }
  while (usedLuckyNums[luckyNum]);
  //alert("New Luck");
  usedLuckyNums[luckyNum]=true;
  return luckyNum;
  
}

function checkPatternExist(player,bingoArray) {
  if(player=="P1"){
    score_P1=score_P1+1;
    if(!isCornerPatternFound_P1){
      if(bingoArray[0] && bingoArray[4] && bingoArray[20] && bingoArray[24]) {
        score_P1=score_P1+10;
        isCornerPatternFound_P1=true;
        if(claimArray_P1[1]) {
          claimSuccessArray_P1[1] = 2;
          score_P1=score_P1+10;
        }
      }
    }
    for(var i=0;i<5;i++) {
      if(!isRowMatchFound_P1[i]){
        if(bingoArray[i*5+0] && bingoArray[i*5+1] && bingoArray[i*5+2] && bingoArray[i*5+3] && bingoArray[i*5+4]) {
          score_P1=score_P1+10;
          isRowMatchFound_P1[i] = true;
          if(claimArray_P1[2+i]) {
             claimSuccessArray_P1[2+i] = 2;
             score_P1=score_P1+10;
          }
          if(claimArray_P1[12] && claimSuccessArray_P1[12] != 2) {
             claimSuccessArray_P1[12] = 2;
             score_P1=score_P1+10;
          }
        }
      }
    }
    for(var i=0;i<5;i++) {
      if(!isColMatchFound_P1[i]){
        if(bingoArray[i] && bingoArray[i+5] && bingoArray[i+10] && bingoArray[i+15] && bingoArray[i+20]) {
          score_P1=score_P1+10;
          isColMatchFound_P1[i] = true;
          if(claimArray_P1[7+i]) {
             claimSuccessArray_P1[7+i] = 2;
             score_P1=score_P1+10;
          }
          if(claimArray_P1[13] && claimSuccessArray_P1[13] != 2) {
             claimSuccessArray_P1[13] = 2;
             score_P1=score_P1+10;
          }
        }
      }
    }
    if(!isFullPatternFound_P1){
      var i=0;
      while(i<25) {
        if(!bingoArray[i]) {
          break;
        }
        i++;
      }
      if(i>=25) {
        isFullPatternFound_P1=true;
        score_P1=score_P1+25;
        if(claimArray_P1[0]) {
             claimSuccessArray_P1[0] = 2;
             score_P1=score_P1+25;
          }
        publishWinner();
      }
    }
    document.getElementById("P1_Score").innerHTML = score_P1;
  }

  if(player=="P2"){
    score_P2=score_P2+1;
    if(!isCornerPatternFound_P2){
      if(bingoArray[0] && bingoArray[4] && bingoArray[24] && bingoArray[20]) {
        score_P2=score_P2+10;
        isCornerPatternFound_P2=true;
        if(claimArray_P2[1]) {
          claimSuccessArray_P2[1] = 2;
          score_P2=score_P2+10;
        }

      }
    }
    for(var i=0;i<5;i++) {
      if(!isRowMatchFound_P2[i]){
        if(bingoArray[i*5+0] && bingoArray[i*5+1] && bingoArray[i*5+2] && bingoArray[i*5+3] && bingoArray[i*5+4]) {
          score_P2=score_P2+10;
          isRowMatchFound_P2[i] = true;
          if(claimArray_P2[2+i]) {
             claimSuccessArray_P2[2+i] = 2;
             score_P2=score_P2+10;
          }
          if(claimArray_P2[12] && claimSuccessArray_P2[12] != 2) {
             claimSuccessArray_P2[12] = 2;
             score_P2=score_P2+10;
          }
        }
      }
    }
    for(var i=0;i<5;i++) {
      if(!isColMatchFound_P2[i]){
        if(bingoArray[i] && bingoArray[i+5] && bingoArray[i+10] && bingoArray[i+15] && bingoArray[i+20]) {
          score_P2=score_P2+10;
          isColMatchFound_P2[i] = true;
          if(claimArray_P2[7+i]) {
             claimSuccessArray_P2[7+i] = 2;
             score_P2=score_P2+10;
          }
          if(claimArray_P2[13] && claimSuccessArray_P2[13] != 2) {
             claimSuccessArray_P2[13] = 2;
             score_P2=score_P2+10;
          }
        }
      }
    }
    if(!isFullPatternFound_P2){
      var i=0;
      while(i<25) {
        if(!bingoArray[i]) {
          break;
        }
        i++;
      }
      if(i>=25) {
        isFullPatternFound_P2=true;
        score_P2=score_P2+25;
        if(claimArray_P2[0]) {
             claimSuccessArray_P2[0] = 2;
             score_P2=score_P2+25;
          }
        publishWinner();
      }
    }
    document.getElementById("P2_Score").innerHTML = score_P2;
  }
}
