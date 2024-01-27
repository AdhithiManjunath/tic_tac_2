// function drawBox(container, row , col , letter = ''){
//     const box = document.createElement('div');
//     box.className = 'box';
//     box.id = `box${row}${col}`;
//     box.textContent = letter;

// const update = require("ipfs-api/src/update");

//     container.appendChild(box);
//     return box;

// }

// function drawGrid(container){
//   const grid = document.createElement('div');
//   grid.className = 'grid';

//   for(let i=0; i<6; i++){
//     for(let j=0; j<5; j++){
//       drawBox(grid,i,j);
//     }

//   }
//   container.appendChild(grid);
// }

// function startup(){
//   const game = document.getElementById('game');
//   drawGrid(game);
// }

// startup(); // for beginning of the code 



const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restart");

const winCondition = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initGame();


function initGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restart.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
}

function cellClicked(){
      const cellIndex = this.getAttribute("cellIndex");
      if(options[cellIndex]!="" || !running){
          return ;
      }
      else{
        updateCell(this,cellIndex);
        // changePlayer();
        checkWinner();
      }
}

function updateCell(cell,index){
        options[index]= currentPlayer;
        cell.textContent = currentPlayer; 

}

function changePlayer(){
         currentPlayer = (currentPlayer == "X")?"O":"X";
         statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i=0; i<winCondition.length;i++){
      const condition = winCondition[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];
      if(cellA == ""|| cellB == ""|| cellC == ""){
        continue;
      }
      if(cellA == cellB  && cellB == cellC){
        roundWon = true;
        break;
      }
    }
    if(roundWon == true){
      statusText.textContent =`${currentPlayer} wins`;
      running = false;
    }
    else if (!options.includes("")){
      statusText.textContent = 'game over , no one wins ';
      running = false;
    }
    else{
      changePlayer();
    }

}
function restartGame(){
      currentPlayer = "X";
      options = ["","","","","","","","",""];
      statusText.textContent = `${currentPlayer}'s turn `;
      cells.forEach(cell =>(cell.textContent = " "));
      running = true;

}