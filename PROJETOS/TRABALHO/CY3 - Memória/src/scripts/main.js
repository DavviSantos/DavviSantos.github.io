//Factory
function urlBuilder(number) {
    number+="";

    number = number.padStart(2, '0');

    return `images/heros/card${number}.jpeg`;
}

//Construindo Objetos das class
let card = new CardManager(urlBuilder);
let board = new BoardManager("board", 50, card);

//Pega elementos do DOM
let menu = document.getElementById('menu');
let select = document.getElementById('numCards');
let start = document.getElementById('start');

//Configuração Menu
for (let i = 4; i <= 10; i+=2) {
    let n = i*i; //i ao quadrado

    //Criar opção de seleção
    let op = document.createElement('option');

    op.value=n;
    op.innerHTML=n;

    //adicionando opção à página
    select.appendChild(op);
}

//Função Event listeners
start.addEventListener('click', ()=>{
    menu.classList.add('hidden');
    board.node.classList.remove('hidden')
    board.fill(select.value);
});

board.node.addEventListener('click', ()=> {
    if(board.check()) {
        setTimeout(()=> {
            menu.classList.remove('hidden');
            board.node.classList.add('hidden');
        }, 2000)
    }
})