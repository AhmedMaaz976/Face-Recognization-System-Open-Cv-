import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam";

const RegisterPage = ({ onBack, onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [nameError, setNameError] = useState("");
  const webcamRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (value.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (nameError && value.trim()) {
      validateName(value);
    }
  };

  const handleRegister = async () => {
    if (!validateName(name)) {
      return;
    }

    setIsLoading(true);
    try {
      const image = capture();
      const response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, name: name.trim() })
      });

      const data = await response.json();
      
      if (data.success) {
        onRegisterSuccess(data.name);
        setName(""); // Clear form
        setNameError("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full opacity-30 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-lg w-full transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main Card */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Card Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-cyan-100/30 rounded-3xl blur-xl"></div>
            
            {/* Header */}
            <div className="relative z-10 text-center mb-8">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-gray-600">Register your face for secure access</p>
            </div>

            {/* Name Input */}
            <div className="relative z-10 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleNameChange}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    nameError 
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400'
                  }`}
                />
              </div>
              {nameError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {nameError}
                </p>
              )}
            </div>

            {/* Webcam Container */}
            <div className="relative mb-8 group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Face Capture
              </label>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 mt-6"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg mt-2">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-64 object-cover"
                  videoConstraints={{
                    width: 640,
                    height: 480,
                    facingMode: "user"
                  }}
                />
                
                {/* Scanning Animation Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-emerald-400 rounded-xl opacity-70">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500"></div>
                  </div>
                  
                  {/* Scanning Line */}
                  <div className="absolute inset-x-4 top-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"></div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100/80 backdrop-blur-sm rounded-full text-green-700 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Ready to capture</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-100 border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </span>
              </button>
              
              <button
                onClick={handleRegister}
                disabled={isLoading || !name.trim()}
                className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:from-emerald-500 hover:to-cyan-600 hover:scale-105 active:scale-95 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Account
                  </span>
                )}
              </button>
            </div>

            {/* Registration Tips */}
            <div className="relative z-10 mt-6">
              <div className="bg-blue-50/70 backdrop-blur-sm border border-blue-200 rounded-xl p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Registration Tips
                </h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Look directly at the camera</li>
                  <li>• Ensure good lighting on your face</li>
                  <li>• Remove glasses or hats if possible</li>
                  <li>• Keep a neutral expression</li>
                </ul>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 border border-green-200 rounded-full text-green-700 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Your data is encrypted & secure</span>
              </div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-emerald-300/40 to-cyan-400/40 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;