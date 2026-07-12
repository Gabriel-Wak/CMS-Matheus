
import { CabecalhoPagina } from "@/componentes/cabecalho-pagina";
import { CardConteudo } from "@/componentes/card-conteudo";
import { ListaCardsAnimada } from "@/componentes/lista-cards-animada";
import { TituloSecao } from "@/componentes/titulo-secao";
import { banco } from "@/lib/banco";

export default async function PaginaNoticias() {
  const noticias = await banco.noticia.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <>
      <CabecalhoPagina
        titulo="Notícias"
        caminho={[
          { rotulo: "Início", caminho: "/" },
          { rotulo: "Notícias" },
        ]}
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TituloSecao texto="Últimas notícias" />

          {noticias.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">Nenhuma notícia.</p>
          ) : (
            <ListaCardsAnimada>
              {noticias.map((noticia) => (
                <CardConteudo
                  key={noticia.id}
                  link={"/noticias/" + noticia.slug}
                  titulo={noticia.titulo}
                  imagem={noticia.imagem}
                  tipo="notícia"
                />
              ))}
            </ListaCardsAnimada>
          )}
        </div>
      </section>
    </>
  );
}
