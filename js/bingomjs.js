var usedNums_P1 = new Array(76);
var usedNums_P2 = new Array(76);
var usedLuckyNums = new Array(76);

var bingoTable_P1 = new Array(25);
var bingoTable_P2 = new Array(25);
var bingoRunningTable_P1 = new Array(24);
var bingoRunningTable_P2 = new Array(24);
var luckyNumber = 0;
var luckyNumCount = 1;
var isPlayer1_Ready=false;
var isPlayer2_Ready=false;
var isGameRunning = false;
var score_P1 = 0;
var score_P2 = 0;
var isRowMatchFound_P1 = new Array(5);
var isRowMatchFound_P2 = new Array(5);
var isCornerPatternFound_P1 = false;
var isCornerPatternFound_P2 = false;
var isFullPatternFound_P1 = false;
var isFullPatternFound_P2 = false;
var isLastGameFinish = true;

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
	
	var colPlace =new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);
	
	do {
		newNum = getNewNum();
	}
	while (usedNums_P1[newNum] || usedNums_P2[newNum]);
	
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
	
	do {
		newNum =getNewNum();
	}
	while (usedNums_P2[newNum] || usedNums_P1[newNum]);
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
	return Math.floor(Math.random() * 75)+1;
	
}

function anotherCard_P1() {
	if(!isGameRunning) {
		for(var i=1; i<usedNums_P1.length; i++) {
			usedNums_P1[i] = false;
		}
	
		newCard_P1();
	}
}
function anotherCard_P2() {
	if(!isGameRunning) {
		for(var i=1; i<usedNums_P2.length; i++) {
			usedNums_P2[i] = false;
		}
	
		newCard_P2();
	}

}

function startGame_P1() {
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
	}

}
function startGame_P2() {
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

function updateBingo_P2(cell) {
	//alert("Check Value");
	if(isGameRunning) {
		var square = document.getElementById("P2_square"+cell);
		var cellNumber = parseInt(cell);
		var cellVal = parseInt(square.innerText);
		if(cellVal==luckyNumber){
			bingoRunningTable_P2[cellNumber]=true;
			//alert("Yaaahooo...Got a match..");
			checkPatternExist("P2",bingoRunningTable_P2)
			square.style.backgroundColor = "green";
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

		}
		isLastGameFinish = false;
		isGameRunning = true;
		luckyNumber = getLuckyNumber();
		document.getElementById("luckyNum").innerHTML = luckyNumber;
		document.getElementById("P1_Score").innerHTML = score_P1;
		document.getElementById("P2_Score").innerHTML = score_P2;
			var intervalExec = setInterval(updateLuckyNum, 10000);
			var runnerObj = setTimeout(test, 350000);
			function test() {
				clearInterval(intervalExec);
				publishWinner();
			}
	}
}
function publishWinner() {
	if(isGameRunning) {
		isGameRunning = false;
		isLastGameFinish = true;
		if(score_P1>score_P2) {
			//alert("Winner is Player1");
			document.getElementById("winnerText").innerHTML = "Player1";
		}
		else if(score_P1<score_P2) {
			//alert("Winner is Player2");
			document.getElementById("winnerText").innerHTML = "Player2";
		}
		else {
			//alert("It's Tie");
			document.getElementById("winnerText").innerHTML = "Both";
		}

		var newGame = setTimeout(reloadNew, 5000);	
		function reloadNew() {
			//location.reload();
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
function updateLuckyNum() {
	luckyNumber = getLuckyNumber();
	document.getElementById("luckyNum").innerHTML = luckyNumber;
	luckyNumCount=luckyNumCount+1;
	// if(luckyNumCount>=30) {
	// 	isGameRunning = false;
	// 	if(score_P1>score_P2) {
	// 		alert("Winner is Player1");
	// 	}
	// 	else if(score_P1<score_P2) {
	// 		alert("Winner is Player2");
	// 	}
	// 	else {
	// 		alert("It's Tie");
	// 	}
	// }
}
function checkPatternExist(player,bingoArray) {
	if(player=="P1"){
		score_P1=score_P1+1;
		if(!isCornerPatternFound_P1){
			if(bingoArray[0] && bingoArray[4] && bingoArray[23] && bingoArray[19]) {
				score_P1=score_P1+10;
				isCornerPatternFound_P1=true;
			}
		}
		for(var i=0;i<5;i++) {
			if(!isRowMatchFound_P1[i]){
				if(bingoArray[i*5+0] && bingoArray[i*5+1] && bingoArray[i*5+2] && bingoArray[i*5+3] && bingoArray[i*5+4]) {
					score_P1=score_P1+5;
					isRowMatchFound_P1[i] = true;
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
				publishWinner();
			}
		}
		document.getElementById("P1_Score").innerHTML = score_P1;
	}

	if(player=="P2"){
		score_P2=score_P2+1;
		if(!isCornerPatternFound_P2){
			if(bingoArray[0] && bingoArray[4] && bingoArray[23] && bingoArray[19]) {
				score_P2=score_P2+10;
				isCornerPatternFound_P2=true;
			}
		}
		for(var i=0;i<5;i++) {
			if(!isRowMatchFound_P2[i]){
				if(bingoArray[i*5+0] && bingoArray[i*5+1] && bingoArray[i*5+2] && bingoArray[i*5+3] && bingoArray[i*5+4]) {
					score_P2=score_P2+5;
					isRowMatchFound_P2[i] = true;
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
				publishWinner();
			}
		}
		document.getElementById("P2_Score").innerHTML = score_P2;
	}
	
	
}
