import { NextResponse } from "next/server";
import { NOME_COOKIE } from "@/lib/sessao";

export async function POST(requisicao: Request) {
  const url = new URL("/login", requisicao.url);

  const resposta = NextResponse.redirect(url);

  resposta.cookies.set(NOME_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return resposta;
}
