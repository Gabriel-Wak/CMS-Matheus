import { PrismaClient } from "@prisma/client";
import { gerarSlug } from "../src/lib/slug";

const banco = new PrismaClient();

const IMG =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80";

async function main() {
  const banners = await banco.banner.count();
  if (banners > 0) {
    console.log("ja tem conteudo, nao vou sobrescrever");
    return;
  }

  await banco.banner.createMany({
    data: [
      {
        titulo: "Banner 1",
        subtitulo: "texto de exemplo",
        imagem: IMG,
      },
      {
        titulo: "Banner 2",
        subtitulo: "outro texto",
        imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  });

  await banco.noticia.createMany({
    data: [
      {
        titulo: "Noticia teste 1",
        slug: gerarSlug("Noticia teste 1") + "-1",
        resumo: "resumo da noticia",
        conteudo: "conteudo da noticia aqui",
        imagem: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80",
      },
      {
        titulo: "Noticia teste 2",
        slug: gerarSlug("Noticia teste 2") + "-2",
        resumo: "outro resumo",
        conteudo: "mais texto de exemplo",
        imagem: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80",
      },
      {
        titulo: "Noticia teste 3",
        slug: gerarSlug("Noticia teste 3") + "-3",
        resumo: "resumo curto",
        conteudo: "texto placeholder",
        imagem: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  });

  await banco.projeto.createMany({
    data: [
      {
        titulo: "Projeto teste 1",
        slug: gerarSlug("Projeto teste 1") + "-1",
        descricao: "descricao do projeto",
        imagem: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        titulo: "Projeto teste 2",
        slug: gerarSlug("Projeto teste 2") + "-2",
        descricao: "outra descricao",
        imagem: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  });

  console.log("conteudo demo cadastrado");
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(() => banco.$disconnect());
