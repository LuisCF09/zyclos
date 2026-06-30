export default function FormField({
  label,
  id,
  error,
  as = 'input',
  children,
  className = '',
  ...props
}) {
  const Field = as;

  return (
    <label className={`form-field ${className}`.trim()} htmlFor={id}>
      <span>{label}</span>
      {children || <Field id={id} className={error ? 'has-error' : ''} {...props} />}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
