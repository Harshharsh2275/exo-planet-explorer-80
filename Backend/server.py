from flask import Flask, request, jsonify, send_file
import pickle
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
import os
import json
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
CORS(app)
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Model configuration
MODELS = {
    'k2pandc': {
        'knn': 'D:/NASA/Code/knn_model_k2_dispo.pkl',
        'rf': 'D:/NASA/Code/rf_model_k2_dispo.pkl',
        'cnn': {
            'model': 'D:/NASA/Code/best_model_k2_dispo.keras',
            'preprocessing': 'D:/NASA/Code/cnn_preprocessing_k2_dispo.pkl'
        }
    },
    'cumi': {
        'knn': 'D:/NASA/Code/knn_cumi_model.pkl',
        'rf': 'D:/NASA/Code/rf_cumi_model.pkl',
        'cnn': {
            'model': 'D:/NASA/Code/best_model_cummi.keras',
            'preprocessing': 'D:/NASA/Code/cnn_preprocessing_cummi.pkl'
        }
    }
}

model_descriptions = {
  "random-forest": {
    "icon": "Brain",
    "title": "Random Forest Classifier",
    "description": "An ensemble learning method that constructs multiple decision trees during training and outputs the mode of their predictions.",
    "accuracy": "94.2%",
    "model_type": "rf",
    "features": [
      "Handles non-linear relationships effectively",
      "Resistant to overfitting",
      "Works well with high-dimensional data",
      "Provides feature importance rankings"
    ]
  },
  "neural-network": {
    "icon": "Network",
    "title": "Deep Neural Network",
    "description": "A multi-layered artificial neural network that learns complex patterns through backpropagation and gradient descent optimization.",
    "accuracy": "96.8%",
    "model_type": "cnn",
    "features": [
      "Captures complex non-linear patterns",
      "Adaptive feature learning",
      "High accuracy on large datasets",
      "Handles missing data gracefully"
    ]
  },
  "knn": {
    "icon": "Cpu",
    "title": "K-Nearest Neighbors",
    "description": "A simple, instance-based learning algorithm that classifies new instances based on the majority class of their k-nearest neighbors.",
    "accuracy": "91.5%",
    "model_type": "knn",
    "features": [
      "Effective in high-dimensional spaces",
      "Memory efficient",
      "Versatile kernel functions",
      "Robust to outliers"
    ]
  }
}

FEATURE_MAPPING_FILES = {
    'k2pandc': 'D:/NASA/Code/k2pandc_feature_mapping.csv',
    'cumi': 'D:/NASA/Code/cumi_feature_mapping.csv'
}

def load_sklearn_model(model_path):
    """Load scikit-learn models (KNN, RF)"""
    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)
    return model_data

def load_cnn_model_data(model_path, preprocessing_path):
    """Load CNN model and preprocessing objects"""
    model = load_model(model_path)
    with open(preprocessing_path, 'rb') as f:
        preprocessing_data = pickle.load(f)
    return model, preprocessing_data

