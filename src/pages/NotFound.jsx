import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="container empty-state">
        <span className="eyebrow">404</span>
        <h1>Pagina nao encontrada</h1>
        <p>O endereco acessado nao corresponde a nenhuma tela do Zyclos.</p>
        <Link className="btn btn-primary" to="/">
          Voltar ao inicio
        </Link>
      </div>
    </section>
  );
}
