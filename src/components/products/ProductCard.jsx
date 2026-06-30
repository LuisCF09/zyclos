import { Link } from 'react-router-dom';
import { useState } from 'react';
import { favoriteService } from '../../services/favoriteService.js';
import { useAuth } from '../../hooks/useAuth.js';

const negotiationLabels = {
  venda: 'Venda',
  troca: 'Troca',
  ambos: 'Venda e troca',
};

export default function ProductCard({ product, compact = false }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(() =>
    favoriteService.isFavorite(product.id, user?.id),
  );

  function handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();
    const favoriteIds = favoriteService.toggleFavorite(product.id, user?.id);
    setIsFavorite(favoriteIds.includes(product.id));
  }

  return (
    <Link className={`product-card ${compact ? 'product-card-compact' : ''}`} to={`/roupa/${product.id}`}>
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={`favorite-button ${isFavorite ? 'is-active' : ''}`}
          type="button"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onClick={handleFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-body">
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <strong>R$ {product.price.toFixed(2).replace('.', ',')}</strong>
        </div>
        <p>{product.brand}</p>
        <div className="product-meta">
          <span>{product.size}</span>
          <span>{product.condition}</span>
        </div>
        <span className="badge badge-soft">{negotiationLabels[product.negotiation]}</span>
      </div>
    </Link>
  );
}
