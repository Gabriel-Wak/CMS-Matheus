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
    return NextResponse.json({ erro: "Acesso negado" });
  }

  try {
    const { id } = await params;
    const projetoAtual = await banco.projeto.findUnique({ where: { id: id } });

    if (!projetoAtual) {
      return NextResponse.json({ erro: "Projeto não encontrado" });
    }

    const formulario = await requisicao.formData();
    const titulo = String(formulario.get("titulo") ?? "").trim();
    const descricao = String(formulario.get("descricao") ?? "").trim();
    const arquivo = formulario.get("imagem");

    let urlImagem = projetoAtual.imagem;
    if (arquivo instanceof File && arquivo.size > 0) {
      urlImagem = await enviarImagem("projetos", arquivo);
    }

    await banco.projeto.update({
      where: { id: id },
      data: {
        titulo: titulo,
        descricao: descricao,
        imagem: urlImagem,
      },
    });

    atualizarSite();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ erro: "Erro na edicao do projeto" });
  }
}

export async function DELETE(
  _requisicao: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const logado = await adminLogado();
  if (!logado) {
    return NextResponse.json({ erro: "Acesso negado" });
  }

  try {
    const { id } = await params;
    await banco.projeto.delete({ where: { id: id } });
    atualizarSite();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ erro: "Nao consegui apagar projeto" });
  }
}
