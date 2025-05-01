// src/services/productApi.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products"; // Change if hosted online

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  location?: string;
  breed?: string;
  age?: number;
  image?: string;
  seller?: string;
}

// productApi.ts
export const getAllProducts = async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>(BASE_URL);

    return res.data.map((item: any) => ({
      id: item._id, // convert _id to id for frontend
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    }));
  };
  

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axios.get<Product>(`${BASE_URL}/${id}`);
  return res.data;
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const res = await axios.post<Product>(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<Product> => {
  const res = await axios.put<Product>(`${BASE_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
