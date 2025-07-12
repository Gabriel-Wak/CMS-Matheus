import { CabecalhoPagina } from "@/componentes/cabecalho-pagina";
import { FormularioContato } from "@/componentes/formulario-contato";
import { LinksRedes } from "@/componentes/links-redes";
import { IMAGEM_PADRAO } from "@/lib/config";

export default function PaginaContato() {
  return (
    <>
      <CabecalhoPagina
        titulo="Contato"
        caminho={[
          { rotulo: "Início", caminho: "/" },
          { rotulo: "Contato" },
        ]}
      />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide sm:text-2xl" style={{ color: "#001a3d" }}>
              Entrar em contato com o gabinete é fácil
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Preencha o formulário abaixo com sua mensagem. Nossa equipe retornará
              o mais breve possível.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold" style={{ color: "#001a3d" }}>
                Siga nossas redes
              </p>
              <LinksRedes estilo="circulo" tamanho={16} />
            </div>
            <div className="mt-8">
              <FormularioContato />
            </div>
          </div>

          <div className="relative overflow-hidden p-6 text-white sm:p-8" style={{ background: "#001a3d" }}>
            <img
              src={IMAGEM_PADRAO}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="relative">
              <h2 className="text-xl font-bold sm:text-2xl">Construa conosco</h2>
              <p className="mt-3 text-sm text-white/85">
                Quero deixar um canal de escuta aberto aqui com você!
              </p>
              <p className="mt-6 text-sm text-white/75">
                Telefone e endereço ficam no rodapé. O formulário ainda está em desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
