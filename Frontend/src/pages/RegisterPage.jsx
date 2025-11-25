import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      login(data);
      toast.success("Registration successful!");
      navigate("/"); // ✅ redirect to homepage
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
          Create Account
        </h2>

        {/* Full Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition text-black"
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition text-black"
          onChange={handleChange}
          required
        />

        {/* Button */}
        <button
          className="w-full bg-monastery-maroon hover:bg-monastery-gold text-white py-3 rounded-lg font-semibold transition duration-300 shadow-golden "
        >
          Register
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline ">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
