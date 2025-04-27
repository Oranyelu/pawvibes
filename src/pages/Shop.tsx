import { useState } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import PetCard from "../components/PetCard";
import data from "../data/dummyData";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter ? item.category === filter : true)
  );

  return (
    <div className="p-4">
      <SearchFilterBar onSearch={setSearchTerm} onFilter={setFilter} />

      {/* 🐾 PETS */}
      <h2 className="text-2xl font-bold mb-4">Pets</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {filtered
          .filter((item) => item.category === "pet")
          .map((item) => (
            <PetCard key={item.id} product={item} />
          ))}
      </div>

      {/* 🔁 OFTEN BOUGHT TOGETHER */}
      <h3 className="text-xl font-semibold mb-3">Often Bought Together</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {/* Static or smart recommended block - for now reuse same data */}
        {filtered.slice(0, 2).map((item) => (
          <PetCard key={item.id} product={item} />
        ))}
      </div>

      {/* 🍖 FOOD + 🧸 ACCESSORIES */}
      <h2 className="text-2xl font-bold mb-4">
        More You Might Be Interested In
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered
          .filter(
            (item) => item.category === "food" || item.category === "accessory"
          )
          .map((item) => (
            <PetCard key={item.id} product={item} />
          ))}
      </div>
    </div>
  );
}
