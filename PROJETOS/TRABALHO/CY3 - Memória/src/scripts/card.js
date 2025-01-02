//Classe para gerenciar cards

class CardManager{
    //atributos
    flippedCards = new Set(); //cria conjunto de cartas viradas
    urlFactory;

    constructor(factory) {
        this.urlFactory = factory;
    }

    //Gera cards baseados no numero escolhido no menu
    gen(heroNumber) {
        let template = document.getElementById("cardTemplate");
        let clone = template.content.cloneNode(true);

        //obtem referncia da imagem no DOM
        let img = clone.querySelector('img');

        //muda o src da imagem
        img.setAttribute('src', this.urlFactory(heroNumber));

        clone.children[0].addEventListener('click',
            event => this.onClick(event));

        return clone;
    }

    //função para selecionar carta
    onClick(event) {
        if (this.flippedCards.size >= 2) {
            this.endTurn();
        }
        else {
            this.flip(event.target);
        }
    }

    //Vira a carta selecionada
    flip(cardNode) {
        cardNode.children[0].classList.add('selected');
        //adiciona carta a lista de viradas
        this.flippedCards.add(cardNode);
    }

    //desvira
    unFlip(cardNode){
        cardNode.children[0].classList.remove('selected');
    }

    //desabilita ao encontrar par
    disable(cardNode) {
        cardNode.children[0].classList.add('matched');//adiciona classe matched
        this.unFlip(cardNode);//desvira
    }

    //verifica o par
    check() {
        let urls = [...this.flippedCards].map((card)=>{
            return card.querySelector('img').src;
        })

        //retorma true caso sejam cartas iguais
        return urls[0] == urls[1];
    }

    //finaliza o turno
    endTurn() {

        let handler = this.check() ? (card)=>this.disable(card): this.unFlip;
        
        this.flippedCards.forEach(handler);

        this.flippedCards.clear();
    }
}
