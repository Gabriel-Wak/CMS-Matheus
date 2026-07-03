export const dynamic = "force-dynamic";

import { CabecalhoPagina } from "@/componentes/cabecalho-pagina";
import { CardConteudo } from "@/componentes/card-conteudo";
import { ListaCardsAnimada } from "@/componentes/lista-cards-animada";
import { TituloSecao } from "@/componentes/titulo-secao";
import { banco } from "@/lib/banco";

export default async function PaginaProjetos() {
  const projetos = await banco.projeto.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <>
      <CabecalhoPagina
        titulo="Projetos"
        caminho={[
          { rotulo: "Início", caminho: "/" },
          { rotulo: "Projetos" },
        ]}
      />

      <section className="py-14" style={{ background: "#f4f5f7" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TituloSecao texto="Projetos em andamento" />

          {projetos.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">Nenhum projeto.</p>
          ) : (
            <ListaCardsAnimada>
              {projetos.map((projeto) => (
                <CardConteudo
                  key={projeto.id}
                  link={"/projetos/" + projeto.slug}
                  titulo={projeto.titulo}
                  imagem={projeto.imagem}
                  tipo="projeto"
                />
              ))}
            </ListaCardsAnimada>
          )}
        </div>
      </section>
    </>
  );
}
