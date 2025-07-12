import { Cabecalho } from "@/componentes/cabecalho";
import { Rodape } from "@/componentes/rodape";

export default function LayoutSite({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cabecalho />
      <main className="flex-1">{children}</main>
      <Rodape />
    </>
  );
}
