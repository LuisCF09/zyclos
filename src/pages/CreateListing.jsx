import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import FormField from '../components/forms/FormField.jsx';
import { categories, conditions, sizes } from '../data/products.js';
import { useAuth } from '../hooks/useAuth.js';
import { productService } from '../services/productService.js';

const initialForm = {
  name: '',
  category: '',
  brand: '',
  size: '',
  color: '',
  condition: '',
  description: '',
  price: '',
  negotiation: 'venda',
  image: '',
};

export default function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    const nextErrors = {};

    if (form.name.trim().length < 3) {
      nextErrors.name = 'Informe o nome da peca.';
    }
    if (!form.category) {
      nextErrors.category = 'Selecione uma categoria.';
    }
    if (form.brand.trim().length < 2) {
      nextErrors.brand = 'Informe a marca.';
    }
    if (!form.size) {
      nextErrors.size = 'Selecione o tamanho.';
    }
    if (form.color.trim().length < 3) {
      nextErrors.color = 'Informe a cor.';
    }
    if (!form.condition) {
      nextErrors.condition = 'Selecione o estado.';
    }
    if (form.description.trim().length < 20) {
      nextErrors.description = 'Descreva a peca com pelo menos 20 caracteres.';
    }
    if (!form.price || Number(form.price) <= 0) {
      nextErrors.price = 'Informe um preco valido.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const listing = productService.createProduct(form, user);
    navigate(`/roupa/${listing.id}`);
  }

  return (
    <section className="page-section">
      <div className="container narrow-container">
        <div className="page-heading">
          <span className="eyebrow">Novo anuncio</span>
          <h1>Publique uma roupa no Zyclos</h1>
          <p>Preencha as informacoes principais para deixar a peca clara e confiavel.</p>
        </div>

        <form className="listing-form" onSubmit={handleSubmit} noValidate>
          <div className="image-upload">
            <div className="upload-preview">
              {form.image ? <img src={form.image} alt="Previa da peca" /> : <span>Imagem da peca</span>}
            </div>
            <label className="btn btn-outline" htmlFor="listing-image">
              Upload simulado
            </label>
            <input id="listing-image" type="file" accept="image/*" onChange={handleImage} hidden />
          </div>

          <div className="form-grid">
            <FormField
              id="listing-name"
              label="Nome da peca"
              name="name"
              value={form.name}
              error={errors.name}
              onChange={updateField}
            />
            <FormField
              id="listing-brand"
              label="Marca"
              name="brand"
              value={form.brand}
              error={errors.brand}
              onChange={updateField}
            />

            <FormField id="listing-category" label="Categoria" error={errors.category}>
              <select
                id="listing-category"
                name="category"
                value={form.category}
                className={errors.category ? 'has-error' : ''}
                onChange={updateField}
              >
                <option value="">Selecione</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="listing-size" label="Tamanho" error={errors.size}>
              <select
                id="listing-size"
                name="size"
                value={form.size}
                className={errors.size ? 'has-error' : ''}
                onChange={updateField}
              >
                <option value="">Selecione</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id="listing-color"
              label="Cor"
              name="color"
              value={form.color}
              error={errors.color}
              onChange={updateField}
            />

            <FormField id="listing-condition" label="Estado de conservacao" error={errors.condition}>
              <select
                id="listing-condition"
                name="condition"
                value={form.condition}
                className={errors.condition ? 'has-error' : ''}
                onChange={updateField}
              >
                <option value="">Selecione</option>
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id="listing-price"
              label="Preco"
              name="price"
              type="number"
              min="1"
              step="0.01"
              value={form.price}
              error={errors.price}
              onChange={updateField}
            />

            <FormField id="listing-negotiation" label="Tipo de negociacao">
              <select
                id="listing-negotiation"
                name="negotiation"
                value={form.negotiation}
                onChange={updateField}
              >
                <option value="venda">Venda</option>
                <option value="troca">Troca</option>
                <option value="ambos">Venda e troca</option>
              </select>
            </FormField>
          </div>

          <FormField id="listing-description" label="Descricao" error={errors.description}>
            <textarea
              id="listing-description"
              name="description"
              rows="5"
              value={form.description}
              className={errors.description ? 'has-error' : ''}
              onChange={updateField}
            />
          </FormField>

          <Button type="submit">Publicar anuncio</Button>
        </form>
      </div>
    </section>
  );
}
