from ultralytics import YOLO
import pandas as pd
import numpy as np
from typing import Dict, List, Any
import logging

logger = logging.getLogger(__name__)

class YOLOPredictor:
    def __init__(self, model_path: str, species_data_path: str):
        """Initialiser le prédicteur YOLO"""
        self.model = YOLO(model_path)
        self.species_data = self._load_species_data(species_data_path)
        logger.info(f"Modèle chargé depuis {model_path}")
    
    def _load_species_data(self, csv_path: str) -> pd.DataFrame:
        """Charger les données des espèces depuis le CSV"""
        try:
            df = pd.read_csv(csv_path,encoding='utf-8',sep=';')
            logger.info(f"Données des espèces chargées : {len(df)} espèces")
            return df
        except Exception as e:
            logger.error(f"Erreur lors du chargement du CSV : {e}")
            # Créer un DataFrame par défaut si le CSV n'existe pas
            return pd.DataFrame({
                'nom': ['Inconnu'],
                'nom_scientifique': ['Unknown'],
                'description': ['Espèce non identifiée'],
                'habitat': ['Non spécifié'],
                'taille': ['Non spécifié']
            })
    
    def predict(self, image_path: str) -> Dict[str, Any]:
        """Faire une prédiction sur une image"""
        try:
            # Faire la prédiction avec YOLO
            results = self.model(image_path, conf=0.25)  # Seuil de confiance à 25%
            
            if len(results) == 0 or len(results[0].boxes) == 0:
                return {
                    'success': False,
                    'espece': None,
                    'confidence': 0.0,
                    'description': '',
                    'famille': '',
                    'funFact': '',
                    'habitat': '',
                    'nomLatin': '',
                    'region': '',
                    'taille': ''
                }
            
            # Récupérer la meilleure prédiction
            best_detection = self._get_best_detection(results[0])
            
            if best_detection is None:
                return {
                    'success': False,
                    'espece': None,
                    'confidence': 0.0,
                    'description': '',
                    'famille': '',
                    'funFact': '',
                    'habitat': '',
                    'nomLatin': '',
                    'region': '',
                    'taille': ''
                }
            
            # Récupérer les informations de l'espèce
            species_info = self._get_species_info(best_detection['class_name'])
            
            return {
                'success': True,
                'espece': best_detection['class_name'],  
                'confidence': float(best_detection['confidence']),
                'description': species_info.get("Description", ''),
                'nomLatin': species_info.get("Nom latin", ''),
                'famille': species_info.get("Famille", ''),
                'taille': species_info.get("Taille", ''),
                'region': species_info.get("Région", ''),
                'habitat': species_info.get("Habitat", ''),
                'funFact': species_info.get("Fun fact", '')               
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de la prédiction : {e}")
            return {
                'success': False,
                'espece': None,
                'confidence': 0.0,
                'description': '',
                'famille': '',
                'funFact': '',
                'habitat': '',
                'nomLatin': '',
                'region': '',
                'taille': ''
            }
    
    def _get_best_detection(self, result) -> Dict[str, Any]:
        """Récupérer la meilleure détection"""
        if len(result.boxes) == 0:
            return None
        
        # Trouver la détection avec la plus haute confiance
        confidences = result.boxes.conf.cpu().numpy()
        best_idx = np.argmax(confidences)
        
        class_id = int(result.boxes.cls[best_idx].cpu().numpy())
        confidence = float(confidences[best_idx])
        class_name = result.names[class_id]
        
        return {
            'class_id': class_id,
            'class_name': class_name,
            'confidence': confidence
        }
    
    def _get_species_info(self, animal_name: str) -> Dict[str, str]:
        """Récupérer les informations détaillées d'une espèce"""
        try:
            # Chercher l'animal dans les données (insensible à la casse)
            mask = self.species_data['Espece'].str.lower() == animal_name.lower()
            species_row = self.species_data[mask]
            
            if species_row.empty:
                return {
                    'Espece': animal_name,
                    'Nom latin': 'Non disponible',
                    'Description': 'Informations non disponibles pour cette espèce',
                    'Famille': 'Non spécifié',
                    'Taille': 'Non spécifié',
                    'Région': 'Non spécifié',
                    'Habitat': 'Non spécifié',
                    'Fun fact': 'Non spécifié'
                }
            
            row = species_row.iloc[0]
            return {
                'Espece': row.get('Espece', animal_name),
                'Nom latin': row.get('Nom latin', 'Non disponible'),
                'Description': row.get('Description', 'Pas de description disponible'),
                'Famille': row.get('Famille', 'Non spécifié'),
                'Taille': row.get('Taille', 'Non spécifié'),
                'Région': row.get('Région', 'Non spécifié'),
                'Habitat': row.get('Habitat', 'Non spécifié'),
                'Fun fact': row.get('Fun fact', 'Non spécifié')
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des infos espèce : {e}")
            return {
                'Espece': animal_name,
                'Nom latin': 'Erreur',
                'Description': 'Erreur lors de la récupération des informations',
                'Famille': 'Erreur',
                'Taille': 'Erreur',
                'Région': 'Erreur',
                'Habitat': 'Erreur',
                'Fun fact': 'Erreur'
            }
    
    def get_species_list(self) -> List[str]:
        """Récupérer la liste de toutes les espèces supportées"""
        try:
            return list(self.model.names.values())
        except Exception as e:
            logger.error(f"Erreur lors de la récupération de la liste des espèces : {e}")
            return []