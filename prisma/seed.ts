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
        titulo: "Construa conosco",
        subtitulo: "Quero deixar um canal de escuta aberto aqui com você!",
        imagem: IMG,
      },
      {
        titulo: "Trabalho em Sergipe",
        subtitulo: "Projetos e ações para a nossa gente",
        imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  });

  await banco.noticia.createMany({
    data: [
      {
        titulo: "Inauguração do novo espaço de atendimento",
        slug: gerarSlug("Inauguração do novo espaço de atendimento") + "-1",
        resumo: "Estrutura reformada para receber melhor a população.",
        conteudo:
          "Inauguramos o novo espaço de atendimento no gabinete.\n\nA ideia é facilitar o contato com moradores e lideranças da região.",
        imagem: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80",
      },
      {
        titulo: "Projeto de iluminação em bairros da capital",
        slug: gerarSlug("Projeto de iluminação em bairros da capital") + "-2",
        resumo: "Melhoria da segurança com troca de luminárias.",
        conteudo:
          "Estamos acompanhando a troca de luminárias em vias importantes de Aracaju.\n\nO objetivo é deixar o trajeto mais seguro à noite.",
        imagem: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80",
      },
      {
        titulo: "Audiência pública sobre mobilidade urbana",
        slug: gerarSlug("Audiência pública sobre mobilidade urbana") + "-3",
        resumo: "Moradores participaram e trouxeram sugestões.",
        conteudo:
          "Realizamos audiência para ouvir demandas sobre transporte e trânsito.\n\nVamos levar as propostas para os órgãos competentes.",
        imagem: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  });

  await banco.projeto.createMany({
    data: [
      {
        titulo: "Saúde mais perto",
        slug: gerarSlug("Saúde mais perto") + "-1",
        descricao: "Articulação para ampliar horário de unidades básicas em bairros periféricos.",
        imagem: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        titulo: "Educação e tecnologia",
        slug: gerarSlug("Educação e tecnologia") + "-2",
        descricao: "Parceria com escolas para oficinas de informática e reforço escolar.",
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
