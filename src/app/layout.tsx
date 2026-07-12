import type { Metadata } from "next";
import "./globals.css";
import { NOME_DO_SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: NOME_DO_SITE,
  description: "Site com noticias e projetos",
};

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
