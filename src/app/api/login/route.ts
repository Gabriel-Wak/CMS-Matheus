import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { criarToken, DURACAO_SEGUNDOS, NOME_COOKIE } from "@/lib/sessao";

export async function POST(requisicao: Request) {
  const corpo = await requisicao.json();
  const email = corpo.email;
  const senha = corpo.senha;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const chave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !chave) {
    return NextResponse.json({ erro: "Configuração do Supabase faltando" });
  }

  const supabase = createClient(url, chave);

  const resultado = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });

  if (resultado.error) {
    return NextResponse.json({ erro: "E-mail ou senha incorretos" });
  }

  const token = criarToken(email);
  const resposta = NextResponse.json({ ok: true });

  // cookie httpOnly pra nao expor no javascript
  resposta.cookies.set(NOME_COOKIE, token, {
    httpOnly: true,
    path: "/",
    maxAge: DURACAO_SEGUNDOS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return resposta;
}
