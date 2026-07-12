import { NextResponse } from "next/server";
import { atualizarSite } from "@/lib/atualizar-site";
import { banco } from "@/lib/banco";
import { enviarImagem } from "@/lib/upload";
import { adminLogado } from "@/lib/verificar-sessao";

export async function POST(requisicao: Request) {
  const logado = await adminLogado();
  if (!logado) {
    return NextResponse.json({ erro: "Nao autorizado" });
  }

  try {
    const formulario = await requisicao.formData();
    const titulo = String(formulario.get("titulo") ?? "").trim();
    const subtitulo = String(formulario.get("subtitulo") ?? "").trim();
    const arquivo = formulario.get("imagem");

    if (!titulo || !(arquivo instanceof File) || arquivo.size === 0) {
      return NextResponse.json({ erro: "Titulo e imagem sao obrigatorios" });
    }

    const urlImagem = await enviarImagem("banners", arquivo);

    const banner = await banco.banner.create({
      data: {
        titulo: titulo,
        subtitulo: subtitulo,
        imagem: urlImagem,
      },
    });

    atualizarSite();

    return NextResponse.json({ ok: true, id: banner.id });
  } catch {
    return NextResponse.json({ erro: "Nao consegui salvar o banner" });
  }
}
