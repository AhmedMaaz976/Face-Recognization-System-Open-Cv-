import React, { useState, useEffect } from 'react';

const MainMenu = ({ onNavigate }) => {
  const [mounted, setMounted] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    {
      id: 'login',
      title: 'Login',
      subtitle: 'Access your account',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      gradient: 'from-emerald-400 to-cyan-400',
      hoverGradient: 'from-emerald-500 to-cyan-500',
      glowColor: 'emerald-300'
    },
    {
      id: 'register',
      title: 'Register',
      subtitle: 'Create new account',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: 'from-blue-400 to-purple-400',
      hoverGradient: 'from-blue-500 to-purple-500',
      glowColor: 'blue-300'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full opacity-40 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-lg w-full transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Card Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-blue-50/50 rounded-3xl"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-100/30 to-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-100/30 to-pink-200/30 rounded-full blur-3xl"></div>

            {/* Header Section */}
            <div className="relative z-10 text-center mb-12">
              {/* Logo/Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg relative">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-3xl blur-lg opacity-40"></div>
                </div>
              </div>

              {/* Title and Subtitle */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Face Recognition
                </h1>
                <p className="text-xl font-medium bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  System
                </p>
                <p className="text-gray-600 text-sm mt-4">
                  Advanced biometric authentication powered by AI
                </p>
              </div>
            </div>

            {/* Menu Buttons */}
            <div className="relative z-10 space-y-6">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  onMouseEnter={() => setHoveredButton(item.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={`group w-full relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] ${
                    hoveredButton === item.id ? 'shadow-2xl' : 'shadow-lg'
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  {/* Button Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${hoveredButton === item.id ? item.hoverGradient : item.gradient} transition-all duration-300`}></div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {/* Button Content */}
                  <div className="relative z-10 flex items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all duration-300 ${
                        hoveredButton === item.id ? 'scale-110 rotate-3 bg-white/40' : ''
                      }`}>
                        {item.icon}
                      </div>
                    </div>
                    
                    <div className="flex-grow text-left">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {item.subtitle}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <svg 
                        className={`w-6 h-6 text-white transition-all duration-300 ${
                          hoveredButton === item.id ? 'translate-x-1' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/70 backdrop-blur-sm border border-green-200 rounded-full text-green-700 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure • Private • Fast</span>
              </div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-16 bg-gradient-to-r from-cyan-300/30 via-blue-300/30 to-purple-300/30 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Custom Styles for Grid Pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default MainMenu;