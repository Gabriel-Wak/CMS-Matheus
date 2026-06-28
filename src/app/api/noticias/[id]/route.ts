import { NextResponse } from "next/server";
import { atualizarSite } from "@/lib/atualizar-site";
import { banco } from "@/lib/banco";
import { enviarImagem } from "@/lib/upload";
import { adminLogado } from "@/lib/verificar-sessao";

export async function PUT(
  requisicao: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const logado = await adminLogado();
  if (!logado) {
    return NextResponse.json({ erro: "Sem permissão" });
  }

  try {
    const { id } = await params;
    const noticiaAtual = await banco.noticia.findUnique({ where: { id: id } });

    if (!noticiaAtual) {
      return NextResponse.json({ erro: "Notícia não encontrada" });
    }

    const formulario = await requisicao.formData();
    const titulo = String(formulario.get("titulo") ?? "").trim();
    const resumo = String(formulario.get("resumo") ?? "").trim();
    const conteudo = String(formulario.get("conteudo") ?? "").trim();
    const arquivo = formulario.get("imagem");

    let urlImagem = noticiaAtual.imagem;
    if (arquivo instanceof File && arquivo.size > 0) {
      urlImagem = await enviarImagem("noticias", arquivo);
    }

    await banco.noticia.update({
      where: { id: id },
      data: {
        titulo: titulo,
        resumo: resumo,
        conteudo: conteudo,
        imagem: urlImagem,
      },
    });

    atualizarSite();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ erro: "Erro ao editar notícia" });
  }
}

export async function DELETE(
  _requisicao: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const logado = await adminLogado();
  if (!logado) {
    return NextResponse.json({ erro: "Sem permissão" });
  }

  try {
    const { id } = await params;
    await banco.noticia.delete({ where: { id: id } });
    atualizarSite();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ erro: "Erro ao excluir notícia" });
  }
}
