var codeLength = 5,
	codePegs = [],
	colorPositionMatches = 0,
	colorMatches = 0,
	colors = ["red","blue","green","yellow","purple"],
	gameDivId = "gameDiv",
	gamePegs = [],
	currentTurn = 1,
	maxTurn = 10,
	stateLose = 1,
	stateGame = 0,
	stateWin = 2;
	newGameBoardHtml = "";


var startGame = function() {
	codePegs = createRowData();
	currentTurn = 1;
	startTurn();
}

var startTurn = function() {
	gamePegs = [];
	colorPositionMatches = 0;
	colorMatches = 0;
}


var selectPeg = function(color) {
	if (gamePegs.length < codeLength) {
		var peg = new Object();

		peg.position = gamePegs.length+1;
		peg.color = color;
		peg.colorMatched = false;
		peg.colorPositionMatched = false;

		gamePegs.push(peg);
		renderGameRow();
	}
}

var unselectPeg = function(event) {
	
	if (gamePegs.length > 0) {
		gamePegs.splice(gamePegs.length-1,1)
		renderGameRow();
	}
}

var renderNewGameBoard = function () {
	var gameDiv = document.getElementById(gameDivId);
	gameDiv.innerHTML = newGameBoardHtml;
}

var renderGameRow = function(){
	var rowToPopulate = document.getElementById("turn" + currentTurn),
		rowInnerHTML = "";

    
        
	for (var blackPins = 0; blackPins < colorPositionMatches; blackPins++) {
		rowInnerHTML = rowInnerHTML + '<div class="pin black"></div>';
	}

	
	for (var whitePins = 0; whitePins < colorMatches; whitePins++) {
		rowInnerHTML = rowInnerHTML + '<div class="pin white"></div>';
	}

	
	for (var emptyPins = 0; emptyPins < (codeLength - colorMatches - colorPositionMatches); emptyPins++) {
		rowInnerHTML = rowInnerHTML + '<div class="pin empty"></div>';
	}

	
	for (var gamePegsIdx = 0; gamePegsIdx < gamePegs.length; gamePegsIdx++) {
		rowInnerHTML = rowInnerHTML + '<div class="peg ' + gamePegs[gamePegsIdx].color + '"></div>';
	}

	
	for (var emptyPins = 0; emptyPins < (codeLength - gamePegs.length); emptyPins++) {
		rowInnerHTML = rowInnerHTML + '<div class="peg empty"></div>';
	}

	rowToPopulate.innerHTML = rowInnerHTML;

}

var renderCodeRow = function() {
	var rowToPopulate = document.getElementById("code"),
		rowInnerHTML = "";

	
	for (var emptyPins = 0; emptyPins < codeLength; emptyPins++) {
		rowInnerHTML = rowInnerHTML + '<div class="pin hide"></div>';
	}

	
	for (var codePegsIdx = 0; codePegsIdx < codePegs.length; codePegsIdx++) {
		rowInnerHTML = rowInnerHTML + '<div class="peg ' + codePegs[codePegsIdx].color + '"></div>';
	}

	rowToPopulate.innerHTML = rowInnerHTML;

}

var createRowData = function () {
	var row=[];

	for (var codeLengthIdx = 0; codeLengthIdx < codeLength; codeLengthIdx++) {
		var peg = new Object();

		peg.position = codeLengthIdx+1;
		peg.color = colors[Math.floor(Math.random() * colors.length)];
		peg.colorMatched = false;
		peg.colorPositionMatched = false;
	
		row.push(peg);
	}
	return row;
}

var alert_title = "Live or Die";
var alert_Button_Text = "OK";

if(document.getElementById) {
	window.alert = function(txt) {
		createCustomAlert(txt);
	}
}

function createCustomAlert(txt) {
	d = document;

	if(d.getElementById("modalContainer")) return;

	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	mObj.style.height = d.documentElement.scrollHeight + "px";
	
	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
	alertObj.style.visiblity="visible";

	h1 = alertObj.appendChild(d.createElement("h1"));
	h1.appendChild(d.createTextNode(alert_title));

	msg = alertObj.appendChild(d.createElement("p"));
	msg.innerHTML = txt;

	btn = alertObj.appendChild(d.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(d.createTextNode(alert_Button_Text));
	btn.href = "#";
	btn.focus();
	btn.onclick = function() { 
		document.location.reload(); return false;
		
	}

	alertObj.style.display = "block";
	
	
}

function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
	
var handleSolution = function() {

	
	if (gamePegs.length === codeLength) {
		var state = evaluateSolution();

		if (currentTurn <= maxTurn && state == stateWin){
			renderCodeRow();
			alert("Well, You find the code so you can live!");
			

		} else if (currentTurn < maxTurn && state == stateLose){
			renderGameRow();
			currentTurn++;
			startTurn();

		} else if (currentTurn == maxTurn && state == stateLose){
			renderCodeRow();
			alert("This game don't lie... It's time to die!");
			
		}

	} else {
		
	}
}

var evaluateSolution = function () {
	
	var state = stateGame;

	
	checkColorPositionMatches();

	
	if (colorPositionMatches == codeLength) {
		state = stateWin;
		
	} else {
		
		checkColorMatches();
		state = stateLose;
	}

	
	unmatchCodePegs();

	return state;
}

var checkColorPositionMatches = function() {
	colorPositionMatches = 0;

	codePegLoop:
	for (var codePegIdx=0;codePegIdx<codePegs.length;codePegIdx++) {
		var codePeg = codePegs[codePegIdx];

		
		gamePegLoop:
		for (var gamePegIdx=0;gamePegIdx<gamePegs.length;gamePegIdx++) {
			var gamePeg = gamePegs[gamePegIdx];

			if ((gamePeg.color == codePeg.color) &&
				(gamePeg.position == codePeg.position)) {
						
					gamePeg.colorPositionMatched = true;
					codePeg.colorPositionMatched = true;

					colorPositionMatches++;

					break gamePegLoop;
			}
		}
	}
}

var checkColorMatches = function() {
	colorMatches = 0;

	codePegLoop:
	for (var codePegIdx=0;codePegIdx<codePegs.length;codePegIdx++) {
		var codePeg = codePegs[codePegIdx];

		
		gamePegLoop:
		for (var gamePegIdx=0;gamePegIdx<gamePegs.length;gamePegIdx++) {
			var gamePeg = gamePegs[gamePegIdx];

			if (gamePeg.color == codePeg.color && 
			   (gamePeg.colorMatched == false) &&
			   (codePeg.colorMatched == false) &&
			   (gamePeg.colorPositionMatched == false) &&
			   (codePeg.colorPositionMatched == false)) {

				gamePeg.colorMatched=true;
				codePeg.colorMatched=true;

				colorMatches++;

				break gamePegLoop;
			}
		}
	}
}


var unmatchCodePegs = function() {
	for (var codePegIdx=0;codePegIdx<codePegs.length;codePegIdx++) {
			var codePeg = codePegs[codePegIdx];
			
			codePeg.colorPositionMatched = false;
			codePeg.colorMatched = false;
	}

}