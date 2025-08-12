import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function EmployerSidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // logout
  const logout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-50 bg-[#070779] text-white p-4 flex justify-between items-center md:hidden">
        <h2 className="text-2xl font-bold">🗼CareerNest</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-[#070779] text-white p-8  fixed top-0 left-0 transform ${
          open ? "translate-x-0 w-full mt-9" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300  md:relative`}
      >
        {/* Desktop-only logo */}
        <h2 className="text-3xl font-bold mb-8 hidden md:block">🗼CareerNest</h2>

        <div className="flex flex-col gap-2">
          <Link
            to="/employerDasboard"
            className="hover:bg-white p-3 hover:text-black rounded-lg"
            onClick={() => setOpen(false)}
          >
            Employer Dashboard
          </Link>
          <Link
            to="/myjob"
            className="hover:bg-white p-3 hover:text-black rounded-lg"
            onClick={() => setOpen(false)}
          >
            My Jobs
          </Link>
          <Link
            to="/applicants"
            className="hover:bg-white p-3 hover:text-black rounded-lg"
            onClick={() => setOpen(false)}
          >
            Applicants List
          </Link>

          <div
            onClick={logout}
            className="hover:bg-white p-3 hover:text-black rounded-lg cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployerSidebar;
