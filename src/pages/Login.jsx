import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import FormField from '../components/forms/FormField.jsx';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/perfil';
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = 'Informe seu e-mail.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Digite um e-mail valido.';
    }

    if (!form.password) {
      nextErrors.password = 'Informe sua senha.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback('');

    if (!validate()) {
      return;
    }

    try {
      login(form);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFeedback(error.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">Acesse sua conta</span>
        <h1>Entrar no Zyclos</h1>
        <p className="auth-hint">Conta demo: demo@zyclos.com / senha 123456</p>

        <form className="form-stack" onSubmit={handleSubmit} noValidate>
          <FormField
            id="login-email"
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={updateField}
          />
          <FormField
            id="login-password"
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            error={errors.password}
            onChange={updateField}
          />

          {feedback && <p className="form-feedback">{feedback}</p>}

          <Button type="submit">Entrar</Button>
          <button
            className="link-button"
            type="button"
            onClick={() => setFeedback('Recuperacao de senha disponivel apenas como tela visual no MVP.')}
          >
            Esqueci minha senha
          </button>
        </form>

        <p className="auth-switch">
          Ainda nao tem conta? <Link to="/cadastro">Criar cadastro</Link>
        </p>
      </div>
    </section>
  );
}
