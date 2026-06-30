import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import ImpactCard from '../components/impact/ImpactCard.jsx';
import { favoriteService } from '../services/favoriteService.js';
import { impactService } from '../services/impactService.js';
import { productService } from '../services/productService.js';
import { useAuth } from '../hooks/useAuth.js';

const negotiationLabels = {
  venda: 'Disponivel para venda',
  troca: 'Disponivel para troca',
  ambos: 'Disponivel para venda e troca',
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const product = productService.getProductById(id);
  const [isFavorite, setIsFavorite] = useState(() =>
    product ? favoriteService.isFavorite(product.id, user?.id) : false,
  );

  if (!product) {
    return (
      <section className="page-section">
        <div className="container empty-state">
          <h1>Peca nao encontrada</h1>
          <p>O anuncio pode ter sido removido ou nao existe mais.</p>
          <Link className="btn btn-primary" to="/catalogo">
            Voltar ao catalogo
          </Link>
        </div>
      </section>
    );
  }

  const impact = impactService.calculateProductImpact(product);

  function handleFavorite() {
    const favoriteIds = favoriteService.toggleFavorite(product.id, user?.id);
    setIsFavorite(favoriteIds.includes(product.id));
  }

  function startChat() {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/chat/${product.id}` } } });
      return;
    }

    navigate(`/chat/${product.id}`);
  }

  return (
    <section className="page-section">
      <div className="container product-detail-layout">
        <div className="detail-gallery">
          <img src={product.image} alt={product.name} />
        </div>

        <article className="detail-panel">
          <span className="badge badge-soft">{negotiationLabels[product.negotiation]}</span>
          <h1>{product.name}</h1>
          <p className="detail-price">R$ {product.price.toFixed(2).replace('.', ',')}</p>

          <div className="detail-meta-grid">
            <div>
              <span>Marca</span>
              <strong>{product.brand}</strong>
            </div>
            <div>
              <span>Tamanho</span>
              <strong>{product.size}</strong>
            </div>
            <div>
              <span>Cor</span>
              <strong>{product.color}</strong>
            </div>
            <div>
              <span>Estado</span>
              <strong>{product.condition}</strong>
            </div>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="seller-summary">
            <img src={product.seller.avatar} alt={product.seller.name} />
            <div>
              <span>Vendedor</span>
              <strong>{product.seller.name}</strong>
              <p>{product.seller.city} · Nota {product.seller.rating}</p>
            </div>
          </div>

          <div className="detail-actions">
            <Button variant={isFavorite ? 'secondary' : 'outline'} onClick={handleFavorite}>
              {isFavorite ? 'Favoritado' : 'Favoritar'}
            </Button>
            <Button onClick={startChat}>Iniciar conversa</Button>
          </div>

          <div className="mini-impact">
            <ImpactCard
              label="Agua economizada"
              value={`${impact.water.toLocaleString('pt-BR')} L`}
              detail="estimativa pela reutilizacao"
            />
            <ImpactCard label="CO2 evitado" value={`${impact.co2} kg`} detail="emissao estimada" />
            <ImpactCard label="Descarte evitado" value="1 peca" detail="mantida em uso" />
          </div>
        </article>
      </div>
    </section>
  );
}
