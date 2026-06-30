import { Link } from 'react-router-dom';
import ImpactCard from '../components/impact/ImpactCard.jsx';
import SustainableScore from '../components/common/SustainableScore.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { favoriteService } from '../services/favoriteService.js';
import { impactService } from '../services/impactService.js';
import { productService } from '../services/productService.js';

export default function ImpactDashboard() {
  const { user } = useAuth();
  const listings = user ? productService.getUserProducts(user.id) : [];
  const favoriteIds = user ? favoriteService.getFavoriteIds(user.id) : [];
  const impact = impactService.calculateUserImpact({ user, favoriteIds, listings });

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Painel de impacto</span>
          <h1>Seu consumo consciente em numeros</h1>
          <p>
            As estimativas abaixo sao simples e servem para comunicar o valor ambiental da
            reutilizacao de roupas no MVP.
          </p>
        </div>

        <div className="impact-dashboard">
          <div className="impact-summary">
            <SustainableScore score={impact.score} level={impact.level} />
            {!user && (
              <Link className="btn btn-primary" to="/login">
                Entrar para personalizar
              </Link>
            )}
          </div>

          <div className="impact-grid dashboard-grid">
            <ImpactCard label="Roupas reutilizadas" value={impact.reusedItems} detail="compras, trocas e favoritos" />
            <ImpactCard
              label="Agua economizada"
              value={`${impact.water.toLocaleString('pt-BR')} L`}
              detail="estimativa acumulada"
            />
            <ImpactCard label="CO2 evitado" value={`${impact.co2} kg`} detail="emissoes evitadas" />
            <ImpactCard label="Descarte evitado" value={impact.wasteAvoided} detail="pecas mantidas em uso" />
          </div>
        </div>

        <div className="impact-bars" aria-label="Graficos de impacto sustentavel">
          <article>
            <span>Reutilizacao</span>
            <div className="bar-track">
              <span style={{ width: `${Math.min(100, impact.reusedItems * 12)}%` }} />
            </div>
          </article>
          <article>
            <span>Economia de agua</span>
            <div className="bar-track">
              <span style={{ width: `${Math.min(100, impact.water / 150)}%` }} />
            </div>
          </article>
          <article>
            <span>Reducao de descarte</span>
            <div className="bar-track">
              <span style={{ width: `${Math.min(100, impact.wasteAvoided * 12)}%` }} />
            </div>
          </article>
        </div>

        <section className="education-strip">
          <h2>Mensagem educativa</h2>
          <p>
            Comprar uma peca usada pode evitar etapas de producao, transporte e descarte. O impacto
            individual parece pequeno, mas cresce quando a comunidade reutiliza mais roupas.
          </p>
        </section>
      </div>
    </section>
  );
}
