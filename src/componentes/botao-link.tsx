import Link from "next/link";

export function BotaoLink({
  caminho,
  children,
  cor,
}: {
  caminho: string;
  children: string;
  cor: "amarelo" | "verde";
}) {
  const classe = cor === "amarelo" ? "botao botao-amarelo" : "botao botao-verde";

  return (
    <Link href={caminho} className={classe}>
      {children}
    </Link>
  );
}
