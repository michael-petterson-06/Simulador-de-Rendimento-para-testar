'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();

  const linkBaseStyle =
    'text-sm md:text-base font-medium px-4 py-1 rounded-xl transition-all duration-300';

  const linkAtivo = 'bg-yellow-400 text-black';
  const linkInativo =
    'text-yellow-400 hover:text-yellow-300 hover:border-yellow-400 border border-transparent hover:border';

  return (
    <nav className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
      <Link
        href="/renda-familiar"
        className={`${linkBaseStyle} ${
          pathname === '/renda-familiar' ? linkAtivo : linkInativo
        }`}
      >
        Renda
      </Link>

      <Link
        href="/"
        className={`${linkBaseStyle} ${
          pathname === '/' ? linkAtivo : linkInativo
        }`}
      >
        Rendimento
      </Link>

      <Link
        href="/retiradas"
        className={`${linkBaseStyle} ${
          pathname === '/retiradas' ? linkAtivo : linkInativo
        }`}
      >
        Retiradas
      </Link>

      <Link
        href="/historico"
        className={`${linkBaseStyle} ${
          pathname === '/historico' ? linkAtivo : linkInativo
        }`}
      >
        Histórico
      </Link>

      <Link
        href="/patrimonio"
        className={`${linkBaseStyle} ${
          pathname === '/patrimonio' ? linkAtivo : linkInativo
        }`}
      >
        Patrimônio
      </Link>
    </nav>
  );
};
