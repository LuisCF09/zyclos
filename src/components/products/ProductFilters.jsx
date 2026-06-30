import { categories, sizes } from '../../data/products.js';

const priceRanges = [
  { value: '', label: 'Qualquer preco' },
  { value: '0-50', label: 'Ate R$ 50' },
  { value: '50-100', label: 'R$ 50 a R$ 100' },
  { value: '100-200', label: 'R$ 100 a R$ 200' },
  { value: '200+', label: 'Acima de R$ 200' },
];

export default function ProductFilters({ filters, onChange, onClear, products }) {
  const brands = Array.from(new Set(products.map((product) => product.brand))).sort();

  function updateFilter(event) {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  }

  return (
    <aside className="filters-panel" aria-label="Filtros do catalogo">
      <div className="filters-header">
        <h2>Filtros</h2>
        <button type="button" onClick={onClear}>
          Limpar
        </button>
      </div>

      <label>
        <span>Categoria</span>
        <select name="category" value={filters.category} onChange={updateFilter}>
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Tamanho</span>
        <select name="size" value={filters.size} onChange={updateFilter}>
          <option value="">Todos</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Marca</span>
        <select name="brand" value={filters.brand} onChange={updateFilter}>
          <option value="">Todas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Faixa de preco</span>
        <select name="priceRange" value={filters.priceRange} onChange={updateFilter}>
          {priceRanges.map((range) => (
            <option key={range.value || 'any'} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Negociacao</span>
        <select name="negotiation" value={filters.negotiation} onChange={updateFilter}>
          <option value="">Todas</option>
          <option value="venda">Venda</option>
          <option value="troca">Troca</option>
          <option value="ambos">Venda e troca</option>
        </select>
      </label>
    </aside>
  );
}
