import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4">
        <Link
          to="/admin/add"
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded shadow inline-block text-center"
        >
          ➕ Add New Pet
        </Link>
        {/* In future: manage products, orders, messages, etc */}
      </div>
    </div>
  );
}
