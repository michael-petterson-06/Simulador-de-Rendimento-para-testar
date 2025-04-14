type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`font-semibold py-2 px-4 rounded-xl transition ${className}`}
    >
      {children}
    </button>
  );
};
