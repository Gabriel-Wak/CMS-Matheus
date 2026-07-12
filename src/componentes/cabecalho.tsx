"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS_MENU, NOME_DO_SITE } from "@/lib/config";

export function Cabecalho() {
  const caminho = usePathname();

  function menuAtivo(caminhoLink: string) {
    if (caminhoLink === "/") return caminho === "/";
    return caminho.startsWith(caminhoLink);
  }

  return (
    <header className="cabecalho-site">
      <div className="cabecalho-site-linha">
        <Link href="/" className="cabecalho-site-logo">
          <span className="cabecalho-site-logo-linha1">{NOME_DO_SITE}</span>
          <span className="cabecalho-site-logo-linha2">
            <span className="cabecalho-site-logo-amarelo">Portal</span>
          </span>
        </Link>

        <nav className="cabecalho-site-menu">
          {LINKS_MENU.map((link) => (
            <Link
              key={link.caminho}
              href={link.caminho}
              className={menuAtivo(link.caminho) ? "cabecalho-site-link ativo" : "cabecalho-site-link"}
            >
              {link.rotulo}
            </Link>
          ))}
        </nav>

        <div className="cabecalho-site-acoes">
          <Link href="/busca" className="cabecalho-site-icone" aria-label="Busca" title="Busca">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </Link>
          <Link href="/contato" className="cabecalho-site-icone" aria-label="Contato" title="Contato">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="1" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </Link>
        </div>
      </div>

      <nav className="cabecalho-site-menu-mobile">
        {LINKS_MENU.map((link) => (
          <Link
            key={link.caminho}
            href={link.caminho}
            className={menuAtivo(link.caminho) ? "cabecalho-site-link-mobile ativo" : "cabecalho-site-link-mobile"}
          >
            {link.rotulo}
          </Link>
        ))}
      </nav>
    </header>
  );
}
