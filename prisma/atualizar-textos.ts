import { PrismaClient } from "@prisma/client";

const banco = new PrismaClient();

async function main() {
  const banners = await banco.banner.updateMany({
    where: { titulo: "Construa conosco" },
    data: { titulo: "Banner 1", subtitulo: "texto de exemplo" },
  });

  await banco.banner.updateMany({
    where: { titulo: "Trabalho em Sergipe" },
    data: { titulo: "Banner 2", subtitulo: "outro texto" },
  });

  await banco.noticia.updateMany({
    where: { titulo: "Inauguração do novo espaço de atendimento" },
    data: {
      titulo: "Noticia teste 1",
      resumo: "resumo da noticia",
      conteudo: "conteudo da noticia aqui",
    },
  });

  await banco.noticia.updateMany({
    where: { titulo: "Projeto de iluminação em bairros da capital" },
    data: {
      titulo: "Noticia teste 2",
      resumo: "outro resumo",
      conteudo: "mais texto de exemplo",
    },
  });

  await banco.noticia.updateMany({
    where: { titulo: "Audiência pública sobre mobilidade urbana" },
    data: {
      titulo: "Noticia teste 3",
      resumo: "resumo curto",
      conteudo: "texto placeholder",
    },
  });

  await banco.projeto.updateMany({
    where: { titulo: "Saúde mais perto" },
    data: {
      titulo: "Projeto teste 1",
      descricao: "descricao do projeto",
    },
  });

  await banco.projeto.updateMany({
    where: { titulo: "Educação e tecnologia" },
    data: {
      titulo: "Projeto teste 2",
      descricao: "outra descricao",
    },
  });

  console.log("textos atualizados no banco", { banners: banners.count });
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(() => banco.$disconnect());
