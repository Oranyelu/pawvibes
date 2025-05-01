// src/pages/LoginSignup.tsx
import { useState } from "react";
import { login, register } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = isSignup
        ? await register(form)
        : await login({ email: form.email, password: form.password });

      toast.success(isSignup ? "Account created! 🐶" : "Welcome back! 🐾");

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/"); // redirect after login/signup
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
                required
              />
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium transition"
          >
            {loading ? (isSignup ? "Creating..." : "Logging in...") : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            className="text-green-700 hover:underline font-medium"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
