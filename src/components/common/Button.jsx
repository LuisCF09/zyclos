export default function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button className={`btn btn-${variant} ${className}`.trim()} type={type} {...props}>
      {children}
    </button>
  );
}
