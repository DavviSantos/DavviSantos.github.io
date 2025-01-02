const carrossel = document.querySelector('.carrossel');
const itens = document.querySelectorAll('.carrossel-item');
const bntVoltar = document.querySelector('.voltar');
const bntAvancar = document.querySelector('.avancar');
const indicadores = document.querySelector('.indicadores');

let index = 0;

function criarIndicadores() {
    indicadores.innerHTML = ''; // Limpa os indicadores existentes

    itens.forEach((_, i) => {
        const span = document.createElement('span');
        if (i === 0) {
            span.classList.add('ativo'); // Marca o primeiro indicador como ativo
        }
        indicadores.appendChild(span);
    });
}

function MostrarCarrossel(newIndex) {
    if (newIndex < 0) {
        index = itens.length -1;
    } else if (newIndex >= itens.length) {
        index = 0;
    } else {
        index = newIndex;
    }

    const offset = -index * 100;
    carrossel.style.transform = `translateX(${offset}%)`;

    atualizarIndicadores();
}

// Função para atualizar os indicadores
function atualizarIndicadores() {
    const spans = indicadores.querySelectorAll('span');
    spans.forEach((span, i) => {
        span.classList.remove('ativo'); // Remove a classe 'ativo' de todos os indicadores
        if (i === index) {
            span.classList.add('ativo'); // Marca o indicador correspondente como ativo
        }
    });
}

bntVoltar.addEventListener('click', () => MostrarCarrossel(index -1));
bntAvancar.addEventListener('click', () => MostrarCarrossel(index +1));

criarIndicadores();
MostrarCarrossel(index);