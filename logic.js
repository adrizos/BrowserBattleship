// Alex Drizos
// BattleShip Browser Game
//
// javascript file for gameplay logic in Browser Battleship 

//global variables
var letters = "ABCDEFGHIJ".split('');
var currentPlayer = 1; //used to support transition function between turns
var player1Name, player2Name, player1Score = 0, player2Score = 0, player1Points = 0, player2Points = 0,
player1StartPos, player2StartPos;
var p1Aircraft, p1Battleship, p1Sub, p2Aircraft, p2Battleship, p2Sub;
var p1AircraftCount = 0, p1BattleshipCount = 0, p1SubCount = 0, p2AircraftCount = 0, p2BattleshipCount = 0, p2SubCount = 0;
var gameOver;


//create table for p1 defend under id=defendGrid1
function createP1DefendTable () {
    var tableElement = document.createElement("TABLE");
    var defendGrid1Var = document.getElementById("defendGrid1");


    for (var i = 0; i < 11; i++){
        var tr = document.createElement('tr');
        //if i = 0 create col headers
        if (i == 0){
            for (var c = 0; c < 10; c++){
                if (c == 0){
                    //skip cell 0,0 to create empty space
                    var th = document.createElement('th');
                    var thText = document.createTextNode(' ');
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                var th = document.createElement('th');
                var thText = document.createTextNode(letters[c]);
                th.appendChild(thText);
                tr.appendChild(th);
            }
            tableElement.appendChild(tr); //add row of headers to table
        }
        else {
            //create empty cells or row headers
            for (var n = 0; n < 11; n ++) {
                //the first space in each row is row header
                if (n == 0){
                    var th = document.createElement('th');
                    var thText = document.createTextNode(i);
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                //the rest are empty cells for game play
                else {
                    var td = document.createElement('td');
                    td.id = "p1d"+letters[n-1]+i; //set id to coordinate "player1 defend grid coordinate"
                                                  // i.e. p1dA10
                    tr.appendChild(td);
                }
                tableElement.appendChild(tr);
            }

        }

    }
    //append table to parent
    defendGrid1Var.appendChild(tableElement);
}//end of createP1DefendTable function

//create table for p1 attack under id=attackGrid1
function createP1AttackTable () {
    var tableElement = document.createElement("TABLE");
    var attackGrid1Var = document.getElementById("attackGrid1");


    for (var i = 0; i < 11; i++){
        var tr = document.createElement('tr');
        //if i = 0 create col headers
        if (i == 0){
            for (var c = 0; c < 10; c++){
                if (c == 0){
                    //skip cell 0,0 to create empty space
                    var th = document.createElement('th');
                    var thText = document.createTextNode(' ');
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                var th = document.createElement('th');
                var thText = document.createTextNode(letters[c]);
                th.appendChild(thText);
                tr.appendChild(th);
            }
            tableElement.appendChild(tr); //add row of headers to table
        }
        else {
            //create empty cells or row headers
            for (var n = 0; n < 11; n ++) {
                //the first space in each row is row header
                if (n == 0){
                    var th = document.createElement('th');
                    var thText = document.createTextNode(i);
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                //the rest are empty cells for game play
                else {
                    var td = document.createElement('td');
                    td.id = "p1a"+letters[n-1]+i; //set id to coordinate i.e. "p1aA3"
                                                  // "player 1 attack grid A3"
                    td.addEventListener("click", function () {
                        playerTurn(this.id)
                    });
                    tr.appendChild(td);
                }
                tableElement.appendChild(tr);
            }
        }
    }
    //append table to parent
    attackGrid1Var.appendChild(tableElement);
}//end of createP1AttackTable function

//create table for p2 defend under id=defendGrid2
function createP2DefendTable () {
    var tableElement = document.createElement("TABLE");
    var defendGrid2Var = document.getElementById("defendGrid2");


    for (var i = 0; i < 11; i++){
        var tr = document.createElement('tr');
        //if i = 0 create col headers
        if (i == 0){
            for (var c = 0; c < 10; c++){
                if (c == 0){
                    //skip cell 0,0 to create empty space
                    var th = document.createElement('th');
                    var thText = document.createTextNode(' ');
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                var th = document.createElement('th');
                var thText = document.createTextNode(letters[c]);
                th.appendChild(thText);
                tr.appendChild(th);
            }
            tableElement.appendChild(tr); //add row of headers to table
        }
        else {
            //create empty cells or row headers
            for (var n = 0; n < 11; n ++) {
                //the first space in each row is row header
                if (n == 0){
                    var th = document.createElement('th');
                    var thText = document.createTextNode(i);
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                //the rest are empty cells for game play
                else {
                    var td = document.createElement('td');
                    td.id = "p2d"+letters[n-1]+i; //set id to coordinate i.e. "A3"
                                                  //with abbrev. for "player 2 defend grid A3"
                    tr.appendChild(td);
                }
                tableElement.appendChild(tr);
            }
        }
    }
    //append table to parent
    defendGrid2Var.appendChild(tableElement);
}//end of createP2DefendTable function

//create table for p2 attack under id=attackGrid2
function createP2AttackTable () {
    var tableElement = document.createElement("TABLE");
    var attackGrid2Var = document.getElementById("attackGrid2");


    for (var i = 0; i < 11; i++){
        var tr = document.createElement('tr');
        //if i = 0 create col headers
        if (i == 0){
            for (var c = 0; c < 10; c++){
                if (c == 0){
                    //skip cell 0,0 to create empty space
                    var th = document.createElement('th');
                    var thText = document.createTextNode(' ');
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                var th = document.createElement('th');
                var thText = document.createTextNode(letters[c]);
                th.appendChild(thText);
                tr.appendChild(th);
            }
            tableElement.appendChild(tr); //add row of headers to table
        }
        else {
            //create empty cells or row headers
            for (var n = 0; n < 11; n ++) {
                //the first space in each row is row header
                if (n == 0){
                    var th = document.createElement('th');
                    var thText = document.createTextNode(i);
                    th.appendChild(thText);
                    tr.appendChild(th);
                }
                //the rest are empty cells for game play
                else {
                    var td = document.createElement('td');
                    td.id = "p2a"+letters[n-1]+i; //set id to coordinate i.e. "A3"
                    td.addEventListener("click", function () {
                        playerTurn(this.id)
                    });
                    tr.appendChild(td);
                }
                tableElement.appendChild(tr);
            }

        }

    }
    //append table to parent
    attackGrid2Var.appendChild(tableElement);
}//end of createP2AttackTable function

//functions to handle entering user names and ship placement
function player1SetupInputAction(){
    //save player1 input data
    player1Name = document.getElementsByName("p1Name")[0].value;
    player1StartPos = document.getElementsByName("p1StartingPosition")[0].value;
    //deal with regex parsing of player1 start position entry
    var retVal = parseShips(player1StartPos, 1); //passing user input for start positions
                                                // and identifier for player1 caller
    if (retVal == -1) {
        alert("Unable to capture ship position. Resubmit!");
        window.location.href = "battleship.html";
        return; //
    }
    else if (retVal == 1) {
        //player1 start positions were parsed correctly
        //test for valid ship length and coordinate points, pass player number
        if (checkShipSizeAndPoints(1) == 1) {
            //player1 start positions are totally valid
            //place them on the board
            placeShips(1);
        }
        else {
            alert("Unable to process ship placement! Resubmit!");
            window.location.href = "battleship.html";

            return;
        }
        //hide player1 input fields and display player2 input fields
        document.getElementById('userInputContainer1').style.display= 'none';
        document.getElementById('userInputContainer2').style.display= 'block';
    }
} //end of player1SetupInputAction function
function player2SetupInputAction(){
    //save player2 input data
    player2Name = document.getElementsByName("p2Name")[0].value;
    player2StartPos = document.getElementsByName("p2StartingPosition")[0].value;
    //deal with regex parsing of player2 start position entry
    var retVal = parseShips(player2StartPos, 2); //passing user input for start positions
                                                // and identifier for player1 caller
    if (retVal == -1) {
        alert("Unable to capture ship position. Resubmit!");
        window.location.href = "battleship.html";
        return; //
    }
    else if (retVal == 1) {
        //player2 start positions were parsed correctly
        //test for valid ship length and coordinate points, pass player number
        if (checkShipSizeAndPoints(2) == 1) {
            //player2 start positions are totally valid
            //place them on the board
            placeShips(2);
        }
        else {
            alert("Unable to process ship placement. Resubmit!");
            window.location.href = "battleship.html";
            return;
        }
        //hide landingSection div and display playWindow and hide p2 boardConsole
        document.getElementById('landingSection').style.display = 'none';
        document.getElementById('playWindow').style.display= 'block';
        //alert players that it's now player 1's turn
        alert(player1Name + "'s Turn!");
        //start game

    }
} //end of player1SetupInputAction function
//helper function to deal with various types of user input for start position
function parseShips(startPos, player){
    var pattern = /([ABS][:(][A-J]\d[0]?-[A-J]\d[0]?[)]?[;]?\s?){3}/i; //matches these format conditions
    if (pattern.test(startPos)){
        //regex pattern found match
        startPos = startPos.replace(/[-:()\s]/g, ""); //get rid of format characters
        var shipArr = startPos.split(";"); //create array with 3 ships' positions
        for (var n = 0; n < 3; n++){
            if (shipArr[n][0] == "A"){
                //the ship's first letter is "A"
                if (player == 1){
                    p1Aircraft = shipArr[n]; //save ship info
                }
                else if (player == 2){
                    p2Aircraft = shipArr[n]; //save ship info
                }
            }
            else if (shipArr[n][0] == "B") {
                //the ship's first letter is "B"
                if (player == 1){
                    p1Battleship = shipArr[n]; //save ship info
                }
                else if (player == 2){
                    p2Battleship = shipArr[n]; //save ship info
                }
            }
            else if (shipArr[n][0] == "S") {
                //the ship's first letter is "S"
                if (player == 1){
                    p1Sub = shipArr[n]; //save ship info
                }
                else if (player == 2){
                    p2Sub = shipArr[n]; //save ship info
                }
            }
        } //end of loop

        //check at this point the input was formatted in valid manner
        if (player == 1 && (p1Aircraft == "" || p1Battleship == "" || p1Sub == "")) {
            console.log("Invalid format for player1 start positions!");
            return -1; //invalid input returns -1
        }
        else if (player == 2 && (p2Aircraft == "" || p1Battleship == "" || p1Sub == "")) {
            console.log("Invalid format for player2 start positions!");
            return -1; //invalid input returns -1
        }
        else {
            //debugging check values
            // console.log("Aircraft: " + aircraft);
            // console.log("Battleship: " + battleship);
            // console.log("Submarine: " + sub);
            // console.log("Player " + player + " ship start positions were of correct formatting");
            return 1;
        }
    }
}  //end of parseShips function

function checkShipSizeHelper(ship) {
    if (ship[0] == 'A'){
        //check for valid aircraft length
        //vertical positioning

    }
    return 1;
} //end of checkShipSize function
function checkShipPointsHelper(ship) {
    return 1;
} //end of checkShipPointsHelper function
function checkShipSizeAndPoints(player){
    //TODO finish the helpers with regexs
    if (player == 1){
        //first check for valid size for all three player ships
        if (checkShipSizeHelper(p1Aircraft) == 1 &&
            checkShipSizeHelper(p1Battleship) == 1 && checkShipSizeHelper(p1Sub == 1)
            && checkShipPointsHelper(p1Aircraft) == 1 && checkShipPointsHelper(p1Aircraft) == 1
            && checkShipPointsHelper(p1Sub) == 1) {
                return 1;
        }
        else {
            return -1;
        }
    }
    else if (player == 2){
        //first check for valid size for all three player ships
        if (checkShipSizeHelper(p2Aircraft) == 1 &&
            checkShipSizeHelper(p2Battleship) == 1 && checkShipSizeHelper(p2Sub == 1)
            && checkShipPointsHelper(p2Aircraft) == 1 && checkShipPointsHelper(p2Aircraft) == 1
            && checkShipPointsHelper(p2Sub) == 1) {
                return 1;
        }
        else {
            return -1;
        }
    }
}//end of checkShipSizeAndPoints function
function placeShips(player){
    //assuming that user enters lower number first based on project description examples
    //place player 1 aircraft
    var positions = {};
    if (player == 1){
        //if aircraft position is vertical i.e. AA1A5
        if (p1Aircraft[1] == p1Aircraft[3]) {
            for(var p = p1Aircraft[2]; p <= p1Aircraft[4]; p++){
                //variable points to current cell
                var cell = document.getElementById("p1d"+p1Aircraft[1]+p);
                //create text element
                var tdText = document.createTextNode('A');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if aircraft position is horizontal i.e. AA1E1
        if (p1Aircraft[1] != p1Aircraft[3]) {
            var rowNum = p1Aircraft[2]; //stays the same
            lettersStartIndex = letters.indexOf(p1Aircraft[1]); //get index of starting letter
            lettersEndIndex = letters.indexOf(p1Aircraft[3]); //get index of ending letter
            for (var p = lettersStartIndex; p <= lettersEndIndex; p++){
                //variable points to current cell
                var cell = document.getElementById("p1d"+letters[p]+rowNum);
                //create text element
                var tdText = document.createTextNode('A');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if battleship position is vertical
        if (p1Battleship[1] == p1Battleship[3]) {
            for(var p = p1Battleship[2]; p <= p1Battleship[4]; p++){
                //variable points to current cell
                var cell = document.getElementById("p1d"+p1Battleship[1]+p);
                //create text element
                var tdText = document.createTextNode('B');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if battleship position is horizontal
        if (p1Battleship[1] != p1Battleship[3]) {
            var rowNum = p1Battleship[2]; //stays the same
            lettersStartIndex = letters.indexOf(p1Battleship[1]); //get index of starting letter
            lettersEndIndex = letters.indexOf(p1Battleship[3]); //get index of ending letter
            for (var p = lettersStartIndex; p <= lettersEndIndex; p++){
                //variable points to current cell
                var cell = document.getElementById("p1d"+letters[p]+rowNum);
                //create text element
                var tdText = document.createTextNode('B');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if sub position is vertical
        if (p1Sub[1] == p1Sub[3]) {
            for(var p = p1Sub[2]; p <= p1Sub[4]; p++){
                //variable points to current cell
                var cell = document.getElementById("p1d"+p1Sub[1]+p);
                //create text element
                var tdText = document.createTextNode('S');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if sub position is horizontal
        if (p1Sub[1] != p1Sub[3]) {
            var rowNum = p1Sub[2]; //stays the same
            lettersStartIndex = letters.indexOf(p1Sub[1]); //get index of starting letter
            lettersEndIndex = letters.indexOf(p1Sub[3]); //get index of ending letter
            for (var p = lettersStartIndex; p <= lettersEndIndex; p++){
                //variable points to current cell
                var cell = document.getElementById("p1d"+letters[p]+rowNum);
                //create text element
                var tdText = document.createTextNode('S');
                //append to cell
                cell.appendChild(tdText);
            }
        }
    }//end of player1 placements

    if (player == 2){
        //if aircraft position is vertical i.e. AA1A5
        if (p2Aircraft[1] == p2Aircraft[3]) {
            for(var p = p2Aircraft[2]; p <= p2Aircraft[4]; p++){
                //variable points to current cell
                var cell = document.getElementById("p2d"+p2Aircraft[1]+p);
                //create text element
                var tdText = document.createTextNode('A');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if aircraft position is horizontal i.e. AA1E1
        if (p2Aircraft[1] != p2Aircraft[3]) {
            var rowNum = p2Aircraft[2]; //stays the same
            lettersStartIndex = letters.indexOf(p2Aircraft[1]); //get index of starting letter
            lettersEndIndex = letters.indexOf(p2Aircraft[3]); //get index of ending letter
            for (var p = lettersStartIndex; p <= lettersEndIndex; p++){
                //variable points to current cell
                var cell = document.getElementById("p2d"+letters[p]+rowNum);
                //create text element
                var tdText = document.createTextNode('A');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if battleship position is vertical
        if (p2Battleship[1] == p2Battleship[3]) {
            for(var p = p2Battleship[2]; p <= p2Battleship[4]; p++){
                //variable points to current cell
                var cell = document.getElementById("p2d"+p2Battleship[1]+p);
                //create text element
                var tdText = document.createTextNode('B');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if battleship position is horizontal
        if (p2Battleship[1] != p2Battleship[3]) {
            var rowNum = p2Battleship[2]; //stays the same
            lettersStartIndex = letters.indexOf(p2Battleship[1]); //get index of starting letter
            lettersEndIndex = letters.indexOf(p2Battleship[3]); //get index of ending letter
            for (var p = lettersStartIndex; p <= lettersEndIndex; p++){
                //variable points to current cell
                var cell = document.getElementById("p2d"+letters[p]+rowNum);
                //create text element
                var tdText = document.createTextNode('B');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if sub position is vertical
        if (p2Sub[1] == p2Sub[3]) {
            for(var p = p2Sub[2]; p <= p2Sub[4]; p++){
                //variable points to current cell
                var cell = document.getElementById("p2d"+p2Sub[1]+p);
                //create text element
                var tdText = document.createTextNode('S');
                //append to cell
                cell.appendChild(tdText);
            }
        }
        //if sub position is horizontal
        if (p2Sub[1] != p2Sub[3]) {
            var rowNum = p2Sub[2]; //stays the same
            lettersStartIndex = letters.indexOf(p2Sub[1]); //get index of starting letter
            lettersEndIndex = letters.indexOf(p2Sub[3]); //get index of ending letter
            for (var p = lettersStartIndex; p <= lettersEndIndex; p++){
                //variable points to current cell
                var cell = document.getElementById("p2d"+letters[p]+rowNum);
                //create text element
                var tdText = document.createTextNode('S');
                //append to cell
                cell.appendChild(tdText);
            }
        }
    } //end of player2 placements
} //end of placeShips function

function playerTurn(targetCellId) {
    //check hit for strikes/misses and do book keeping
    checkHit(targetCellId);
    //check which player
    if (currentPlayer == 1){
         //check if game is over
         if (player1Points == 24) {
             //know the game is over
             //set gameOver to true
             gameOver = true;
             //call gameOver function which computes final scores, resets game
             alert(player1Name + " wins the game!");
             gameOverReset();
         }
         else {
             // switch player turn book keeping and go to player 2's turn

             //hide player 1's board
             document.getElementById('boardConsole1').style.display= 'none';
             pause(1200).then(() => {
                 alert(player2Name + "'s Turn!");
            });

             document.getElementById('boardConsole2').style.display= 'block';
             currentPlayer = 2;
         }
    }
    else if (currentPlayer == 2){
        //check if game is over
        if (player2Points == 24) {
            //know the game is over
            //set gameOver to true
            gameOver = true;
            //call gameOver function which computes final scores, resets game
            alert(player2Name + " wins the game!");
            gameOverReset();
        }
        else {
            // switch player turn book keeping and go to player 1's turn

            //hide player 2's board
            document.getElementById('boardConsole2').style.display= 'none';
            alert(player1Name + "'s Turn!");
            document.getElementById('boardConsole1').style.display= 'block';
            currentPlayer = 1;
        }
   }

} //end of playerTurn function
function pause (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function gameOverReset() {
    //compute scores and save to local storage
    player1Score = 24-(2*player2Points);
    player2Score = 24-(2*player1Points);

    if (localStorage.length == 10 && localStorage.key(localStorage.length) == 24){
        //all high scores have 24, do nothing
    }
    else if (localStorage.length < 9){
        //add these scores
        localStorage.setItem(player1Score, player1Name);
        localStorage.setItem(player2Score, player2Name);
    }
    else if (localStorage.length == 10) {
        //check if either score is higher than whats already recorded
        //since locaStorage was sorted we can just compare to last entry
        if (player1Score > localStorage.key(localStorage.length)) {
            localStorage.removeItem(localStorage.key(localStorage.length));
            localStorage.setItem(player1Score, player1Name);
        }
        if (player2Score > localStorage.key(localStorage.length)) {
            localStorage.removeItem(localStorage.key(localStorage.length));
            localStorage.setItem(player2Score, player2Name);
        }
    }

    //reset globals and reset windows
    currentPlayer = 1;
    player1Score = 0;
    player2Score = 0;
    player1Points = 0;
    player2Points = 0;
    p1AircraftCount = 0;
    p1BattleShipCount = 0;
    p1Subcount = 0;
    p2AircraftCount = 0;
    p2BattleShipCount = 0;
    p2Subcount = 0;

    window.location.href = "battleship.html";

} //end of gameOverReset function

function checkHit(targetCellId) {
    if (currentPlayer == 1){
        //targetCellId points to cell attackGrid1 i.e. p1aA3
        //we want to test the equivalent cell in defendGrid2 i.e. p2dA3
        var myElement = document.getElementById(targetCellId);
        var p2TargetCellId = targetCellId.replace("1a", "2d");
        var opponentElement = document.getElementById(p2TargetCellId);
        if (opponentElement.textContent == "A"){
            alert("Hit!");
            //update cell colors
            myElement.style.backgroundColor = "#db1d08";
            opponentElement.style.backgroundColor = "#db1d08";
            //update points
            player1Points+= 2;
            //update opponent's aircraft carrier status and check if sunk
            p2AircraftCount+= 1;
            if (p2AircraftCount == 5) {
                alert("You sunk their Aircraft Carrier!");
            }
        }
        else if (opponentElement.textContent == "B") {
            alert("Hit!");
            //update cell colors
            myElement.style.backgroundColor = "#db1d08";
            opponentElement.style.backgroundColor = "#db1d08";
            //update points
            player1Points+= 2;
            //update opponent's battleship status and check if sunk
            p2BattleshipCount+= 1;
            if (p2BattleshipCount == 4) {
                alert("You sunk their BattleShip!");
            }
        }
        else if (opponentElement.textContent == "S") {
            alert("Hit!");
            //update cell colors
            myElement.style.backgroundColor = "#db1d08";
            opponentElement.style.backgroundColor = "#db1d08";
            //update points
            player1Points+= 2;
            //update opponent's aircraft carrier status and check if sunk
            p2SubCount+= 1;
            if (p2SubCount == 3) {
                alert("You sunk their Submarine!");
            }
        }
        else {
            alert("Miss!");
            myElement.style.backgroundColor = "white";
            opponentElement.style.backgroundColor = "white";
        }
    } //end of player 1 check
    else if (currentPlayer == 2) {
        //targetCellId points to cell attackGrid2 i.e. p2aA3
        //we want to test the equivalent cell in defendGrid2 i.e. p1dA3
        var myElement = document.getElementById(targetCellId);
        var p2TargetCellId = targetCellId.replace("2a", "1d");
        var opponentElement = document.getElementById(p2TargetCellId);
        if (opponentElement.textContent == "A"){
            alert("Hit!");
            //update cell colors
            myElement.style.backgroundColor = "#db1d08";
            opponentElement.style.backgroundColor = "#db1d08";
            //update points
            player2Points+= 2;
            //update opponent's aircraft carrier status and check if sunk
            p1AircraftCount+= 1;
            if (p1AircraftCount == 5) {
                alert("You sunk their Aircraft Carrier!");
            }
        }
        else if (opponentElement.textContent == "B") {
            alert("Hit!");
            //update cell colors
            myElement.style.backgroundColor = "#db1d08";
            opponentElement.style.backgroundColor = "#db1d08";
            //update points
            player2Points+= 2;
            //update opponent's battleship status and check if sunk
            p1BattleshipCount+= 1;
            if (p1BattleshipCount == 4) {
                alert("You sunk their BattleShip!");
            }
        }
        else if (opponentElement.textContent == "S") {
            alert("Hit!");
            //update cell colors
            myElement.style.backgroundColor = "#db1d08";
            opponentElement.style.backgroundColor = "#db1d08";
            //update points
            player2Points+= 2;
            //update opponent's aircraft carrier status and check if sunk
            p1SubCount+= 1;
            if (p1SubCount == 3) {
                alert("You sunk their Submarine!");
            }
        }
        else {
            alert("Miss!");
            myElement.style.backgroundColor = "white";
            opponentElement.style.backgroundColor = "white";
        }
    } //end of player 2 check
} //end of checkHit function
//main function
function loadFunction() {

    createP1DefendTable();
    createP1AttackTable();
    createP2DefendTable();
    createP2AttackTable();
}
