import { createHmac } from "crypto";

export const NOME_COOKIE = "sessao_admin";
export const DURACAO_SEGUNDOS = 60 * 60 * 8;

// chave pra assinar o cookie (colocar no .env em producao)
const SEGREDO = process.env.SEGREDO_SESSAO || "trocar-essa-chave";

export function criarToken(email: string) {
  const validade = Date.now() + DURACAO_SEGUNDOS * 1000;
  const base = email + "|" + validade;
  const assinatura = createHmac("sha256", SEGREDO).update(base).digest("hex");
  return base + "|" + assinatura;
}

export function tokenValido(token: string | undefined) {
  if (!token) {
    return false;
  }

  const partes = token.split("|");
  if (partes.length !== 3) {
    return false;
  }

  const email = partes[0];
  const validade = Number(partes[1]);
  const assinatura = partes[2];

  if (Date.now() > validade) {
    return false;
  }

  const base = email + "|" + validade;
  const esperada = createHmac("sha256", SEGREDO).update(base).digest("hex");

  return assinatura === esperada;
}
