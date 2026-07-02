export const FRANCHISES = [
  { value: "pokemon", label: "Pokémon", gradient: "linear-gradient(135deg, #ffcb05, #cc0000)" },
  { value: "yugioh", label: "Yu-Gi-Oh!", gradient: "linear-gradient(135deg, #6a11cb, #2575fc)" },
  { value: "magic", label: "Magic: The Gathering", gradient: "linear-gradient(135deg, #f7971e, #8e2de2)" },
];

export function franchiseMeta(value) {
  return FRANCHISES.find((f) => f.value === value) ?? { label: value, gradient: "linear-gradient(135deg, #444, #222)" };
}

export const RARITY_COLORS = {
  "Común": "#8a8a8a",
  "Poco Común": "#3aa76d",
  Rara: "#2f7bd6",
  "Ultra Rara": "#b445d6",
  Secreta: "#d6a72f",
};
