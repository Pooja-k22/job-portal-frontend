import React, { useContext, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import { loginRegModalContext, tokenContext } from "../contex/ContextShare";
import { loginApi } from "../services/allApi";

function Login() {
  const { setShowLogin, setShowRegister } = useContext(loginRegModalContext);
  const { setToken} = useContext(tokenContext)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  //  login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      alert("please fill all");
    } else {
      const result = await loginApi({ email, password });
      //console.log(result.data);
      if (result.status == 200) {
        alert("login successfully");
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);
        setToken(result.data.token)
        if (result.data.existingUser.role == "admin") {
          navigate("/admin");
        } else if (result.data.existingUser.role == "employer") {
          navigate("/employerDasboard");
        } else {
          navigate("/");
        }
        // model close
        setShowLogin(false)
      }
     else if (result.status == 401 || result.status == 404) {
        alert(result.response.data);
        setFormData({
          email: "",
          password: "",
        });
      } else {
        alert("Something went wrong");
        setFormData({
          email: "",
          password: "",
        });
    }
}
  };
  return (
    <div className="fixed inset-0 bg-[#00000069] min-h-screen flex justify-center items-center z-200">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6 font-bold">
          <h2 className="text-2xl  text-center text-gray-800 ">
            Welcome Back 👋
          </h2>
          <h2 onClick={() => setShowLogin(false)} className="cursor-pointer">
            X
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center mt-1 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
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
            <div className="flex items-center mt-1 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-5 flex justify-center text-sm text-gray-500">
          <button
            onClick={() => {
              setShowRegister(true), setShowLogin(false);
            }}
            className="hover:text-blue-600"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
