"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const itens = [
  {
    href: "/",
    nome: "Pedidos",
    icone: <path d="M6 3h9l3 3v15H6zM9 9h6M9 13h6M9 17h4" />,
  },
  {
    href: "/clientes",
    nome: "Clientes",
    icone: <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 19v-1a4 4 0 0 0-3-3.9M15.5 4.1a3 3 0 0 1 0 5.8" />,
  },
  {
    href: "/comissao",
    nome: "Comissão",
    icone: <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
];

export default function Menu() {
  const atual = usePathname();
  return (
    <nav className="menu" aria-label="Menu principal">
      {itens.map((i) => {
        const ativo = i.href === "/" ? atual === "/" : atual.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} aria-current={ativo ? "page" : undefined}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {i.icone}
            </svg>
            {i.nome}
          </Link>
        );
      })}
    </nav>
  );
}
