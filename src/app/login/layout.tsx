import { FaixaCores } from "@/componentes/faixa-cores";

export default function LayoutLogin({ children }: { children: React.ReactNode }) {
  return (
    <div className="fundo-admin flex min-h-screen flex-col">
      <FaixaCores />
      <div className="flex flex-1 items-center justify-center px-4 py-10">{children}</div>
    </div>
  );
}
