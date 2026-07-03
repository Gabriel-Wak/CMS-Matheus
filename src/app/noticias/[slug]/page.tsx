export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { CabecalhoPagina } from "@/componentes/cabecalho-pagina";
import { banco } from "@/lib/banco";

export default async function PaginaNoticia({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = await banco.noticia.findUnique({ where: { slug: slug } });

  if (!noticia) notFound();

  return (
    <>
      <CabecalhoPagina
        titulo={noticia.titulo}
        caminho={[
          { rotulo: "Início", caminho: "/" },
          { rotulo: "Notícias", caminho: "/noticias" },
          { rotulo: noticia.titulo },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-12">
        <img
          src={noticia.imagem}
          alt={noticia.titulo}
          className="mb-6 w-full object-cover"
          style={{ maxHeight: 400 }}
        />
        <p className="text-sm text-gray-500">
          {noticia.criadoEm.toLocaleDateString("pt-BR")}
        </p>
        <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-gray-700">
          {noticia.conteudo}
        </div>
      </article>
    </>
  );
}
