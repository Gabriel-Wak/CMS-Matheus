import { cookies } from "next/headers";
import { NOME_COOKIE, tokenValido } from "@/lib/sessao";

export async function adminLogado() {
  const listaCookies = await cookies();
  const token = listaCookies.get(NOME_COOKIE)?.value;
  return tokenValido(token);
}
