import { notFound } from "next/navigation";
import { FormularioBanner } from "@/componentes/formulario-banner";
import { banco } from "@/lib/banco";

type Propriedades = {
  params: Promise<{ id: string }>;
};

export default async function PaginaEditarBanner({ params }: Propriedades) {
  const { id } = await params;

  const banner = await banco.banner.findUnique({ where: { id } });
  if (!banner) notFound();

  return (
    <FormularioBanner
      banner={{
        id: banner.id,
        titulo: banner.titulo,
        subtitulo: banner.subtitulo ?? "",
        imagem: banner.imagem,
      }}
    />
  );
}
