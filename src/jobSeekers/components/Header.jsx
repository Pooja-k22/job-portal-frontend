import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../pages/Login";
import { loginRegModalContext, tokenContext } from "../../contex/ContextShare";
import Register from "../../pages/Register";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const { showLogin, setShowLogin, showRegister, setShowRegister } =
    useContext(loginRegModalContext);

  const { token, setToken } = useContext(tokenContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // logout
  const logout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    setToken("");
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const tok = sessionStorage.getItem("token");
      setToken(tok);
    }
  }, []);

  return (
    <>
      <header className="px-5 sticky-top w-full z-10 md:px-25 py-5 bg-[#90CAF9] flex justify-between items-center">
        {/* Logo */}
        <div className="font-extrabold text-3xl">🗼CareerNest</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-semibold text-[#282842]">
          <Link to="/" className="hover:text-white">
            HOME
          </Link>
          <Link to="/findjob" className="hover:text-white">
            FIND A JOB
          </Link>

          {!token ? (
            <button onClick={() => setShowLogin(true)} className="hover:text-white">
              LOGIN
            </button>
          ) : (
            <div className="flex gap-8">
              <Link to="/profile" className="hover:text-white">
                PROFILE
              </Link>
              <button className="hover:text-white" onClick={logout}>
                LOGOUT
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-left px-4 gap-4 py-4 bg-[#90CAF9] font-semibold text-[#282842]">
          <Link to="/" className="hover:text-white" onClick={() => setMenuOpen(false)}>
            HOME
          </Link>
          <Link to="/findjob" className="hover:text-white" onClick={() => setMenuOpen(false)}>
            FIND A JOB
          </Link>

          {!token ? (
            <div
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="hover:text-white"
            >
              LOGIN
            </div>
          ) : (
            <>
              <Link
                to="/profile"
                className="hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                PROFILE
              </Link>
              <div className="hover:text-white" onClick={logout}>
                LOGOUT
              </div>
            </>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div>
          <Login />
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div>
          <Register />
        </div>
      )}
    </>
  );
}

export default Header;
