// type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// export const Input = ({ className = '', ...props }: InputProps) => {
//   return (
//     <input
//       {...props}
//       className={`px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
//     />
//   );
// };

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`
        px-4 py-2 w-full rounded-md
        bg-black text-yellow-400 placeholder-gray-400
        border border-yellow-400
        focus:outline-none focus:ring-2 focus:ring-yellow-400
        transition-all duration-300 ease-in-out
        ${className}
      `}
    />
  );
};


