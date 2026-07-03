import Link from "next/link";
import { FaixaCores } from "@/componentes/faixa-cores";
import { LinksRedes } from "@/componentes/links-redes";
import { CONTATO, LINKS_MENU, NOME_DO_SITE } from "@/lib/config";

export function Rodape() {
  return (
    <footer className="mt-auto">
      <section className="border-t py-12" style={{ borderColor: "#ffcc00", background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold uppercase tracking-widest sm:text-2xl" style={{ color: "#001a3d" }}>
            Fique por dentro do nosso trabalho
          </h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#2b5a9a" }}>
            Siga e compartilhe nossas redes sociais
          </p>
          <div className="mt-6 flex justify-center">
            <LinksRedes estilo="circulo" tamanho={18} />
          </div>
        </div>
      </section>

      <FaixaCores />

      <section className="text-white" style={{ background: "#001a3d" }}>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-3">
            <div>
              <p className="font-bold">{CONTATO.telefoneRotulo}</p>
              <p className="mt-1" style={{ color: "#ffcc00" }}>
                {CONTATO.telefone}
              </p>
            </div>
            {CONTATO.escritorios.map((esc) => (
              <div key={esc.nome}>
                <p className="font-bold">{esc.nome}</p>
                <p className="mt-1 text-sm" style={{ color: "#ffcc00" }}>
                  {esc.endereco}
                </p>
                <p className="mt-1 text-sm" style={{ color: "#1f9d55" }}>
                  {esc.telefone}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 py-10 text-center md:grid-cols-3 md:text-left">
            <div>
              <p className="text-lg font-bold uppercase tracking-widest">{NOME_DO_SITE}</p>
              <p className="mt-2 text-sm text-white/70">
                Portal oficial com notícias, projetos e transparência
              </p>
            </div>

            <ul className="space-y-2 text-sm">
              {LINKS_MENU.map((link) => (
                <li key={link.caminho}>
                  <Link href={link.caminho} className="text-white/80 hover:text-yellow-300">
                    {link.rotulo}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/busca" className="text-white/80 hover:text-yellow-300">
                  Busca
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/80 hover:text-yellow-300">
                  Área administrativa
                </Link>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-3 md:items-start">
              <p className="text-sm font-bold uppercase tracking-widest text-white/90">Redes sociais</p>
              <LinksRedes estilo="icone" tamanho={20} className="links-redes-rodape" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
