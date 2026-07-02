import { FRANCHISES } from "../../utils/franchise";

export default function FranchiseFilter({ value, onChange }) {
  return (
    <div className="franchise-filter">
      <button className={value === "all" ? "chip active" : "chip"} onClick={() => onChange("all")}>
        Todas
      </button>
      {FRANCHISES.map((f) => (
        <button
          key={f.value}
          className={value === f.value ? "chip active" : "chip"}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