def predict_sklearn(model_data, features):
    """Make prediction using sklearn models"""
    try:
        # Create DataFrame
        input_df = pd.DataFrame([features], columns=model_data['feature_names'])
        
        # Scale the input
        input_scaled = model_data['scaler'].transform(input_df)
        
        # Get prediction
        prediction = model_data['model'].predict(input_scaled)[0]
        prediction_label = model_data['label_encoder'].inverse_transform([prediction])[0]
        
        # Get probabilities
        probabilities = model_data['model'].predict_proba(input_scaled)[0]
        all_classes = model_data['label_encoder'].classes_
        
        # Create confidence dictionary
        confidence_dict = {str(all_classes[i]): float(probabilities[i] * 100) 
                          for i in range(len(all_classes))}
        
        return {
            'success': True,
            'prediction': str(prediction_label),
            'confidence_scores': confidence_dict
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def predict_cnn(model, preprocessing_data, features):
    """Make prediction using CNN model"""
    try:
        # Create DataFrame
        input_df = pd.DataFrame([features], columns=preprocessing_data['feature_names'])
        
        # Scale the input
        input_scaled = preprocessing_data['scaler'].transform(input_df)
        
        # Reshape for CNN
        input_reshaped = input_scaled.reshape(input_scaled.shape[0], input_scaled.shape[1], 1)
        
        # Get prediction probabilities
        probabilities = model.predict(input_reshaped, verbose=0)[0]
        
        # Get predicted class
        prediction = np.argmax(probabilities)
        prediction_label = preprocessing_data['label_encoder'].inverse_transform([prediction])[0]
        
        # Get all classes
        all_classes = preprocessing_data['label_encoder'].classes_
        
        # Create confidence dictionary
        confidence_dict = {str(all_classes[i]): float(probabilities[i] * 100) 
                          for i in range(len(all_classes))}
        
        return {
            'success': True,
            'prediction': str(prediction_label),
            'confidence_scores': confidence_dict
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

@app.route('/')
def home():
    return jsonify({
        'message': 'Exoplanet Prediction API',
        'endpoints': {
            '/predict': 'POST - Make predictions',
            '/get_features': 'GET - Get required features for a dataset',
            '/upload_predict': 'POST - Upload CSV and get predictions',
            '/models': 'GET - List available models',
            '/upload_dataset': 'POST - Upload custom dataset',
            '/list_datasets': 'GET - List all uploaded datasets',
            '/dataset_info/<name>': 'GET - Get dataset information',
            '/preview_dataset/<name>': 'GET - Preview dataset rows',
            '/download_dataset/<name>': 'GET - Download dataset',
            '/delete_dataset/<name>': 'DELETE - Delete dataset'
        }
    })

@app.route('/models', methods=['GET'])
def list_models():
    """List all available models"""
    return jsonify({
        'success': True,
        'models': model_descriptions
    })

def load_feature_mapping(dataset):
    """Load feature names and descriptions from CSV mapping file"""
    try:
        mapping_file = FEATURE_MAPPING_FILES.get(dataset)
        if not mapping_file or not os.path.exists(mapping_file):
            return None
        
        df = pd.read_csv(mapping_file)
        # Expected columns: feature_name, display_name, description, type
        mapping = {}
        for _, row in df.iterrows():
            mapping[row['feature_name']] = {
                'display_name': row.get('display_name', row['feature_name']),
                'description': row.get('description', ''),
                'type': row.get('type', 'numeric'),
            }
        return mapping
    except Exception as e:
        print(f"Error loading feature mapping: {e}")
        return None


@app.route('/get_features', methods=['GET'])
def get_features():
    """Get required features for a specific dataset and model with mapped names"""
    dataset = request.args.get('dataset', 'k2pandc')
    model_type = request.args.get('model', 'knn')
    
    try:
        if model_type == 'cnn':
            if dataset != 'cumi':
                return jsonify({
                    'success': False,
                    'error': 'CNN model only available for cumi dataset'
                })
            model_path = MODELS[dataset][model_type]['preprocessing']
            with open(model_path, 'rb') as f:
                preprocessing_data = pickle.load(f)
            feature_names = preprocessing_data['feature_names']
            feature_means = {k: float(v) for k, v in preprocessing_data['feature_means'].items()}
        else:
            model_path = MODELS[dataset][model_type]
            with open(model_path, 'rb') as f:
                model_data = pickle.load(f)
            feature_names = model_data['feature_names']
            feature_means = {k: float(v) for k, v in model_data['feature_means'].items()}
        
        # Load feature mapping
        feature_mapping = load_feature_mapping(dataset)
        
        # Build feature details
        features_with_details = []
        for feature in feature_names:
            feature_info = {
                'name': feature,
                'default_value': feature_means.get(feature, 0.0)
            }
            
            # Add mapped information if available
            if feature_mapping and feature in feature_mapping:
                feature_info.update({
                    'display_name': feature_mapping[feature]['display_name'],
                    'description': feature_mapping[feature]['description'],
                    'type': feature_mapping[feature]['type'],
                })
            else:
                # Fallback to original name
                feature_info.update({
                    'display_name': feature,
                    'description': '',
                    'type': 'numeric',
                })
            
            features_with_details.append(feature_info)
        
        response = jsonify({
            'success': True,
            'dataset': dataset,
            'model': model_type,
            'features': feature_names,  # Keep original for backward compatibility
            'feature_details': features_with_details,  # New detailed format
            'feature_defaults': feature_means
        })
        
        response.headers.add('Content-Type', 'application/json')
        return response
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Make prediction based on user input
    
    Expected JSON format:
    {
        "dataset": "k2pandc" or "cumi",
        "model": "knn", "rf", or "cnn",
        "features": {
            "feature1": value1,
            "feature2": value2,
            ...
        }
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No JSON data provided'
            }), 400
        
        dataset = data.get('dataset', 'k2pandc')
        model_type = data.get('model', 'knn')
        features = data.get('features', {})
        
        if not features:
            return jsonify({
                'success': False,
                'error': 'No features provided'
            }), 400
        
        # Validate dataset and model
        if dataset not in MODELS:
            return jsonify({
                'success': False,
                'error': f'Invalid dataset. Choose from: {list(MODELS.keys())}'
            }), 400
        
        if model_type not in MODELS[dataset]:
            return jsonify({
                'success': False,
                'error': f'Invalid model for {dataset}. Choose from: {list(MODELS[dataset].keys())}'
            }), 400
        
        # Load feature mapping for response enrichment
        feature_mapping = load_feature_mapping(dataset)
        
        # Load and predict
        if model_type == 'cnn':
            model_path = MODELS[dataset][model_type]['model']
            preprocessing_path = MODELS[dataset][model_type]['preprocessing']
            model, preprocessing_data = load_cnn_model_data(model_path, preprocessing_path)
            result = predict_cnn(model, preprocessing_data, features)
        else:
            model_path = MODELS[dataset][model_type]
            model_data = load_sklearn_model(model_path)
            result = predict_sklearn(model_data, features)
        
        # Add feature mapping info to response if available
        if result.get('success') and feature_mapping:
            result['feature_info'] = {
                name: feature_mapping.get(name, {'display_name': name})
                for name in features.keys()
            }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/get_feature_mapping/<dataset>', methods=['GET'])
def get_feature_mapping(dataset):
    """Get complete feature mapping for a dataset"""
    try:
        if dataset not in MODELS:
            return jsonify({
                'success': False,
                'error': f'Invalid dataset. Choose from: {list(MODELS.keys())}'
            }), 400
        
        feature_mapping = load_feature_mapping(dataset)
        
        if feature_mapping is None:
            return jsonify({
                'success': False,
                'error': f'Feature mapping file not found for dataset: {dataset}'
            }), 404
        
        return jsonify({
            'success': True,
            'dataset': dataset,
            'feature_mapping': feature_mapping
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
        
@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    """
    Make predictions for multiple samples at once
    
    Expected JSON format:
    {
        "dataset": "k2pandc" or "cumi",
        "model": "knn", "rf", or "cnn",
        "samples": [
            {"feature1": value1, "feature2": value2, ...},
            {"feature1": value1, "feature2": value2, ...}
        ]
    }
    """
    try:
        data = request.get_json()
        
        dataset = data.get('dataset', 'k2pandc')
        model_type = data.get('model', 'knn')
        samples = data.get('samples', [])
        
        if not samples:
            return jsonify({
                'success': False,
                'error': 'No samples provided'
            }), 400
        
        # Load model
        if model_type == 'cnn':
            model_path = MODELS[dataset][model_type]['model']
            preprocessing_path = MODELS[dataset][model_type]['preprocessing']
            model, preprocessing_data = load_cnn_model_data(model_path, preprocessing_path)
        else:
            model_path = MODELS[dataset][model_type]
            model_data = load_sklearn_model(model_path)
        
        # Make predictions
        predictions = []
        for idx, features in enumerate(samples):
            if model_type == 'cnn':
                result = predict_cnn(model, preprocessing_data, features)
            else:
                result = predict_sklearn(model_data, features)
            
            predictions.append({
                'sample': idx,
                'prediction': result.get('prediction'),
                'confidence_scores': result.get('confidence_scores')
            })
        
        return jsonify({
            'success': True,
            'total_predictions': len(predictions),
            'predictions': predictions
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/upload_dataset', methods=['POST'])
def upload_dataset():
    """
    Upload custom dataset for training
    
    Form data:
    - file: CSV file
    - dataset_name: Custom name for the dataset
    - target_column: Name of the target column
    - feature_columns: Comma-separated list of feature columns (optional, uses all if not specified)
    """
    try:
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No file provided'
            }), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        if not file.filename.endswith('.csv'):
            return jsonify({
                'success': False,
                'error': 'Only CSV files are allowed'
            }), 400
        
        dataset_name = request.form.get('dataset_name')
        target_column = request.form.get('target_column')
        feature_columns = request.form.get('feature_columns', None)
        
        if not dataset_name:
            return jsonify({
                'success': False,
                'error': 'dataset_name is required'
            }), 400
        
        if not target_column:
            return jsonify({
                'success': False,
                'error': 'target_column is required'
            }), 400
        
        # Save file with custom name
        filename = secure_filename(f"{dataset_name}.csv")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Read and validate CSV
        df = pd.read_csv(filepath)
        
        # Check if target column exists
        if target_column not in df.columns:
            os.remove(filepath)
            return jsonify({
                'success': False,
                'error': f'Target column "{target_column}" not found in CSV'
            }), 400
        
        # Parse feature columns
        if feature_columns:
            features = [f.strip() for f in feature_columns.split(',')]
            missing_features = [f for f in features if f not in df.columns]
            if missing_features:
                os.remove(filepath)
                return jsonify({
                    'success': False,
                    'error': f'Feature columns not found: {missing_features}'
                }), 400
        else:
            # Use all columns except target as features
            features = [col for col in df.columns if col != target_column]
        
        # Get dataset statistics
        total_rows = len(df)
        total_columns = len(df.columns)
        missing_values = df.isnull().sum().to_dict()
        target_distribution = df[target_column].value_counts().to_dict()
        
        # Get feature statistics
        feature_stats = {}
        for feature in features:
            if df[feature].dtype in ['int64', 'float64']:
                feature_stats[feature] = {
                    'type': 'numeric',
                    'mean': float(df[feature].mean()),
                    'std': float(df[feature].std()),
                    'min': float(df[feature].min()),
                    'max': float(df[feature].max()),
                    'missing': int(df[feature].isnull().sum())
                }
            else:
                feature_stats[feature] = {
                    'type': 'categorical',
                    'unique_values': int(df[feature].nunique()),
                    'missing': int(df[feature].isnull().sum())
                }
        
        # Save metadata
        metadata = {
            'dataset_name': dataset_name,
            'filename': filename,
            'filepath': filepath,
            'target_column': target_column,
            'feature_columns': features,
            'total_rows': total_rows,
            'total_columns': total_columns,
            'target_distribution': {str(k): int(v) for k, v in target_distribution.items()},
            'feature_stats': feature_stats
        }
        
        metadata_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{dataset_name}_metadata.json")
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': f'Dataset "{dataset_name}" uploaded successfully',
            'dataset_info': metadata
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/list_datasets', methods=['GET'])
def list_datasets():
    """List all uploaded custom datasets"""
    try:
        datasets = []
        
        # Get all metadata files
        for filename in os.listdir(app.config['UPLOAD_FOLDER']):
            if filename.endswith('_metadata.json'):
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                with open(filepath, 'r') as f:
                    metadata = json.load(f)
                    datasets.append({
                        'dataset_name': metadata['dataset_name'],
                        'total_rows': metadata['total_rows'],
                        'total_columns': metadata['total_columns'],
                        'target_column': metadata['target_column'],
                        'feature_count': len(metadata['feature_columns'])
                    })
        
        return jsonify({
            'success': True,
            'total_datasets': len(datasets),
            'datasets': datasets
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/dataset_info/<dataset_name>', methods=['GET'])
def dataset_info(dataset_name):
    """Get detailed information about a specific dataset"""
    try:
        metadata_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{dataset_name}_metadata.json")
        
        if not os.path.exists(metadata_path):
            return jsonify({
                'success': False,
                'error': f'Dataset "{dataset_name}" not found'
            }), 404
        
        with open(metadata_path, 'r') as f:
            metadata = json.load(f)
        
        return jsonify({
            'success': True,
            'dataset_info': metadata
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/delete_dataset/<dataset_name>', methods=['DELETE'])
def delete_dataset(dataset_name):
    """Delete a custom dataset"""
    try:
        # Delete CSV file
        csv_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{dataset_name}.csv")
        metadata_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{dataset_name}_metadata.json")
        
        deleted_files = []
        
        if os.path.exists(csv_path):
            os.remove(csv_path)
            deleted_files.append('CSV file')
        
        if os.path.exists(metadata_path):
            os.remove(metadata_path)
            deleted_files.append('metadata file')
        
        if not deleted_files:
            return jsonify({
                'success': False,
                'error': f'Dataset "{dataset_name}" not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': f'Dataset "{dataset_name}" deleted successfully',
            'deleted_files': deleted_files
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/download_dataset/<dataset_name>', methods=['GET'])
def download_dataset(dataset_name):
    """Download a custom dataset"""
    try:
        from flask import send_file
        
        csv_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{dataset_name}.csv")
        
        if not os.path.exists(csv_path):
            return jsonify({
                'success': False,
                'error': f'Dataset "{dataset_name}" not found'
            }), 404
        
        return send_file(csv_path, as_attachment=True, download_name=f"{dataset_name}.csv")
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/preview_dataset/<dataset_name>', methods=['GET'])
def preview_dataset(dataset_name):
    """Preview first few rows of a dataset"""
    try:
        csv_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{dataset_name}.csv")
        
        if not os.path.exists(csv_path):
            return jsonify({
                'success': False,
                'error': f'Dataset "{dataset_name}" not found'
            }), 404
        
        # Read dataset
        df = pd.read_csv(csv_path)
        
        # Get number of rows to preview (default 10)
        rows = request.args.get('rows', 10, type=int)
        rows = min(rows, 100)  # Maximum 100 rows
        
        # Convert to dictionary
        preview_data = df.head(rows).to_dict(orient='records')
        
        return jsonify({
            'success': True,
            'dataset_name': dataset_name,
            'total_rows': len(df),
            'preview_rows': len(preview_data),
            'columns': list(df.columns),
            'data': preview_data
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)