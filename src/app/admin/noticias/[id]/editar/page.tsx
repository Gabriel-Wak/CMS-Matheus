import { notFound } from "next/navigation";
import { FormularioNoticia } from "@/componentes/formulario-noticia";
import { banco } from "@/lib/banco";

type Propriedades = {
  params: Promise<{ id: string }>;
};

export default async function PaginaEditarNoticia({ params }: Propriedades) {
  const { id } = await params;

  const noticia = await banco.noticia.findUnique({ where: { id } });
  if (!noticia) notFound();

  return (
    <FormularioNoticia
      noticia={{
        id: noticia.id,
        titulo: noticia.titulo,
        resumo: noticia.resumo,
        conteudo: noticia.conteudo,
        imagem: noticia.imagem,
      }}
    />
  );
}
