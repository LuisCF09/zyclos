import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">Z</span>
            <span>Zyclos</span>
          </Link>
          <p>
            Moda circular para dar novo valor a roupas em bom estado e reduzir o descarte.
          </p>
        </div>

        <div>
          <h2>Plataforma</h2>
          <Link to="/catalogo">Catalogo</Link>
          <Link to="/impacto">Impacto sustentavel</Link>
          <Link to="/novo-anuncio">Criar anuncio</Link>
        </div>

        <div>
          <h2>Institucional</h2>
          <a href="#sobre">Sobre o Zyclos</a>
          <a href="#sustentabilidade">Moda sustentavel</a>
          <a href="#contato">Contato</a>
        </div>

        <div>
          <h2>TCC</h2>
          <p>Projeto educacional desenvolvido como MVP para apresentacao academica.</p>
        </div>
      </div>
    </footer>
  );
}
