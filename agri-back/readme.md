## Prérequis
 
 Création et utilisation Environnement virtuel :
 Sous Linux  :
 ```bash
 python -m venv venv && source venv/bin/activate
 ```
 Sous Windows : 
  ```bash
 python -m venv venv &&  venv/Scripts/activate
 ```
 Installez les dépendances avec :
 
 ```bash
 pip install -r requirements.txt
 ```
 
 ## Lancer le projet
 
 Exécutez le serveur FastAPI avec :
 
 ```bash
 python -m uvicorn main:app --reload
 ```
 
 Le serveur sera accessible sur : [http://127.0.0.1:8000](http://127.0.0.1:8000)
 
 ## Documentation
 
 Une documentation interactive est disponible :
 
 - **Swagger UI** : [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
 - **ReDoc** : [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
 
 
 
 ## Variables d'environnement
 
 Créez un fichier `.env` et ajoutez :
 
 ```
GOOGLE_API_KEY = "your API key"
 ```