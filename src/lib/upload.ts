import { createClient } from "@supabase/supabase-js";

// so roda no servidor - usa service role pra subir imagem
export async function enviarImagem(pasta: string, arquivo: File) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const chave = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !chave) {
    throw new Error("Faltou configurar Supabase no .env");
  }

  const supabase = createClient(url, chave);
  const nomeArquivo = Date.now() + "-" + arquivo.name.replace(/\s/g, "-");
  const caminho = pasta + "/" + nomeArquivo;

  const bytes = await arquivo.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const resultado = await supabase.storage.from(pasta).upload(caminho, buffer, {
    contentType: arquivo.type,
    upsert: false,
  });

  if (resultado.error) {
    throw new Error("Erro ao enviar imagem");
  }

  const link = supabase.storage.from(pasta).getPublicUrl(caminho);
  return link.data.publicUrl;
}
