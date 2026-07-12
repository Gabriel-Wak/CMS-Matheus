import { NextResponse } from "next/server";
import { atualizarSite } from "@/lib/atualizar-site";
import { banco } from "@/lib/banco";
import { gerarSlug } from "@/lib/slug";
import { enviarImagem } from "@/lib/upload";
import { adminLogado } from "@/lib/verificar-sessao";

export async function POST(requisicao: Request) {
  const logado = await adminLogado();
  if (!logado) {
    return NextResponse.json({ erro: "Acesso negado" });
  }

  try {
    const formulario = await requisicao.formData();
    const titulo = String(formulario.get("titulo") ?? "").trim();
    const descricao = String(formulario.get("descricao") ?? "").trim();
    const arquivo = formulario.get("imagem");

    if (!titulo || !descricao || !(arquivo instanceof File) || arquivo.size === 0) {
      return NextResponse.json({ erro: "Falta preencher algum campo" });
    }

    const slug = gerarSlug(titulo);
    const urlImagem = await enviarImagem("projetos", arquivo);

    const projeto = await banco.projeto.create({
      data: {
        titulo: titulo,
        slug: slug,
        descricao: descricao,
        imagem: urlImagem,
      },
    });

    atualizarSite();

    return NextResponse.json({ ok: true, id: projeto.id });
  } catch {
    return NextResponse.json({ erro: "Deu erro ao gravar projeto" });
  }
}
