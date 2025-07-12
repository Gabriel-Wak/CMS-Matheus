export const dynamic = "force-dynamic";

import { BannerPrincipal } from "@/componentes/banner-principal";
import { BarraRedes } from "@/componentes/barra-redes";
import { BotaoLink } from "@/componentes/botao-link";
import { CardConteudo } from "@/componentes/card-conteudo";
import { ListaCardsAnimada } from "@/componentes/lista-cards-animada";
import { TituloSecao } from "@/componentes/titulo-secao";
import { banco } from "@/lib/banco";

export default async function PaginaInicial() {
  const banners = await banco.banner.findMany({
    orderBy: { criadoEm: "desc" },
  });

  const noticias = await banco.noticia.findMany({
    orderBy: { criadoEm: "desc" },
    take: 3,
  });

  const projetos = await banco.projeto.findMany({
    orderBy: { criadoEm: "desc" },
    take: 3,
  });

  return (
    <>
      <BannerPrincipal banners={banners} />

      <BarraRedes />

      <section className="secao-site secao-branca">
        <div className="secao-site-conteudo">
          <TituloSecao texto="Notícias" />

          {noticias.length === 0 ? (
            <p className="secao-vazia">Nenhuma notícia publicada ainda.</p>
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

          <div className="secao-botao">
            <BotaoLink caminho="/noticias" cor="amarelo">
              Ver mais notícias
            </BotaoLink>
          </div>
        </div>
      </section>

      <section className="secao-site secao-cinza">
        <div className="secao-site-conteudo">
          <TituloSecao texto="Projetos" />

          {projetos.length === 0 ? (
            <p className="secao-vazia">Nenhum projeto publicado ainda.</p>
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

          <div className="secao-botao">
            <BotaoLink caminho="/projetos" cor="verde">
              Ver mais projetos
            </BotaoLink>
          </div>
        </div>
      </section>
    </>
  );
}
