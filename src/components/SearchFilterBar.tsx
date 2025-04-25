// src/components/SearchFilterBar.tsx
import { useState } from "react";

type Props = {
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
};

export default function SearchFilterBar({ onSearch, onFilter }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-6">
      <input
        type="text"
        placeholder="Search for pets, food, accessories..."
        className="p-2 rounded border w-full md:w-2/3"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="p-2 rounded border w-full md:w-1/3"
      >
        <option value="">All Categories</option>
        <option value="pet">Pets</option>
        <option value="food">Food</option>
        <option value="accessory">Accessories</option>
      </select>
    </div>
  );
}
