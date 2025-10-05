# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d69f4fb1-7764-4ccb-9ecb-072fa8cac0e0

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d69f4fb1-7764-4ccb-9ecb-072fa8cac0e0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d69f4fb1-7764-4ccb-9ecb-072fa8cac0e0) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


# 🌌 Exoplanet Classification System

<div align="center">

![Exoplanet Banner](https://img.shields.io/badge/Exoplanet-Classification-blue?style=for-the-badge&logo=rocket)
![Python](https://img.shields.io/badge/Python-3.9+-green?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.0+-FF6F00?style=for-the-badge&logo=tensorflow)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

*A comprehensive machine learning system for classifying exoplanet candidates using multiple algorithms and datasets*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Models & Accuracy](#-models--accuracy)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Dataset Format](#-dataset-format)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Training Models](#-training-models)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🌟 About

The **Exoplanet Classification System** is an end-to-end machine learning platform designed to predict the disposition of exoplanet candidates. Built for astronomers, researchers, and space enthusiasts, this system leverages state-of-the-art algorithms including K-Nearest Neighbors, Random Forest, and 1D Convolutional Neural Networks to classify celestial objects as CONFIRMED planets, CANDIDATES, or FALSE POSITIVES.

### Why This Project?

- 🔬 **Scientific Accuracy**: Achieves up to 96.8% accuracy using deep learning
- 🚀 **User-Friendly**: No machine learning expertise required
- 📊 **Multiple Models**: Compare different algorithms and choose the best fit
- 🌐 **RESTful API**: Easy integration with existing workflows
- 📚 **Educational**: Learn about ML in astronomy with real data
- 🔓 **Open Source**: Free to use, modify, and distribute

---

## ✨ Features

### 🤖 Machine Learning Models
- **K-Nearest Neighbors (KNN)**: Fast, interpretable, instance-based learning
- **Random Forest (RF)**: Ensemble method with 94-95% accuracy
- **1D CNN**: Deep learning with 96.8% accuracy on CUMI dataset

### 📊 Dual Dataset Support
- **K2PANDC**: K2 Planet and Candidate dataset (19 features)
- **CUMI**: Cumulative Exoplanet dataset (9 features)

### 🎯 Core Functionality
- ✅ Single sample predictions with confidence scores
- ✅ Batch predictions for multiple samples
- ✅ CSV file upload for bulk processing
- ✅ Custom dataset management (upload, preview, download, delete)
- ✅ Feature mapping with human-readable names and descriptions
- ✅ Real-time API with comprehensive error handling

### 🎨 User Interface
- ✅ Modern React-based web interface
- ✅ Interactive model and dataset selection
- ✅ Dynamic feature input forms
- ✅ Visual confidence score display
- ✅ Responsive mobile-friendly design
- ✅ Toast notifications and loading states

### 🔧 Developer Tools
- ✅ RESTful API with 12+ endpoints
- ✅ Postman collection for testing
- ✅ Comprehensive API documentation
- ✅ Python usage examples
- ✅ CORS support for cross-origin requests

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Model     │  │   Feature   │  │   Results   │        │
│  │  Selection  │  │    Input    │  │   Display   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST API
┌──────────────────────────▼──────────────────────────────────┐
│                    Flask API Server                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Prediction │  │   Dataset   │  │   Feature   │        │
│  │  Endpoints  │  │ Management  │  │   Mapping   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└──────────────────────────┬──────────────────────────────────┘
                           │ Model Loading
┌──────────────────────────▼──────────────────────────────────┐
│                   ML Models & Data                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   KNN    │  │    RF    │  │   CNN    │  │ Feature  │   │
│  │  Models  │  │  Models  │  │  Models  │  │ Mappings │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Models & Accuracy

| Model | Dataset | Accuracy | Speed | Best For |
|-------|---------|----------|-------|----------|
| **KNN** | K2PANDC | 89.3% | ⚡⚡⚡ | Quick baseline predictions |
| **KNN** | CUMI | 91.8% | ⚡⚡⚡ | Fast exploratory analysis |
| **Random Forest** | K2PANDC | 94.2% | ⚡⚡ | Production-grade accuracy |
| **Random Forest** | CUMI | 95.5% | ⚡⚡ | Balanced performance |
| **1D CNN** | CUMI | 96.8% | ⚡ | Maximum accuracy needed |

### Classification Classes
- ✅ **CONFIRMED**: Verified exoplanet
- 🔍 **CANDIDATE**: Potential exoplanet requiring confirmation
- ❌ **FALSE POSITIVE**: Not an exoplanet

---

## 🚀 Installation

### Prerequisites

```bash
# Python 3.9 or higher
python --version

# Node.js 16+ and npm
node --version
npm --version
```

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/exoplanet-classification.git
cd exoplanet-classification
```

2. **Create virtual environment**
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Create required directories**
```bash
mkdir uploads
```

5. **Add model files**
Place your trained model files in the project root:
```
project/
├── knn_model.pkl
├── rf_model.pkl
├── knn_cumi_model.pkl
├── rf_cumi_model.pkl
├── best_model.keras
├── cnn_preprocessing.pkl
├── k2pandc_feature_mapping.csv
└── cumi_feature_mapping.csv
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
Create `.env` file:
```env
VITE_BASE_URL=http://localhost:5000
```

---

## ⚡ Quick Start

### Start Backend Server

```bash
# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Run Flask server
python app.py
```

Server starts at `http://localhost:5000`

### Start Frontend Application

```bash
cd frontend
npm run dev
```

Application opens at `http://localhost:5173`

### Test API (Optional)

```bash
# Test with curl
curl http://localhost:5000/models

# Or use the provided test script
python test_api.py
```

---

## 📖 Usage

### Web Interface

1. **Open your browser** to `http://localhost:5173`
2. **Select a model** and dataset from the dropdown
3. **Click "Start Prediction"** button
4. **Enter feature values** in the dialog (or use defaults)
5. **View results** with confidence scores

### API Usage

#### Python Example

```python
import requests

# Get required features
response = requests.get('http://localhost:5000/get_features?dataset=cumi&model=knn')
features_info = response.json()

# Make prediction
payload = {
    "dataset": "cumi",
    "model": "knn",
    "features": {
        "koi_fwm_sdec": 0.5,
        "dec": 45.0,
        "koi_incl": 89.5,
        "koi_period": 3.5,
        "koi_duration": 2.5,
        "koi_depth": 1000.0,
        "koi_ror": 0.02,
        "koi_teq": 1200.0,
        "koi_dor": 15.0
    }
}
response = requests.post('http://localhost:5000/predict', json=payload)
result = response.json()
print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence_scores']}")
```

#### JavaScript Example

```javascript
// Make prediction
const response = await fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dataset: 'cumi',
    model: 'knn',
    features: {
      koi_fwm_sdec: 0.5,
      dec: 45.0,
      koi_incl: 89.5,
      koi_period: 3.5,
      koi_duration: 2.5,
      koi_depth: 1000.0,
      koi_ror: 0.02,
      koi_teq: 1200.0,
      koi_dor: 15.0
    }
  })
});

const result = await response.json();
console.log(result);
```

#### cURL Example

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "dataset": "cumi",
    "model": "knn",
    "features": {
      "koi_fwm_sdec": 0.5,
      "dec": 45.0,
      "koi_incl": 89.5,
      "koi_period": 3.5,
      "koi_duration": 2.5,
      "koi_depth": 1000.0,
      "koi_ror": 0.02,
      "koi_teq": 1200.0,
      "koi_dor": 15.0
    }
  }'
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 🔮 Prediction Endpoints

##### 1. Get Available Models
```http
GET /models
```

**Response:**
```json
{
  "success": true,
  "models": {
    "k2pandc": {
      "knn": "knn_model.pkl",
      "rf": "rf_model.pkl"
    },
    "cumi": {
      "knn": "knn_cumi_model.pkl",
      "rf": "rf_cumi_model.pkl",
      "cnn": {
        "model": "best_model.keras",
        "preprocessing": "cnn_preprocessing.pkl"
      }
    }
  }
}
```

##### 2. Get Required Features
```http
GET /get_features?dataset=<dataset>&model=<model>
```

**Parameters:**
- `dataset`: `k2pandc` or `cumi`
- `model`: `knn`, `rf`, or `cnn`

**Response:**
```json
{
  "success": true,
  "dataset": "cumi",
  "model": "knn",
  "features": ["koi_period", "koi_depth", ...],
  "feature_details": [
    {
      "name": "koi_period",
      "display_name": "Orbital Period",
      "description": "Time for one complete orbit",
      "type": "numeric",
      "unit": "days",
      "default_value": 3.5234
    }
  ],
  "feature_defaults": {
    "koi_period": 3.5234
  }
}
```

##### 3. Single Prediction
```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "dataset": "cumi",
  "model": "knn",
  "features": {
    "koi_fwm_sdec": 0.5,
    "dec": 45.0,
    "koi_incl": 89.5,
    "koi_period": 3.5,
    "koi_duration": 2.5,
    "koi_depth": 1000.0,
    "koi_ror": 0.02,
    "koi_teq": 1200.0,
    "koi_dor": 15.0
  }
}
```

**Response:**
```json
{
  "success": true,
  "prediction": "CONFIRMED",
  "confidence_scores": {
    "CONFIRMED": 85.50,
    "CANDIDATE": 12.30,
    "FALSE POSITIVE": 2.20
  }
}
```

##### 4. Batch Prediction
```http
POST /batch_predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "dataset": "cumi",
  "model": "rf",
  "samples": [
    { "koi_fwm_sdec": 0.5, "dec": 45.0, ... },
    { "koi_fwm_sdec": 0.3, "dec": 40.0, ... }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "total_predictions": 2,
  "predictions": [
    {
      "sample": 0,
      "prediction": "CONFIRMED",
      "confidence_scores": { ... }
    }
  ]
}
```

##### 5. Upload CSV for Prediction
```http
POST /upload_predict
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: CSV file
- `dataset`: `k2pandc` or `cumi`
- `model`: `knn`, `rf`, or `cnn`

#### 📊 Dataset Management Endpoints

##### 6. Upload Custom Dataset
```http
POST /upload_dataset
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: CSV file (required)
- `dataset_name`: Custom name (required)
- `target_column`: Target column name (required)
- `feature_columns`: Comma-separated list (optional)

##### 7. List All Datasets
```http
GET /list_datasets
```

##### 8. Get Dataset Info
```http
GET /dataset_info/<dataset_name>
```

##### 9. Preview Dataset
```http
GET /preview_dataset/<dataset_name>?rows=10
```

##### 10. Download Dataset
```http
GET /download_dataset/<dataset_name>
```

##### 11. Delete Dataset
```http
DELETE /delete_dataset/<dataset_name>
```

##### 12. Get Feature Mapping
```http
GET /get_feature_mapping/<dataset>
```

---

## 📄 Dataset Format

### Required CSV Structure

```csv
feature1,feature2,feature3,...,target_column
1.23,4.56,7.89,...,CONFIRMED
2.34,5.67,8.90,...,CANDIDATE
3.45,6.78,9.01,...,FALSE POSITIVE
```

### Feature Mapping CSV

**k2pandc_feature_mapping.csv:**
```csv
feature_name,display_name,description,type,unit
pl_orbper,Orbital Period,Time taken for one complete orbit,numeric,days
st_teff,Stellar Temperature,Effective temperature of host star,numeric,K
```

**cumi_feature_mapping.csv:**
```csv
feature_name,display_name,description,type,unit
koi_period,Orbital Period,Time for one complete orbit,numeric,days
koi_depth,Transit Depth,Fractional decrease in brightness,numeric,ppm
```

---

## 📁 Project Structure

```
exoplanet-classification/
├── backend/
│   ├── app.py                          # Flask API server
│   ├── requirements.txt                # Python dependencies
│   ├── knn_model.pkl                   # KNN K2PANDC model
│   ├── rf_model.pkl                    # RF K2PANDC model
│   ├── knn_cumi_model.pkl             # KNN CUMI model
│   ├── rf_cumi_model.pkl              # RF CUMI model
│   ├── best_model.keras               # CNN model
│   ├── cnn_preprocessing.pkl          # CNN preprocessing
│   ├── k2pandc_feature_mapping.csv    # Feature descriptions
│   ├── cumi_feature_mapping.csv       # Feature descriptions
│   ├── uploads/                       # Uploaded datasets
│   └── test_api.py                    # API testing script
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeatureInputDialog.tsx
│   │   │   ├── ModelCard.tsx
│   │   │   └── ResultsDisplay.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── Results.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
├── training_scripts/
│   ├── train_knn_k2pandc.py
│   ├── train_rf_k2pandc.py
│   ├── train_knn_cumi.py
│   ├── train_rf_cumi.py
│   └── train_cnn_cumi.py
│
├── docs/
│   ├── API.md
│   ├── TRAINING.md
│   └── DEPLOYMENT.md
│
├── postman/
│   └── Exoplanet_API.postman_collection.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🛠️ Technologies Used

### Backend
- **Python 3.9+**: Core programming language
- **Flask 2.3+**: Web framework for REST API
- **scikit-learn 1.3+**: KNN and Random Forest models
- **TensorFlow 2.13+**: Deep learning (CNN)
- **pandas 2.0+**: Data manipulation
- **numpy 1.24+**: Numerical computations
- **pickle**: Model serialization

### Frontend
- **React 18+**: UI library
- **TypeScript 5+**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS
- **Axios**: HTTP client
- **React Router**: Client-side routing
- **Sonner**: Toast notifications
- **Lucide React**: Icon library

---

## 🎓 Training Models

### Training KNN Model

```python
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier

# Load data
df = pd.read_csv("data.csv")
features = ['feature1', 'feature2', ...]
X = df[features]
y = df["target"]

# Preprocessing
feature_means = X.mean()
X = X.fillna(feature_means)
le = LabelEncoder()
y_encoded = le.fit_transform(y)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_encoded, test_size=0.2, random_state=42
)
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)

