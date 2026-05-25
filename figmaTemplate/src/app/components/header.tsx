import { User } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Header({ isLoggedIn, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-lg">🎄</span>
            </div>
            <h1 className="text-lg sm:text-xl text-primary-foreground font-semibold tracking-tight">
              Family Christmas Exchange
            </h1>
          </button>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {location.pathname !== "/profile" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/profile")}
                    className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/signup")}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
