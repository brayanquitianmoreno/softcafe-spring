// Campo controlado para filtrar productos por código o nombre.
export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por código o nombre..."
        aria-label="Buscar productos"
      />
    </label>
  );
}
