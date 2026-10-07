import { useEffect, useRef, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="relative flex items-center gap-3" ref={dropdownRef}>
      <span className="text-dark font-semibold truncate max-w-[120px]">
        {user?.name}
      </span>

      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-9 h-9 flex items-center justify-center 
          bg-lime-300 hover:bg-lime-400 
          rounded-full font-medium
          transition-colors duration-200
          relative
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu utilisateur"
      >
        <span className="select-none">
          {user?.name.charAt(0).toUpperCase()}
        </span>
      </button>

      <div
        className={`
          absolute right-0 top-12 z-20
          bg-white border border-gray-100
          rounded-lg shadow-lg w-48
          transition-all duration-200 origin-top-right
          ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }
        `}
        role="menu"
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="font-medium text-gray-900 truncate">{user?.name}</p>
          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
        </div>

        <div className="py-1">
          <button
            onClick={handleLogout}
            className={`
              w-full px-4 py-2 text-left text-sm
              flex items-center gap-2
              text-gray-700 hover:bg-gray-50
              transition-colors duration-150
            `}
            role="menuitem"
          >
            <RiLogoutCircleLine className="text-lg" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
