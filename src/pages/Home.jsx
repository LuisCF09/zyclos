import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard.jsx';
import ImpactCard from '../components/impact/ImpactCard.jsx';
import { productService } from '../services/productService.js';

export default function Home() {
  const featuredProducts = productService.getAllProducts().slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow">Moda circular com impacto real</span>
          <h1>Zyclos</h1>
          <p>
            Compre, venda e troque roupas usadas em uma plataforma pensada para consumo
            consciente, economia e reducao de descarte.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/catalogo">
              Ver catalogo
            </Link>
            <Link className="btn btn-secondary" to="/novo-anuncio">
              Anunciar peca
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Pecas selecionadas</span>
            <h2 id="featured-title">Roupas em destaque</h2>
            <Link to="/catalogo">Ver todas</Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="sustentabilidade" aria-labelledby="fashion-title">
        <div className="container split-section">
          <div>
            <span className="eyebrow">Moda sustentavel</span>
            <h2 id="fashion-title">Cada roupa reutilizada evita uma nova producao desnecessaria</h2>
          </div>
          <p>
            A industria da moda consome agua, energia e materias-primas. Ao reutilizar pecas em
            bom estado, o Zyclos ajuda estudantes e consumidores a prolongarem o ciclo de vida das
            roupas e a escolherem alternativas mais responsaveis.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Como funciona</span>
            <h2 id="steps-title">Tres caminhos simples</h2>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <span>01</span>
              <h3>Comprar</h3>
              <p>Encontre roupas conservadas, filtre por tamanho e converse com o vendedor.</p>
            </article>
            <article className="step-card">
              <span>02</span>
              <h3>Vender</h3>
              <p>Publique anuncios com fotos, descricao, estado da peca e preco justo.</p>
            </article>
            <article className="step-card">
              <span>03</span>
              <h3>Trocar</h3>
              <p>Negocie trocas locais e aumente a vida util das roupas que ja existem.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section impact-band" aria-labelledby="impact-title">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Impacto positivo</span>
            <h2 id="impact-title">Indicadores que tornam o consumo consciente visivel</h2>
          </div>
          <div className="impact-grid">
            <ImpactCard label="Agua economizada" value="12.500 L" detail="estimativa em reutilizacoes" />
            <ImpactCard label="CO2 evitado" value="27 kg" detail="menos emissao na cadeia produtiva" />
            <ImpactCard label="Pecas preservadas" value="10" detail="roupas fora do descarte" />
          </div>
        </div>
      </section>
    </>
  );
}
