export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { CabecalhoPagina } from "@/componentes/cabecalho-pagina";
import { banco } from "@/lib/banco";

export default async function PaginaProjeto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = await banco.projeto.findUnique({ where: { slug: slug } });

  if (!projeto) notFound();

  return (
    <>
      <CabecalhoPagina
        titulo={projeto.titulo}
        caminho={[
          { rotulo: "Início", caminho: "/" },
          { rotulo: "Projetos", caminho: "/projetos" },
          { rotulo: projeto.titulo },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-12">
        <img
          src={projeto.imagem}
          alt={projeto.titulo}
          className="mb-6 w-full object-cover"
          style={{ maxHeight: 400 }}
        />
        <div className="whitespace-pre-line text-base leading-relaxed text-gray-700">
          {projeto.descricao}
        </div>
      </article>
    </>
  );
}
