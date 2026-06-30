import Link from "next/link";

type Propriedades = {
  titulo: string;
  linkNovo?: { caminho: string; texto: string };
};

export function CabecalhoAdmin({ titulo, linkNovo }: Propriedades) {
  return (
    <div className="cabecalho-admin">
      <div className="cabecalho-admin-topo">
        <Link href="/" className="link-voltar-site">
          ← Voltar ao site
        </Link>

        {linkNovo ? (
          <Link href={linkNovo.caminho} className="botao botao-admin">
            {linkNovo.texto}
          </Link>
        ) : null}
      </div>

      <h1 className="cabecalho-admin-titulo">{titulo}</h1>
    </div>
  );
}
