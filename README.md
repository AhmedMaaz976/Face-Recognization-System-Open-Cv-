# Face Recognition System with OpenCV

A comprehensive face recognition system built with Python (OpenCV) backend and React frontend, featuring real-time face detection, registration, and authentication capabilities.

##  Features:

- **Real-time Face Detection**: Uses OpenCV for live video capture and face detection
- **Face Registration**: Register new users by capturing and storing their facial data
- **Face Recognition**: Authenticate users through facial recognition
- **Modern Web Interface**: React-based frontend with Tailwind CSS styling
- **Secure Data Storage**: Pickle-based storage for facial encodings
- **Cross-platform**: Works on Windows, macOS, and Linux

## 🏗️ Project Structure

```
project/
├── backend/                 # Python backend with OpenCV
│   ├── backend.py          # Main backend server
│   └── db/                 # Database storage
│       ├── photos/         # User photos (empty after cleanup)
│       └── pickles/        # Facial encoding storage (empty after cleanup)
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   └── App.js          # Main application component
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
└── README.md               # This file
```

## 🛠 Technologies Used

### Backend
- **Python 3.x**: Core programming language
- **OpenCV**: Computer vision and image processing
- **Flask**: Web framework for API endpoints
- **face_recognition**: Advanced face recognition library
- **NumPy**: Numerical computing

### Frontend
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript features

##  Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.7+**
- **Node.js 14+** and npm
- **Webcam** for face detection and registration
- **Git** for version control

##  Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AhmedMaaz976/Face-Recognization-System-Open-Cv-.git
cd Face-Recognization-System-Open-Cv-
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install opencv-python
pip install face-recognition
pip install flask
pip install numpy
pip install pillow
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

##  Usage

### Starting the Backend

```bash
cd backend
python backend.py
```

The backend server will start on `http://localhost:5000`

### Starting the Frontend

```bash
cd frontend
npm start
```

The React application will open in your browser at `http://localhost:3000`

##  Configuration

### Backend Configuration

The backend can be configured by modifying `backend/backend.py`:

- **Port**: Change the Flask server port
- **Camera Index**: Modify camera device index for different webcams
- **Face Detection Parameters**: Adjust detection sensitivity and accuracy

### Frontend Configuration

Frontend settings can be modified in:

- **Tailwind CSS**: `frontend/tailwind.config.js`
- **React App**: `frontend/src/App.js`

##  Features Overview

### 1. Welcome Page
- Introduction to the face recognition system
- Navigation to login or registration

### 2. User Registration
- Capture user photos for face registration
- Store facial encodings securely
- User profile creation

### 3. User Login
- Real-time face authentication
- Secure access to the main system

### 4. Main Menu
- Access to various system features
- User management options

##  Security Features

- **Secure Storage**: Facial encodings stored as pickle files
- **No Raw Image Storage**: Only mathematical representations are stored
- **Privacy-First**: User photos are not permanently stored after processing

##  Troubleshooting

### Common Issues

1. **Camera Not Working**
   - Ensure webcam is connected and accessible
   - Check camera permissions in your browser
   - Try different camera indices in backend.py

2. **Face Detection Issues**
   - Ensure good lighting conditions
   - Position face clearly in camera view
   - Check OpenCV installation

3. **Backend Connection Errors**
   - Verify backend server is running
   - Check port configuration
   - Ensure firewall allows local connections

### Performance Tips

- Use a high-quality webcam for better recognition accuracy
- Ensure adequate lighting for optimal face detection
- Close unnecessary applications to free up system resources

## 👨‍💻 Author

**Ahmed Maaz** - [GitHub Profile](https://github.com/AhmedMaaz976)

## 🙏 Acknowledgments

- OpenCV community for computer vision capabilities
- face_recognition library developers
- React and Tailwind CSS communities
- All contributors and supporters


---

**Note**: This project is designed for educational and personal use. Ensure compliance with local privacy laws and regulations when deploying in production environments.
