import ProductCard from '../components/products/ProductCard.jsx';
import SustainableScore from '../components/common/SustainableScore.jsx';
import ImpactCard from '../components/impact/ImpactCard.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { favoriteService } from '../services/favoriteService.js';
import { impactService } from '../services/impactService.js';
import { productService } from '../services/productService.js';

export default function Profile() {
  const { user } = useAuth();
  const listings = productService.getUserProducts(user.id);
  const favoriteIds = favoriteService.getFavoriteIds(user.id);
  const favoriteProducts = favoriteService.getFavoriteProducts(user.id);
  const impact = impactService.calculateUserImpact({ user, favoriteIds, listings });

  return (
    <section className="page-section">
      <div className="container profile-layout">
        <aside className="profile-sidebar">
          <img className="profile-avatar" src={user.avatar} alt={user.name} />
          <h1>{user.name}</h1>
          <p>{user.city}</p>
          <p className="profile-bio">{user.bio}</p>
          <SustainableScore score={impact.score} level={impact.level} />
        </aside>

        <div className="profile-content">
          <div className="profile-stats">
            <ImpactCard label="Anuncios" value={listings.length} detail="pecas publicadas" />
            <ImpactCard label="Favoritos" value={favoriteProducts.length} detail="pecas salvas" />
            <ImpactCard label="Historico" value={user.history?.length || 0} detail="acoes simuladas" />
          </div>

          <section className="profile-section">
            <div className="section-heading compact-heading">
              <h2>Roupas anunciadas</h2>
            </div>
            {listings.length > 0 ? (
              <div className="product-grid small-grid">
                {listings.map((product) => (
                  <ProductCard key={product.id} product={product} compact />
                ))}
              </div>
            ) : (
              <div className="empty-state inline-empty">
                <p>Voce ainda nao publicou anuncios.</p>
              </div>
            )}
          </section>

          <section className="profile-section">
            <div className="section-heading compact-heading">
              <h2>Favoritos</h2>
            </div>
            {favoriteProducts.length > 0 ? (
              <div className="product-grid small-grid">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} compact />
                ))}
              </div>
            ) : (
              <div className="empty-state inline-empty">
                <p>Nenhuma peca favoritada ate agora.</p>
              </div>
            )}
          </section>

          <section className="profile-section">
            <div className="section-heading compact-heading">
              <h2>Historico simulado</h2>
            </div>
            <div className="history-list">
              {(user.history || []).length > 0 ? (
                user.history.map((item) => (
                  <article key={item.id}>
                    <span>{item.type}</span>
                    <strong>{item.item}</strong>
                    <p>{item.date}</p>
                  </article>
                ))
              ) : (
                <div className="empty-state inline-empty">
                  <p>Compras, vendas e trocas aparecerao aqui.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
