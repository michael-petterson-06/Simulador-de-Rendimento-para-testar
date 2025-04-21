// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// export const Button = ({ children, className = '', ...props }: ButtonProps) => {
//   return (
//     <button
//       {...props}
//       className={`font-semibold py-2 px-4 rounded-xl transition ${className}`}
//     >
//       {children}
//     </button>
//   );
// };


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        font-semibold py-2 px-4 rounded-md
        bg-yellow-400 text-gray-800 border border-yellow-400
        hover:bg-black hover:text-yellow-400 hover:border-yellow-400
        transition-all duration-700 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
};
