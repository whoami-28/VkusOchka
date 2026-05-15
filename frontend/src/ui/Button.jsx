export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: "bg-primary-container text-on-primary-container hover:bg-primary-fixed-dim",
    secondary: "bg-transparent border border-outline text-on-surface hover:bg-surface-container-low",
    error: "text-error hover:text-error-container"
  };

  return (
    <button 
      className={`h-[48px] px-md rounded-lg font-label-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}