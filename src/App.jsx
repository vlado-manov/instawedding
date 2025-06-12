import "./App.css";
import BottomNavigation from "./components/BottomNavigation";
import MainScreen from "./screens/MainScreen";
import Welcome from "./screens/Welcome";
import Schedule from "./screens/Shedule";
import { useState } from "react";
import UploadModal from "./components/UploadModal";
import LoginAdmin from "./components/LoginAdmin";
import LoginError from "./components/LoginError";

function App() {
  const [screen, setScreen] = useState("welcome"); // 'welcome' | 'main' | 'schedule'
  const [welcomeProgress, setWelcomeProgress] = useState(50);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  const handleUploadComplete = () => {
    setShowUploadSuccess(true);
  };
  const closeUploadSuccess = () => {
    setShowUploadSuccess(false);
  };

  const handleLogin = (username, password) => {
    if (
      username.toLowerCase() === "tedi" &&
      password.toLowerCase() === "kriskoegei"
    ) {
      setShowLoginModal(false);
      setShowLoginError(false);
      setWelcomeProgress(100);
      setTimeout(() => {
        setScreen("main");
      }, 1500);
    } else {
      setShowLoginModal(false);
      setShowLoginError(true);
    }
  };

  const closeLoginModal = () => setShowLoginModal(false);
  const closeLoginError = () => setShowLoginError(false);
  const openLoginModal = () => setShowLoginModal(true);

  return (
    <div className="flex-1">
      {screen === "welcome" && (
        <Welcome onUserIconClick={openLoginModal} progress={welcomeProgress} />
      )}

      {screen === "main" && <MainScreen onOpenUpload={openUploadModal} />}
      {screen === "schedule" && <Schedule />}

      {(screen === "main" || screen === "schedule") && (
        <BottomNavigation
          onOpenUpload={openUploadModal}
          setScreen={setScreen}
        />
      )}

      {showLoginModal && (
        <LoginAdmin onClose={closeLoginModal} onLogin={handleLogin} />
      )}
      {showLoginError && (
        <LoginError
          onClose={closeLoginError}
          onRetry={() => {
            setShowLoginError(false);
            setShowLoginModal(true);
          }}
        />
      )}
      {showUploadModal && <UploadModal onClose={closeUploadModal} />}
    </div>
  );
}

export default App;
