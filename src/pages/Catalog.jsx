import { useMemo, useState } from 'react';
import ProductCard from '../components/products/ProductCard.jsx';
import ProductFilters from '../components/products/ProductFilters.jsx';
import { productService } from '../services/productService.js';

const emptyFilters = {
  category: '',
  size: '',
  brand: '',
  priceRange: '',
  negotiation: '',
};

function matchesPriceRange(price, range) {
  if (!range) {
    return true;
  }

  if (range === '200+') {
    return price >= 200;
  }

  const [min, max] = range.split('-').map(Number);
  return price >= min && price <= max;
}

export default function Catalog() {
  const allProducts = useMemo(() => productService.getAllProducts(), []);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(emptyFilters);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return allProducts.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        [product.name, product.brand, product.category, product.color].some((value) =>
          value.toLowerCase().includes(normalizedSearch),
        );
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesSize = !filters.size || product.size === filters.size;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesNegotiation =
        !filters.negotiation ||
        product.negotiation === filters.negotiation ||
        product.negotiation === 'ambos';

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesBrand &&
        matchesPriceRange(product.price, filters.priceRange) &&
        matchesNegotiation
      );
    });
  }, [allProducts, filters, search]);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Catalogo Zyclos</span>
          <h1>Encontre roupas para comprar ou trocar</h1>
          <p>Use a pesquisa e os filtros para localizar pecas por categoria, tamanho, marca e tipo de negociacao.</p>
        </div>

        <div className="catalog-toolbar">
          <label className="search-field" htmlFor="catalog-search">
            <span>Pesquisar</span>
            <input
              id="catalog-search"
              type="search"
              placeholder="Ex.: jaqueta, vestido, verde..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <span className="results-count">{filteredProducts.length} pecas encontradas</span>
        </div>

        <div className="catalog-layout">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters(emptyFilters)}
            products={allProducts}
          />

          {filteredProducts.length > 0 ? (
            <div className="product-grid catalog-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Nenhuma peca encontrada</h2>
              <p>Ajuste os filtros ou tente pesquisar por outra palavra.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
