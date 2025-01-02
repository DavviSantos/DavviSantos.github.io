//Gerencia o tabuleiro
class BoardManager {
    cardManager; //objeto para manipular carta no tabuleiro

    node; // elemento do DOM referente ao tabuleiro

    numImgs;
    curNumCards;

    constructor(id, numImgs, cardManager) {
        this.node = document.getElementById(id)

        this.numImgs = numImgs;
        this.cardManager = cardManager;
    }

    //Limpar tabuleiro
    clear() {
        this.node.innerHTML = "";
    }

    //adiciona o numeros de cartas selecionadas no menu
    fill(numberCards) {
        if(numberCards>2*this.numImgs) {
            console.error('Error: Not enough images for $(numeberCards) cards.')
            
            //Ajusta o número de cartas e continua o game
            numberCards = 2*this.numImgs;
        }

        numberCards = parseInt(numberCards); //Garante que numerCards seja inteiro
        this.curNumCards = numberCards;

        this.clear(); //Reseta Tabuleiro

        this.genRandomList(numberCards).forEach((number)=>{
            this.addCard(this.cardManager.gen(number));
        })
        
        this.adjustCSS();
    }

    //adiciona uma carta
    addCard(card) {
        this.node.appendChild(card);
    }

    genRandomList(size) {
        let list = Array(size/2).fill().map((_,i)=>i+1);
        console.log({list});

        list = [...list,...list].sort(()=>Math.random()-0.5);
        return list;
    }

    check() {
        let flipped = document.getElementsByClassName('matched');

        return flipped.length >= this.curNumCards;
    }

    adjustCSS() {
        // calcula o numero de colunas
        let cols = Math.sqrt(this.curNumCards);
        //calcula o tamanho das cartas
        let size = (100/cols -1);
        //transformmando o numero em formato CSS
        size+='vmin';

        document.documentElement.style.setProperty("--numCols", cols);
        document.documentElement.style.setProperty("--size", size);

    }
}