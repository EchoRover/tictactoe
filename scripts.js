function populate(){
    let board = document.getElementById("board");
    for (let i = 0;i < 9;i++){
        let box = document.createElement('div')
        box.innerHTML = ""
        box.className = "box"
        box.setAttribute("index",i)
        box.addEventListener('click',() => click(box));


        board.appendChild(box)
    }

}

function click(box){
    if (turn == "gameover") {
        return
    }
    if (box.innerHTML != ""){
        return
    }

    let bar = document.getElementById("move")
    
    

    if (bar.style.backgroundColor == "blue") {
        bar.style.backgroundColor = "green";
        bar.innerHTML = "X turn"
    }else{
        bar.style.backgroundColor = "blue"
        bar.innerHTML = "O turn"

    }
    addOption(box)
}


function addOption(box){
    

    
    if (turn % 2 == 0){
        box.innerHTML = "X"
    } else{
        box.innerHTML = "O"
    }
    turn += 1;

        

    winsetup()
    aimove()
    turn += 1
    winsetup()

    
}


function reset(){
    for (let i = 0; i < 9; i++) {
        let box = document.querySelector(`[index="${i}"]`);
        box.innerHTML = "";
        box.style.color = "black"
    }
    let bar = document.getElementById("move")
    bar.innerHTML = ""
    bar.style.backgroundColor = "var(--GREY)"
    turn = 0
    
}

function winsetup(){
    if (isawin()){
        turn = "gameover"
        let bar = document.getElementById("move")
        if (isawin() == "draw"){
            bar.innerHTML = "Draw"

        }else{
            bar.innerHTML = `${isawin()} wins`
        }
        bar.style.backgroundColor = "var(--GREEN)"

    }

}


function isawin() {

    const winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]  
    ]

    var board = [];
    var board2 = [];

    for (let i = 0; i < 9; i++) {
        let box = document.querySelector(`[index="${i}"]`);
        board.push(box.innerHTML);
        board2.push(box)
    }

    for (const combination of winning_combinations) {
        const [a, b, c] = combination;
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
            board2[a].style.color = "var(--GREEN)"
            board2[b].style.color = "var(--GREEN)"
            board2[c].style.color = "var(--GREEN)"

            return board[a];
        }
    }
    if (!board.includes('')) {
        return 'draw';
    }
    return null

    
}
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

function aimove(){
    if (isawin()){
        return
    }
    let board = []
    for (let i = 0; i < 9; i++) {
        let box = document.querySelector(`[index="${i}"]`);
        board.push(box.innerHTML);
    }
    let spaces = []
    for (let i = 0;i < 9 ;i ++){
        if (board[i] === ""){
            spaces.push(i)
        }
    }
    const val = spaces.sample()
    console.log(spaces)
    let box = document.querySelector(`[index = "${val}"]`)
    if (turn % 2 == 0){
        box.innerHTML = "X"
    }else{
        box.innerHTML = "O"
    }



}

var turn = 0;
populate()