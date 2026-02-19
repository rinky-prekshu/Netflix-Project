import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 netflix-gradient bg-background/90 backdrop-blur-sm border-b border-border/30">
      <span className="text-3xl font-display tracking-wider text-primary cursor-pointer select-none">
        NETFLIX
      </span>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user.name}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