# Save
model_data = {
    'model': knn,
    'scaler': scaler,
    'label_encoder': le,
    'feature_names': features,
    'feature_means': feature_means
}
with open('knn_model.pkl', 'wb') as f:
    pickle.dump(model_data, f)
```

---

## ⚙️ Configuration

### Environment Variables

**Backend (.env or config.py):**
```python
DEBUG = True
HOST = '0.0.0.0'
PORT = 5000
UPLOAD_FOLDER = 'uploads'
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
```

**Frontend (.env):**
```env
VITE_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=30000
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Model file not found"
**Solution:** Ensure all `.pkl` and `.keras` files are in the project root directory.

#### 2. "CORS Error"
**Solution:** Install and enable Flask-CORS:
```bash
pip install flask-cors
```
```python
from flask_cors import CORS
CORS(app)
```

#### 3. "Port already in use"
**Solution:** Change port in `app.py`:
```python
app.run(debug=True, port=5001)
```

#### 4. "Module not found"
**Solution:** Ensure virtual environment is activated and dependencies installed.

#### 5. "Empty feature list in frontend"
**Solution:** Check API response format. Should return `feature_details` array.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. 🐛 **Report Bugs**: Open an issue with detailed description
2. 💡 **Suggest Features**: Share your ideas in issues
3. 📝 **Improve Documentation**: Fix typos, add examples
4. 🔧 **Submit Code**: Create pull requests

