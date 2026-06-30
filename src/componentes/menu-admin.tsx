"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITENS = [
  { caminho: "/admin", rotulo: "Início" },
  { caminho: "/admin/banners", rotulo: "Banners" },
  { caminho: "/admin/noticias", rotulo: "Notícias" },
  { caminho: "/admin/projetos", rotulo: "Projetos" },
];

export function MenuAdmin() {
  const caminhoAtual = usePathname();

  return (
    <aside className="menu-admin">
      <p className="menu-admin-titulo">Painel admin</p>

      <Link href="/" className="menu-admin-voltar">
        Voltar ao site
      </Link>

      <nav className="menu-admin-links">
        {ITENS.map((item) => {
          const ativo =
            item.caminho === "/admin"
              ? caminhoAtual === "/admin"
              : caminhoAtual.startsWith(item.caminho);

          return (
            <Link
              key={item.caminho}
              href={item.caminho}
              className={ativo ? "menu-admin-link ativo" : "menu-admin-link"}
            >
              {item.rotulo}
            </Link>
          );
        })}
      </nav>

      <form action="/api/logout" method="post" className="menu-admin-sair">
        <button className="botao botao-vermelho botao-menu" type="submit">
          Sair
        </button>
      </form>
    </aside>
  );
}
