
var tempo_segundos = 20;
var qtde_meteoros = 10;
var timerId;

function iniciaJogo() {
    document.getElementById('cronometro').innerHTML = tempo_segundos;
    document.getElementById('meteoros').innerHTML = qtde_meteoros;
    document.getElementById('explosoes').innerHTML = 0;
    cria_meteoros(qtde_meteoros);
    iniciaCronometro(tempo_segundos + 1);
}

function start() {
    window.location.reload();
}

function cria_meteoros(qtde_meteoros) {

    for (var i = 1; i <= qtde_meteoros; i++) {
        var meteoro = document.createElement("img");
        meteoro.src = "img/meteoro.png";
        meteoro.width = "30";
        meteoro.id = "m" + i;
        meteoro.onclick = function() {
            explodir(this);
        }

        meteoro.style.marginTop = (Math.random() * 100) + 'px';
        meteoro.style.marginBottom = (Math.random() * 100) + 'px';
        meteoro.style.marginLeft = (Math.random() * 100) + 'px';
        meteoro.style.marginRight = (Math.random() * 100) + 'px';

        document.getElementById("cenario").append(meteoro);
    }
}

function iniciaCronometro(segundos) {
    segundos--;
    if (segundos == -1) {
        clearTimeout(timerId); //para a execução do setTimeout
        gameOver();
        return false;
    }
    document.getElementById("cronometro").innerHTML = segundos;
    timerId = setTimeout("iniciaCronometro (" + segundos + ")", 1000);
    movimentaMeteoros();
}

function explodir(m) {
    var idMeteoro = m.id;
    var explosao = document.createElement("img");
    explosao = "img/explosao.png";
    explosao.width = "40";
    document.getElementById(idMeteoro).src = explosao;
    document.getElementById(idMeteoro).setAttribute("onclick", "");

    pontuacao(-1);
}

function pontuacao(pontos) {
    var qtde_meteoros = document.getElementById("meteoros").innerHTML;
    var qtde_explosoes = document.getElementById("explosoes").innerHTML;

    qtde_meteoros = parseInt(qtde_meteoros);
    qtde_explosoes = parseInt(qtde_explosoes);

    qtde_meteoros = qtde_meteoros + pontos;
    qtde_explosoes = qtde_explosoes - pontos;

    document.getElementById("meteoros").innerHTML = qtde_meteoros;
    document.getElementById("explosoes").innerHTML = qtde_explosoes;

    situacaoJogo(qtde_meteoros);
}

function situacaoJogo(qtde_meteoros) {
    if (qtde_meteoros == 0) {
        clearTimeout(timerId);
        $("#cenario").removeClass("terra");
        $("#cenario").addClass("terraSalva");
        deletaMeteoros();
    }
}

function deletaMeteoros() {
    var i = 1;
    while (document.getElementById("m" + i)) {
        document.getElementById("m" + i).setAttribute("src", "");
        i++;
    }
}

function gameOver() {
    clearTimeout(timerId);
    $("#cenario").removeClass("terra");
    $("#cenario").addClass("terraDestruida");
    deletaMeteoros();
    somExplosao = new sound("som/bomba.mp3");
    somExplosao.play();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.stop();
    }
}

function movimentaMeteoros() {
    var i = 1;
    while (document.getElementById("m" + i)) {
        var meteoro = document.getElementById("m" + i);
        var posicao = Math.floor((Math.random() * 150));
        var posicaoAnterior = meteoro.style.get
        meteoro.style.marginTop = posicao + "px";
        i++;
    }
}
