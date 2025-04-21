// // src/components/ui/Card.tsx
// import { ReactNode } from 'react';

// export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
//   <div className={`bg-white rounded-xl shadow-xl p-6 ${className}`}>{children}</div>
// );


// src/components/ui/Card.tsx
import { ReactNode } from 'react';

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`bg-black text-yellow-400 rounded-xl shadow-xl p-6 border border-yellow-500 ${className}`}>
    {children}
  </div>
);
