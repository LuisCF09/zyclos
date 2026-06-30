import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import FormField from '../components/forms/FormField.jsx';
import { useAuth } from '../hooks/useAuth.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    const nextErrors = {};

    if (form.name.trim().length < 3) {
      nextErrors.name = 'Informe um nome com pelo menos 3 caracteres.';
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Digite um e-mail valido.';
    }

    if (form.password.length < 6) {
      nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'As senhas precisam ser iguais.';
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
      register(form);
      navigate('/perfil');
    } catch (error) {
      setFeedback(error.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">Comece sua jornada circular</span>
        <h1>Criar cadastro</h1>

        <form className="form-stack" onSubmit={handleSubmit} noValidate>
          <FormField
            id="register-name"
            label="Nome"
            name="name"
            value={form.name}
            error={errors.name}
            onChange={updateField}
          />
          <FormField
            id="register-email"
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={updateField}
          />
          <FormField
            id="register-password"
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            error={errors.password}
            onChange={updateField}
          />
          <FormField
            id="register-confirm-password"
            label="Confirmar senha"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={updateField}
          />

          {feedback && <p className="form-feedback">{feedback}</p>}

          <Button type="submit">Cadastrar</Button>
        </form>

        <p className="auth-switch">
          Ja tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  );
}
