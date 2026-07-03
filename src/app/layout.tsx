import type { Metadata } from "next";
import "./globals.css";
import { Cabecalho } from "@/componentes/cabecalho";
import { Rodape } from "@/componentes/rodape";
import { NOME_DO_SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: NOME_DO_SITE,
  description: "Portal oficial com notícias, projetos e transparência",
};

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">
        <Cabecalho />
        <main className="flex-1">{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
