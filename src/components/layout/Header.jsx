import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/impacto', label: 'Impacto' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setIsOpen(false);
    navigate('/');
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Zyclos pagina inicial">
          <span className="brand-mark">Z</span>
          <span>Zyclos</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegacao principal">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
          {user && (
            <>
              <NavLink to="/novo-anuncio" onClick={closeMenu}>
                Anunciar
              </NavLink>
              <NavLink to="/chat" onClick={closeMenu}>
                Chat
              </NavLink>
              <NavLink to="/perfil" onClick={closeMenu}>
                Perfil
              </NavLink>
            </>
          )}
        </nav>

        <div className={`header-actions ${isOpen ? 'is-open' : ''}`}>
          {user ? (
            <button className="btn btn-ghost" type="button" onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <>
              <Link className="btn btn-ghost" to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link className="btn btn-primary" to="/cadastro" onClick={closeMenu}>
                Cadastro
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
