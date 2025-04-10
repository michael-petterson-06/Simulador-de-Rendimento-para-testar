'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">


      <div className="flex items-center gap-6">

        <Link
          href="/renda-familiar"
          className={`text-lg font-medium transition-colors duration-300 ${
            pathname === '/renda-familiar'
              ? 'text-indigo-700 underline underline-offset-4'
              : 'text-indigo-500 hover:text-indigo-700 hover:underline'
          }`}
        >
          Renda Familiar
        </Link>


        <Link
          href="/"
          className={`text-lg font-medium transition-colors duration-300 ${
            pathname === '/'
              ? 'text-indigo-700 underline underline-offset-4'
              : 'text-indigo-500 hover:text-indigo-700 hover:underline'
          }`}
        >
          Simulador de Rendimento
        </Link>
     
        <Link
          href="/retiradas"
          className={`text-lg font-medium transition-colors duration-300 ${
            pathname === '/retiradas'
              ? 'text-indigo-700 underline underline-offset-4'
              : 'text-indigo-500 hover:text-indigo-700 hover:underline'
          }`}
        >
          Retiradas
        </Link>
      </div>
    </nav>

  );
};