### Contribution Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to your fork
5. Open a Pull Request

---

## 🚀 Future Enhancements

### Planned Features

#### Phase 1 (Q1 2025)
- User authentication and authorization
- Model comparison dashboard
- Enhanced batch processing

#### Phase 2 (Q2 2025)
- XGBoost and LightGBM models
- Custom dataset retraining
- Interactive visualizations

#### Phase 3 (Q3 2025)
- Explainable AI features
- Mobile application
- Cloud scaling infrastructure

#### Phase 4 (Q4 2025)
- Community features & forum
- Research paper integration
- GraphQL API

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Data Sources
- **NASA Exoplanet Archive**: Primary source for exoplanet data
- **Kepler Mission**: K2 and cumulative datasets
- **TESS Mission**: Transit Exoplanet Survey Satellite data

### Special Thanks
- Contributors and maintainers
- The open-source community
- Alpha testers and early adopters

---

### Project Links
- 🌐 **Website**: https://yourproject.com
- 📚 **Documentation**: https://docs.yourproject.com
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/exoplanet-classification/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/exoplanet-classification/discussions)

---

<div align="center">

### ⭐ If you like this project, please give it a star! ⭐

Made with ❤️ by the Exoplanet ML Team

[Report Bug](https://github.com/yourusername/exoplanet-classification/issues) • [Request Feature](https://github.com/yourusername/exoplanet-classification/issues) • [Ask Question](https://github.com/yourusername/exoplanet-classification/discussions)

---

**[⬆ Back to Top](#-exoplanet-classification-system)**

</div>
