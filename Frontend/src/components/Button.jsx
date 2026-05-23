export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseStyle =
    'inline-flex justify-center items-center py-2.5 px-5 border shadow-sm text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
      'border-transparent text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:ring-indigo-500 hover:shadow-lg hover:-translate-y-0.5',
    secondary:
      'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:ring-indigo-500 hover:shadow-md',
    danger:
      'border-transparent text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:ring-red-500 hover:shadow-lg hover:-translate-y-0.5',
  };

  return (
    <button type={type} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
