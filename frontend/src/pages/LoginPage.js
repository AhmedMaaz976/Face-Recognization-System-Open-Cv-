import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam";

const LoginPage = ({ onBack, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const image = capture();
      const response = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image })
      });

      const data = await response.json();
      
      if (data.success) {
        onLoginSuccess(data.name, data.image);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-sky-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full opacity-30 animate-bounce`}
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
        <div className={`max-w-md w-full transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main Card */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Card Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-3xl blur-xl"></div>
            
            {/* Header */}
            <div className="relative z-10 text-center mb-8">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Face Recognition</h1>
              <p className="text-gray-600">Secure login with advanced biometrics</p>
            </div>

            {/* Webcam Container */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg">
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
                  <div className="absolute inset-4 border-2 border-cyan-400 rounded-xl opacity-70">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500"></div>
                  </div>
                  
                  {/* Scanning Line */}
                  <div className="absolute inset-x-4 top-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
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
                onClick={handleLogin}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:from-cyan-500 hover:to-blue-600 hover:scale-105 active:scale-95 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Authenticate
                  </span>
                )}
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 border border-green-200 rounded-full text-green-700 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secured</span>
              </div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-cyan-300/40 to-blue-400/40 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;