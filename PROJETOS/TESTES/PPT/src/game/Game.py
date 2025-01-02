import random

class Game:
    def __init__(self):
        self.jogada_maquina = None
        self.jogada_jogador = None
        self.resultado = None
        self.rodada = 0  # Controla o número da rodada
        self.max_rodadas = 3  # Definindo o número máximo de rodadas do jogo

    def iniciar_rodada(self):
        """Inicia uma nova rodada. Escolhe a jogada da máquina e aguarda a jogada do jogador."""
        if self.rodada < self.max_rodadas:
            self.rodada += 1
            print(f"Iniciando a rodada {self.rodada}...")

            # A máquina escolhe sua jogada aleatória
            self.jogada_maquina = self.escolher_jogada_maquina()

            # Aguardar a jogada do jogador ser identificada pela câmera
            # Isso seria feito na parte da interface gráfica com o MediaPipe
            print("Aguardando a jogada do jogador...")

            # Neste ponto, a jogada do jogador seria identificada pela câmera
            # e atribuída à variável self.jogada_jogador

            # Determina o resultado da rodada
            self.determinar_resultado()

        else:
            print("Número máximo de rodadas atingido!")

    def escolher_jogada_maquina(self):
        """Escolhe uma jogada aleatória para a máquina."""
        return random.choice(["pedra", "papel", "tesoura"])

    def determinar_resultado(self):
        """Determina o resultado da rodada entre o jogador e a máquina."""
        if self.jogada_jogador == self.jogada_maquina:
            self.resultado = "Empate!"
        elif (self.jogada_jogador == "pedra" and self.jogada_maquina == "tesoura") or \
             (self.jogada_jogador == "tesoura" and self.jogada_maquina == "papel") or \
             (self.jogada_jogador == "papel" and self.jogada_maquina == "pedra"):
            self.resultado = "Você ganhou!"
        else:
            self.resultado = "Você perdeu!"
        
        # Exibe o resultado da rodada
        print(f"Jogada do jogador: {self.jogada_jogador}")
        print(f"Jogada da máquina: {self.jogada_maquina}")
        print(f"Resultado: {self.resultado}")

    def jogar_novamente(self):
        """Reseta a rodada e permite jogar novamente."""
        self.rodada = 0
        print("Jogo reiniciado! Começando uma nova rodada...")