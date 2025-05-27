from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
from werkzeug.utils import secure_filename
import logging
from utils.model_utils import YOLOPredictor
from utils.image_utils import process_image

# Configuration
app = Flask(__name__)
CORS(app)

# Configuration des dossiers
UPLOAD_FOLDER = 'uploads'
MODEL_PATH = 'models/best.pt'
SPECIES_DATA_PATH = r'data\infos_especes_modifiees.csv'

# Créer le dossier uploads s'il n'existe pas
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configuration Flask
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialiser le prédicteur YOLO
try:
    predictor = YOLOPredictor(MODEL_PATH, SPECIES_DATA_PATH)
    logger.info("Modèle YOLO chargé avec succès")
except Exception as e:
    logger.error(f"Erreur lors du chargement du modèle : {e}")
    predictor = None

@app.route('/')
def home():
    return 'Bienvenue sur l\'application YOLO!'    

@app.route('/health', methods=['GET'])
def health_check():
    """Vérifier que l'API fonctionne"""
    status = {
        'status': 'healthy',
        'model_loaded': predictor is not None
    }
    return jsonify(status)

@app.route('/predict', methods=['POST'])
def predict_animal():
    """Prédire l'animal à partir d'une image d'empreinte"""
    try:
        # Vérifier qu'un fichier a été envoyé
        if 'image' not in request.files:
            return jsonify({'error': 'Aucune image fournie'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'Aucun fichier sélectionné'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Format de fichier non supporté'}), 400
        
        # Sauvegarder le fichier temporairement
        filename = secure_filename(f"{uuid.uuid4()}_{file.filename}")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Traiter l'image et faire la prédiction
            processed_image = process_image(filepath)
            prediction_result = predictor.predict(processed_image)
            
            # Nettoyer le fichier temporaire
            os.remove(filepath)
            
            return jsonify(prediction_result)
            
        except Exception as e:
            # Nettoyer le fichier en cas d'erreur
            if os.path.exists(filepath):
                os.remove(filepath)
            raise e
            
    except Exception as e:
        logger.error(f"Erreur lors de la prédiction : {e}")
        return jsonify({'error': 'Erreur lors du traitement de l\'image'}), 500

@app.route('/species', methods=['GET'])
def get_all_species():
    """Récupérer la liste de toutes les espèces supportées"""
    try:
        species_list = predictor.get_species_list()
        return jsonify({'species': species_list})
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des espèces : {e}")
        return jsonify({'error': 'Erreur serveur'}), 500

def allowed_file(filename):
    """Vérifier si le format de fichier est autorisé"""
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    if predictor is None:
        logger.error("Impossible de démarrer l'API : modèle non chargé")
        exit(1)
    
    app.run(host='0.0.0.0', port=5000, debug=False)