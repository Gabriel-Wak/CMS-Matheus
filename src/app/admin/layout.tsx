import { redirect } from "next/navigation";
import { FaixaCores } from "@/componentes/faixa-cores";
import { MenuAdmin } from "@/componentes/menu-admin";
import { adminLogado } from "@/lib/verificar-sessao";

export default async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const logado = await adminLogado();
  if (!logado) redirect("/login");

  return (
    <div className="fundo-admin min-h-screen">
      <FaixaCores />

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[240px_1fr]">
        <MenuAdmin />
        <main className="painel-admin">{children}</main>
      </div>
    </div>
  );
}
