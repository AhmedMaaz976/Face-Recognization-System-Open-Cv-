import React, { useState } from "react";

// Import all components
import Popup from "./components/Popup";
import MainMenu from "./pages/MainMenu";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [popup, setPopup] = useState(null);

  // Popup management
  const showPopup = (message, type = 'success') => {
    setPopup({ message, type });
  };

  const closePopup = () => {
    setPopup(null);
  };

  // Event handlers
  const handleLoginSuccess = (name, image) => {
    setUserName(name);
    setUserImage(image);
    setCurrentPage("welcome");
    showPopup(`Welcome back, ${name}!`, 'success');
  };

  const handleRegisterSuccess = (name) => {
    showPopup(`User ${name} registered successfully!`, 'success');
    setCurrentPage("main");
  };

  const handleLogout = () => {
    setUserName("");
    setUserImage("");
    setCurrentPage("main");
    showPopup("You have been logged out successfully!", 'success');
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "main":
        return <MainMenu onNavigate={setCurrentPage} />;
      
      case "login":
        return (
          <LoginPage
            onBack={() => setCurrentPage("main")}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      
      case "register":
        return (
          <RegisterPage
            onBack={() => setCurrentPage("main")}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );
      
      case "welcome":
        return (
          <WelcomePage
            userName={userName}
            userImage={userImage}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <MainMenu onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
      
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default App;