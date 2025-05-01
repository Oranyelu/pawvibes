import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddPet() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    breed: "",
    age: "",
    location: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProduct((prev) => ({ ...prev, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.category || !product.image) {
      return toast.error("All required fields must be filled!");
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // if using cookies for auth
      });
      toast.success("Product uploaded successfully!");
      setProduct({
        name: "",
        price: 0,
        category: "",
        description: "",
        breed: "",
        age: "",
        location: "",
        image: null,
      });
      setPreview(null);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to upload product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Pet</h2>

      <input name="name" value={product.name} onChange={handleChange} placeholder="Pet Name" className="input" required />
      <input name="price" value={product.price} onChange={handleChange} type="number" placeholder="Price (₦)" className="input" required />
      
      <select name="category" value={product.category} onChange={handleChange} className="input" required>
        <option value="">Select Category</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
        <option value="accessory">Accessory</option>
        <option value="food">Pet Food</option>
      </select>

      <input name="breed" value={product.breed} onChange={handleChange} placeholder="Breed" className="input" />
      <input name="age" value={product.age} onChange={handleChange} placeholder="Age (e.g. 2 months)" className="input" />
      <input name="location" value={product.location} onChange={handleChange} placeholder="Location (e.g. Enugu)" className="input" />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="input" />

      <input type="file" accept="image/*" onChange={handleImageChange} className="input" required />
      {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />}

      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
        Upload Pet
      </button>
    </form>
  );
}
