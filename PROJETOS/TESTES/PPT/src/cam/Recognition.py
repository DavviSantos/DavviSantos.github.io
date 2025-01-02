import cv2
import mediapipe as mp

class ReconhecimentoMao:
    def __init__(self):
        # Inicializar o MediaPipe Hands
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.7)
        self.mp_drawing = mp.solutions.drawing_utils

    def identificar_jogada(self, landmarks):
        """Identifica a jogada do jogador com base nos marcos da mão."""
        if not landmarks:
            return None

        # Posições dos dedos importantes
        thumb_tip = landmarks[4].y
        index_tip = landmarks[8].y
        middle_tip = landmarks[12].y
        ring_tip = landmarks[16].y
        pinky_tip = landmarks[20].y

        # Condições para determinar pedra, papel ou tesoura
        if thumb_tip < index_tip and index_tip < middle_tip and middle_tip < ring_tip and ring_tip < pinky_tip:
            return "papel"
        elif thumb_tip > index_tip and index_tip > middle_tip and middle_tip > ring_tip and ring_tip > pinky_tip:
            return "pedra"
        else:
            return "tesoura"
