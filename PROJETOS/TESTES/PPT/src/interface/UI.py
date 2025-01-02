import cv2
from PIL import Image, ImageTk
import tkinter as tk
from jogo.jogo import Jogo
from reconhecimento.reconhecimento import ReconhecimentoMao

class UI:
    def __init__(self, jogo, reconhecimento_mao):
        self.jogo = jogo
        self.reconhecimento_mao = reconhecimento_mao

        self.window = tk.Tk()
        self.window.title("Jogo Pedra, Papel, Tesoura")

        # Inicializa a captura da câmera
        self.cap = cv2.VideoCapture(0)

        # Label para exibir a imagem da câmera
        self.label_video = tk.Label(self.window)
        self.label_video.pack(pady=20)

        # Título do jogo
        self.label = tk.Label(self.window, text="Bem-vindo ao Jogo Pedra, Papel e Tesoura!", font=("Helvetica", 14))
        self.label.pack(pady=20)

        # Botão para iniciar rodada
        self.button_rodada = tk.Button(self.window, text="Iniciar Rodada", font=("Helvetica", 12), command=self.iniciar_rodada)
        self.button_rodada.pack(pady=20)

        # Botão para sair
        self.button_sair = tk.Button(self.window, text="Sair", font=("Helvetica", 12), command=self.window.quit)
        self.button_sair.pack(pady=20)

    def iniciar_rodada(self):
        """Inicia uma nova rodada no jogo"""
        self.jogo.iniciar_rodada()
        self.atualizar_frame()

    def atualizar_frame(self):
        """Captura e processa os quadros da câmera para identificar a jogada do jogador."""
        ret, frame = self.cap.read()
        if not ret:
            return

        # Converter para RGB para o MediaPipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Processar com o MediaPipe
        result = self.reconhecimento_mao.hands.process(rgb_frame)

        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                self.reconhecimento_mao.mp_drawing.draw_landmarks(frame, hand_landmarks, self.reconhecimento_mao.mp_hands.HAND_CONNECTIONS)

                # Identificar a jogada do jogador
                self.jogo.jogada_jogador = self.reconhecimento_mao.identificar_jogada(hand_landmarks.landmark)
                if self.jogo.jogada_jogador:
                    cv2.putText(frame, f"Jogada: {self.jogo.jogada_jogador}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # A máquina escolhe sua jogada aleatória
        if self.jogo.jogada_jogador:
            self.jogo.escolher_jogada_maquina()
            self.jogo.determinar_resultado()
            cv2.putText(frame, f"Máquina: {self.jogo.jogada_maquina}", (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            cv2.putText(frame, f"Resultado: {self.jogo.resultado}", (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # Converter a imagem para o formato do Tkinter
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(frame_rgb)
        img_tk = ImageTk.PhotoImage(image=img)

        # Atualizar a imagem no label
        self.label_video.img_tk = img_tk
        self.label_video.config(image=img_tk)

        # Continuar a atualizar o frame
        self.window.after(10, self.atualizar_frame)

    def iniciar(self):
        """Inicia a interface gráfica do jogo e captura da câmera."""
        self.atualizar_frame()
        self.window.mainloop()
