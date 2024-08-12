function Player(name,marker){
    this.name= name;
    this.marker=marker;
}

const player1= new Player("Player 1", "X");
const player2= new Player("Player 2", "O");

const startBtn= document.querySelector("#startBtn")
const board= document.querySelector("#board")

const changeNames=document.querySelector("#editBtn")
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector("#cancelBtn")

changeNames.addEventListener('click', ()=>{
dialog.showModal();
})

closeDialog.addEventListener('click',()=>{
dialog.close();

})
startBtn.addEventListener('click', ()=>{
const gameboard=document.createElement('div');
gameboard.classList.add('gameboard');

for (let index = 0; index < 9; index++) {
    const cell=document.createElement('div');
    cell.classList.add('cell');
    gameboard.append(cell);
    
    
}
board.append(gameboard);
})