import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700">Admin Dashboard</h1>
      <div className="mt-4 space-y-6">
        <button className="btn btn-green">➕ Upload Product</button>
        <button className="btn btn-green">📦 View Orders</button>
        <button className="btn btn-green">📊 View Analytics</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
