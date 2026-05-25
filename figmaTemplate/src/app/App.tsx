import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Header } from "./components/header";
import { HeroCountdown } from "./components/hero-countdown";
import { RulesSection } from "./components/rules-section";
import { WishlistSection } from "./components/wishlist-section";
import { PotluckSection } from "./components/potluck-section";
import { Footer } from "./components/footer";
import { ProfilePage } from "./components/profile-page";
import { LoginPage } from "./components/login-page";
import { SignupPage } from "./components/signup-page";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (email: string) => {
    // Mock login - in a real app, this would authenticate against a backend
    const mockUser = { name: "Sarah", email };
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
  };

  const handleSignup = (name: string, email: string) => {
    // Mock signup - in a real app, this would create a user in the backend
    setCurrentUser({ name, email });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex-1">
                <HeroCountdown />
                <RulesSection />
                <WishlistSection readOnly={true} />
                <PotluckSection readOnly={true} />
              </main>
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/profile" replace />
              ) : (
                <main className="flex-1">
                  <LoginPage onLogin={handleLogin} />
                </main>
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/profile" replace />
              ) : (
                <main className="flex-1">
                  <SignupPage onSignup={handleSignup} />
                </main>
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn && currentUser ? (
                <main className="flex-1">
                  <ProfilePage userName={currentUser.name} />
                </main>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
