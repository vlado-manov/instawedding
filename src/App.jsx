import "./App.css";
import BottomNavigation from "./components/BottomNavigation";
import MainScreen from "./screens/MainScreen";
import Welcome from "./screens/Welcome";
import Schedule from "./screens/Shedule";
import { useEffect, useState } from "react";
import UploadModal from "./components/UploadModal";
import LoginAdmin from "./components/LoginAdmin";
import LoginError from "./components/LoginError";

function App() {
  const [screen, setScreen] = useState("welcome"); // 'welcome' | 'main' | 'schedule'
  const [welcomeProgress, setWelcomeProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const refreshImages = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const savedName = localStorage.getItem("guestName");
    if (savedName) {
      setWelcomeProgress(100);
      setScreen("main");
    }
  }, []);

  const handleEnter = () => {
    setTimeout(() => {
      setWelcomeProgress(100);
      setScreen("main");
    }, 5000); // Give the progress bar some time to animate
  };

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
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("guestName", username);
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
    <div className="flex-1 w-full max-w-screen-md mx-auto">
      {screen === "welcome" && (
        <Welcome
          onUserIconClick={openLoginModal}
          onFinishWelcome={() => setScreen("main")} // ✅ NEW
        />
      )}

      {screen === "main" && (
        <MainScreen
          onOpenUpload={openUploadModal}
          refreshTrigger={refreshTrigger}
        />
      )}

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
      {showUploadModal && (
        <UploadModal
          onClose={closeUploadModal}
          onUploadComplete={handleUploadComplete}
          refreshImages={refreshImages}
        />
      )}
    </div>
  );
}

export default App;
