import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            Vastra
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/collections" className="text-foreground hover:text-primary transition-colors font-medium">
              Collections
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
            <Link to="/account/dashboard" className="text-foreground hover:text-primary transition-colors font-bold bg-primary/10 px-4 py-2 rounded-md">
              Dashboard
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingBag size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="text-foreground hover:text-primary transition-colors">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <nav className="py-2">
                    <Link
                      to="/account/dashboard"
                      className="block px-4 py-2 text-foreground hover:bg-accent transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/account/orders"
                      className="block px-4 py-2 text-foreground hover:bg-accent transition-colors"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/account/settings"
                      className="block px-4 py-2 text-foreground hover:bg-accent transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-foreground hover:text-primary transition-colors">
                <User size={20} />
              </Link>
            )}

            <button
              className="lg:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/account/dashboard"
              className="text-foreground hover:text-primary transition-colors font-bold bg-primary/10 px-4 py-2 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
