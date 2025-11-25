import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Shield } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import "./Navbar.css"; // Import the shimmer CSS

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Virtual Tours", path: "/tours" },
    { name: "Digital Archives", path: "/archives" },
    { name: "Interactive Map", path: "/map" },
    { name: "Cultural Calendar", path: "/calendar" },
    { name: "Audio Guides", path: "/audio-guides" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/80 shadow-lg shadow-purple-900/20 transition-all duration-500 animate-fadeInDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-400 bg-clip-text text-transparent drop-shadow-md shimmer-text">
              SAARTHI
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8 ml-12 lg:ml-16">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm font-semibold tracking-wide transition-all duration-300 shimmer-link ${
                    location.pathname === item.path
                      ? "text-yellow-300 drop-shadow-md"
                      : "text-blue/80 hover:text-blue-900 "
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-400 transition-all duration-500 ${
                      location.pathname === item.path ? "w-full" : "group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Right utilities */}
            <div className="flex items-center space-x-4 ml-6">
              <SearchBar />
              <ThemeToggle />

              {!user ? (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 shimmer-button"
                >
                  Login
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none hover:scale-105 transition-transform">
                      <Avatar className="h-9 w-9 ring-2 ring-yellow-400/50 shadow-md shimmer-avatar">
                        <AvatarFallback>
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 shadow-xl border-white/20 bg-white/10 backdrop-blur-md rounded-xl">
                    <DropdownMenuLabel className="font-bold text-yellow-400 shimmer-text">
                      {user.name || "User"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {user.role === "user" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center text-yellow-400 hover:text-yellow-300 shimmer-link">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings" className="flex items-center text-orange-400 hover:text-orange-300 shimmer-link">
                            ⚙ Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {user.role === "admin" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center text-pink-400 hover:text-pink-300 shimmer-link">
                            <Shield className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer hover:text-red-400 shimmer-link">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-white/10 backdrop-blur-md rounded-xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "text-yellow-300 font-semibold drop-shadow-md shimmer-link"
                      : "text-white/80 hover:text-yellow-300 hover:drop-shadow-lg shimmer-link"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {!user ? (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-400 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all text-center shimmer-button"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <>
                  {user.role === "user" && (
                    <>
                      <Link
                        to="/profile"
                        className="text-sm font-medium text-white/80 hover:text-yellow-300 text-center shimmer-link"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="text-sm font-medium text-white/80 hover:text-yellow-300 text-center shimmer-link"
                        onClick={() => setIsOpen(false)}
                      >
                        Settings
                      </Link>
                    </>
                  )}
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="text-sm font-medium text-pink-400 hover:text-yellow-300 text-center shimmer-link"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-sm text-red-500 hover:underline text-center shimmer-link"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
