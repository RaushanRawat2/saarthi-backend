import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  // handle form input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Update Profile (name & email)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/update",
        { name: formData.name, email: formData.email },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      login(data); // update AuthContext + localStorage
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
    }
  };

  // ✅ Change Password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/api/users/change-password",
        { password: formData.password },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success("Password changed successfully!");
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Account Settings</h1>

      {/* Profile Update Form */}
      <form
        onSubmit={handleProfileUpdate}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-lg text-orange-600 font-semibold mb-4">Update Profile</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border text-gray-600 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border text-gray-600 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Changes
        </button>
      </form>

      {/* Password Change Form */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-lg text-orange-600 font-semibold mb-4">Change Password</h2>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
