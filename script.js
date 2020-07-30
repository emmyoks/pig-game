
/*
Game rules;
- The game has two players, playing in rounds
- Each turn a player rolls the dice as many times as he wishes
- But if a player rolls a "1", the player losses his current point, and it's the next player
- You can hold your current scores, so it get added to your total score.
- The first player to reach 100points wins the game.

*/
// setting the theme to either day or night according to the current time
var nightHour = [19,20,21,22,23,0,1,2,3,4,5,6]
var currHour = new Date().getHours()
var currTheme = document.querySelector("link").href
if (nightHour.includes(currHour)){
    switchTheme()
}
var totalPoint, activePlayer, currPoint;
// document.querySelector("link").href = "bright.css"
function switchTheme(){
   
    if(document.querySelector("link").href === "https://raw.githubusercontent.com/emmyoks/pig-game/master/bright.css"){
        document.querySelector("link").href = "night.css";
        document.getElementById('theme-switch').textContent = "Day Mode";
    }
    else{
        document.querySelector("link").href = "bright.css";
        document.getElementById('theme-switch').textContent = "Night Mode"
    }
}
document.getElementById('theme-switch').addEventListener('click', switchTheme)
init()
function init(){
    totalPoint = [0,0]
    currPoint = 0
    activePlayer = 0
    document.getElementById('roll').style.display = 'block'
    document.getElementById('hold').style.display = 'block'
    document.querySelectorAll('.curr-box').forEach(box => box.style.display = 'block')
    document.getElementById('win-or-lose-0').textContent = "";
    document.getElementById('win-or-lose-1').textContent = "";
    document.getElementById('total-point-p0').textContent = 0;
    document.getElementById('total-point-p1').textContent = 0;
    document.getElementById(`curr-point-p0`).textContent = currPoint;
    document.getElementById(`curr-point-p1`).textContent = currPoint;
    document.getElementById('roll').style.backgroundImage = "none";
    document.querySelector('.player0').classList.remove('winner')
    document.querySelector('.player1').classList.remove('winner')
    document.querySelector('.player0').classList.remove('active')
    document.querySelector('.player1').classList.remove('active')
    document.querySelector('.player0').classList.add('active')
}

document.getElementById("roll").addEventListener('click', function(){
//    get rolled number
   var dice = Math.floor(Math.random()*6) + 1;
//    display rolled number on dice
    document.getElementById('roll').style.backgroundImage = "url(dice"+dice+".jpg)";
    //  add rolled number to  current point and display if rolled number is not "1" 
    if(dice !== 1){
        currPoint += dice;
        document.getElementById(`curr-point-p` + activePlayer).textContent = currPoint;
    } else{
       nextplayer()
    }
    
})

document.getElementById('hold').addEventListener('click', function(){
    // add current point to total point
    totalPoint[activePlayer] += currPoint
    // display on the user interface
    document.getElementById('total-point-p'+activePlayer).textContent = totalPoint[activePlayer]
    // check if player won 
    if(totalPoint[activePlayer] >= 100){
        if(activePlayer === 0){
            document.getElementById('win-or-lose-0').textContent = "WINS!";
            document.getElementById('win-or-lose-1').textContent = "LOSE!";
        }
        else{
            document.getElementById('win-or-lose-1').textContent = "WINS!";
            document.getElementById('win-or-lose-0').textContent = "LOSE!"; 
        }
        document.getElementById('roll').style.display = 'none'
        document.getElementById('hold').style.display = 'none'
        document.querySelectorAll('.curr-box').forEach(box => box.style.display = 'none')
        document.querySelector('.player'+activePlayer).classList.add('winner')
        document.querySelector('.player'+activePlayer).classList.remove('active')
    }else{

        // nextplayer
        nextplayer()
    }
})

document.getElementById('new').addEventListener('click',init)

function nextplayer(){

    currPoint = 0
    document.getElementById(`curr-point-p` + activePlayer).textContent = currPoint;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player0').classList.toggle('active')
    document.querySelector('.player1').classList.toggle('active')
    document.getElementById('roll').style.backgroundImage = "none";
}
