import { CarrosselBanner } from "@/componentes/carrossel-banner";

type DadosBanner = {
  id: string;
  titulo: string;
  subtitulo: string | null;
  imagem: string;
};

export function BannerPrincipal({ banners }: { banners: DadosBanner[] }) {
  const itens = banners.map((banner) => ({
    id: banner.id,
    titulo: banner.titulo,
    subtitulo: banner.subtitulo ?? "",
    imagem: banner.imagem,
  }));

  return <CarrosselBanner itens={itens} />;
}
