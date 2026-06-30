import { notFound } from "next/navigation";
import { FormularioProjeto } from "@/componentes/formulario-projeto";
import { banco } from "@/lib/banco";

type Propriedades = {
  params: Promise<{ id: string }>;
};

export default async function PaginaEditarProjeto({ params }: Propriedades) {
  const { id } = await params;

  const projeto = await banco.projeto.findUnique({ where: { id } });
  if (!projeto) notFound();

  return (
    <FormularioProjeto
      projeto={{
        id: projeto.id,
        titulo: projeto.titulo,
        descricao: projeto.descricao,
        imagem: projeto.imagem,
      }}
    />
  );
}
