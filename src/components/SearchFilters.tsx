import React from "react";

type Props = {
  region: string;
  setRegion: (val: string) => void;
  difficulty: string;
  setDifficulty: (val: string) => void;
};

const regions = ["", "Cameroon", "Nigeria", "Ghana", "Senegal", "Ivory Coast"];
const difficulties = ["", "Easy", "Medium", "Hard"];

const SearchFilters: React.FC<Props> = ({ region, setRegion, difficulty, setDifficulty }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div>
        <label className="block text-sm mb-1 font-medium">Region:</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r || "All"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d || "All"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
