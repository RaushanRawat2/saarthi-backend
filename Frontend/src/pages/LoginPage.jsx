import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);

      login(data); // save in context + localStorage
      toast.success("Login successful!");

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-monastery">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-monastery w-full max-w-md animate-fadeIn"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-monastery-maroon">
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
          onChange={handleChange}
          required
        />

        {/* Button */}
        <button
          className="w-full bg-monastery-maroon hover:bg-monastery-gold text-white py-3 rounded-lg font-semibold transition duration-300 shadow-golden"
        >
          Login
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
