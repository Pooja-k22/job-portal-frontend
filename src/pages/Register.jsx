import React, { useContext, useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { loginRegModalContext } from "../contex/ContextShare";
import { registerApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const { setShowLogin, setShowRegister } = useContext(loginRegModalContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  //   register

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;

    if (!name || !email || !password || !role) {
      alert("Please fill all field");
    } else {
      const result = await registerApi({ name, email, password, role });
      //console.log(result.data);
      if (result.status == 200) {
        alert("Register Successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
        setShowRegister(false)
      } else {
        alert("something went wrong");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center fixed inset-0 bg-[#00000069] z-200 ">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex items-center mt-1 border rounded-lg px-3 py-2 ">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                className="ml-2 w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center mt-1 border rounded-lg px-3 py-2 ">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="ml-2 w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center mt-1 border rounded-lg px-3 py-2 ">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="ml-2 w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>

            <div>
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="employer">Employer</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-5 flex justify-center text-sm text-gray-500">
          Already have an account?
          <button
            onClick={() => {
              setShowLogin(true), setShowRegister(false);
            }}
            className="ml-1 hover:text-green-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
