document.addEventListener("DOMContentLoaded",()=>{
    const width=8;
    const container=document.querySelector(".container");
    const squares=[];
    let score = 0;
    let target;

    target = Math.floor(Math.random() * (150 - 50 + 1)) + 50;

    let minutes;
    minutes = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    console.log(minutes)


    let seconds;
    seconds = Math.floor(Math.random() * 60);
    console.log(seconds);
    console.log(target);
    let Display = document.getElementById("score");
    let popups = document.querySelector(".popups");
    let start = document.querySelector(".start");
    let gameover = document.querySelector(".Game-over");
    let Target = document.querySelector(".Target");
    let Name = document.querySelector(".Name");
    let playerName = document.querySelector(".player-name");
    let timer = document.querySelector(".timer");

    let win = document.querySelector(".win");
    let newGame = document.querySelector(".new-game");
    let play = document.querySelector(".play-button");
    let close= document.querySelector(".close")
    const candyImage=[
        "url(https://raw.githubusercontent.com/kubowania/candy-crush/master/images/blue-candy.png)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/green-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/orange-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/purple-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/red-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/yellow-candy.png?raw=true)"
    ]

    //candy Generator
    function CnadyCreater(){ 
        for(let i=0;i<width*width;i++){
            const square=document.createElement("div");
            let rendomColor=Math.floor(Math.random()*candyImage.length);
            square.style.backgroundImage=candyImage[rendomColor];
            square.setAttribute('draggable',true);
            square.setAttribute("id",i);
            container.appendChild(square);
            squares.push(square);
        }
    }
    CnadyCreater();
    
    //drag Candy
    let colorDraged;
    let colorReplaced;
    let DreagId;
    let RplaceId;
    squares.forEach(square => square.addEventListener("dragstart",dragStart));
    squares.forEach(square => square.addEventListener("dragend",dragEnd));
    squares.forEach(square => square.addEventListener("dragover",dragOver));
    squares.forEach(square => square.addEventListener("dragenter",dragEnter));
    squares.forEach(square => square.addEventListener("dragleave",dragLeave));
    squares.forEach(square => square.addEventListener("drop",dragDrop));
    function dragStart(){
    colorDraged=this.style.backgroundImage;
     DreagId=parseInt(this.id);
}
function dragEnd(){
    let validMoves=[ DreagId-1, DreagId-width, DreagId+1, DreagId+width ]
    let validMove=validMoves.includes(RplaceId)
    if(RplaceId && validMove){
        RplaceId=null;
    }else if(RplaceId && !validMove){
        squares[RplaceId].style.backgroundImage=colorReplaced;
        squares[DreagId].style.backgroundImage=colorDraged;
    }else squares[DreagId].style.backgroundImage=colorDraged;
}
function dragOver(e){
    e.preventDefault()
}
function dragEnter(e){
    e.preventDefault()
}
function dragLeave(){
    
}
function dragDrop(){
    colorReplaced=this.style.backgroundImage;
    RplaceId=parseInt(this.id);
    this.style.backgroundImage=colorDraged;
    squares[DreagId].style.backgroundImage=colorReplaced;
}
 //drop candies once some have been cleared
 function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundImage === "") {
            squares[i + width].style.backgroundImage =
                squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = "";
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);
            if (isFirstRow && squares[i].style.backgroundImage === "") {
                let randomImage=Math.floor(Math.random()*candyImage.length)
                squares[i].style.backgroundImage=candyImage[randomImage]
            }
        }
    }
}
//audio
function CandyAudio(){
    let audio= new Audio("audio_audio.mp3");
    audio.play();
}

//check row for four
function checkRowForFour() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        // const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
        // if (notValid.includes(i)) continue;

        if (rowOfFour.every((index) =>squares[index].style.backgroundImage === decidedColor &&!isBlank))
         {
            score += 4;
            Display.innerHTML = score;
            rowOfFour.forEach((index) => {
                CandyAudio();
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkRowForFour();

//for column of Four
function checkColumnForFour() {
    for (i = 0; i < 39; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        if (
            columnOfFour.every(
                (index) =>
                    squares[index].style.backgroundImage === decidedColor &&
                    !isBlank
            )
        ) {
            score += 4;
            Display.innerHTML = score;
            columnOfFour.forEach((index) => {
                CandyAudio();
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkColumnForFour();

//for row of Three
function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        // const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];
        // if (notValid.includes(i)) continue;

        if (rowOfThree.every((index) =>squares[index].style.backgroundImage === decidedColor &&!isBlank)) 
        {
            score += 3;
            Display.innerHTML = score;
            rowOfThree.forEach((index) => {
                CandyAudio();
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkRowForThree();

//for column of Three
function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
         if (columnOfThree.every((index) =>squares[index].style.backgroundImage === decidedColor &&!isBlank)) 
        {
            score += 3;
            Display.innerHTML = score;
            columnOfThree.forEach((index) => {
                CandyAudio();
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkColumnForThree();

newGame.addEventListener('click', () => {
    window.location.reload();
})
    
// Function to update the timer display
function updateTimer() { 

    timer.innerHTML = `${minutes}:${seconds}`;

    // Decrement the time
    if (seconds === 0 && minutes === 0) {
        clearInterval(timerInterval);
    } else if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    if (seconds === 0 && minutes == 0 && score != target && score < target) {
        popups.style.display = "block";
        gameover.style.display = "block";
    }
}



play.addEventListener('click', () => {
    popups.style.display = "none";
    start.style.display = "none";
    playerName.innerHTML = Name.value;
    Target.innerHTML = target;

    // Set the timer to update every second
    setInterval(updateTimer, 1000);
});
    
    close.addEventListener('click', () => {
        popups.style.display = "none";
        if (  win.style.display = "block") {
            win.style.display = "none";
        }
        
        if (gameover.style.display = "block") {
            gameover.style.display = "none";
        }
})
function wineer() {
    if (score === target || score > target) {
        popups.style.display = "block";
        win.style.display = "block";
       
    }
}

window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
    wineer();
}, 100);
    
    window.setTimeout(function () {
        Display.innerHTML = 0
    },10000);
    
window.onload = function () {
    popups.style.display = "block";
    start.style.display = "block";
}
});