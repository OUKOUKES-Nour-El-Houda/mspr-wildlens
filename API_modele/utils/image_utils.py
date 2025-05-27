import cv2
import numpy as np
from PIL import Image
import logging

logger = logging.getLogger(__name__)

def process_image(image_path: str, target_size: tuple = (640, 640)) -> str:
    """
    Traiter une image avant la prédiction
    - Redimensionnement
    - Amélioration de la qualité si nécessaire
    """
    try:
        # Lire l'image avec OpenCV
        image = cv2.imread(image_path)
        
        if image is None:
            raise ValueError(f"Impossible de lire l'image : {image_path}")
        
        # Redimensionner l'image si elle est trop grande
        height, width = image.shape[:2]
        max_dimension = max(target_size)
        
        if max(height, width) > max_dimension:
            scale = max_dimension / max(height, width)
            new_width = int(width * scale)
            new_height = int(height * scale)
            image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)
        
        # Améliorer la netteté (optionnel)
        if should_enhance_image(image):
            image = enhance_image(image)
        
        # Sauvegarder l'image traitée
        processed_path = image_path.replace('.', '_processed.')
        cv2.imwrite(processed_path, image)
        
        return processed_path
        
    except Exception as e:
        logger.error(f"Erreur lors du traitement de l'image : {e}")
        # Retourner le chemin original si le traitement échoue
        return image_path

def should_enhance_image(image: np.ndarray) -> bool:
    """Déterminer si l'image a besoin d'amélioration"""
    # Calculer la variance du Laplacien pour mesurer la netteté
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    # Si la variance est faible, l'image est floue
    return laplacian_var < 100

def enhance_image(image: np.ndarray) -> np.ndarray:
    """Améliorer la qualité d'une image"""
    try:
        # Appliquer un filtre de netteté
        kernel = np.array([[-1,-1,-1],
                          [-1, 9,-1],
                          [-1,-1,-1]])
        sharpened = cv2.filter2D(image, -1, kernel)
        
        # Améliorer le contraste
        lab = cv2.cvtColor(sharpened, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        l = clahe.apply(l)
        enhanced = cv2.merge([l, a, b])
        enhanced = cv2.cvtColor(enhanced, cv2.COLOR_LAB2BGR)
        
        return enhanced
        
    except Exception as e:
        logger.error(f"Erreur lors de l'amélioration de l'image : {e}")
        return image

def validate_image(image_path: str) -> bool:
    """Valider qu'une image est lisible et correcte"""
    try:
        with Image.open(image_path) as img:
            img.verify()  # Vérifier que l'image n'est pas corrompue
        return True
    except Exception as e:
        logger.error(f"Image invalide {image_path}: {e}")
        return False