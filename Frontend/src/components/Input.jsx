import React from 'react';

const Input = React.forwardRef(({ label, type = 'text', id, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`appearance-none block w-full px-4 py-2.5 border ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/50'
            : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white'
        } rounded-xl shadow-sm placeholder-slate-400 focus:outline-none sm:text-sm transition-all duration-200`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
