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
    const bannerAtual = await banco.banner.findUnique({ where: { id: id } });

    if (!bannerAtual) {
      return NextResponse.json({ erro: "Banner não encontrado" });
    }

    const formulario = await requisicao.formData();
    const titulo = String(formulario.get("titulo") ?? "").trim();
    const subtitulo = String(formulario.get("subtitulo") ?? "").trim();
    const arquivo = formulario.get("imagem");

    let urlImagem = bannerAtual.imagem;
    if (arquivo instanceof File && arquivo.size > 0) {
      urlImagem = await enviarImagem("banners", arquivo);
    }

    await banco.banner.update({
      where: { id: id },
      data: {
        titulo: titulo,
        subtitulo: subtitulo,
        imagem: urlImagem,
      },
    });

    atualizarSite();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ erro: "Erro ao editar banner" });
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
    await banco.banner.delete({ where: { id: id } });
    atualizarSite();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ erro: "Erro ao excluir banner" });
  }
}
