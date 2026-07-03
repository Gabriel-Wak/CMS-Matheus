import Link from "next/link";

export function CardConteudo({
  link,
  titulo,
  imagem,
  tipo,
}: {
  link: string;
  titulo: string;
  imagem: string;
  tipo: string;
}) {
  const corBadge = tipo === "projeto" ? "#1f9d55" : "#2b5a9a";

  return (
    <Link href={link} className="cartao card-conteudo">
      <div className="card-conteudo-imagem">
        <img src={imagem} alt={titulo} />
        <span className="card-conteudo-badge" style={{ background: corBadge }}>
          {tipo}
        </span>
      </div>
      <div className="card-conteudo-corpo">
        <h3 className="card-conteudo-titulo">{titulo}</h3>
      </div>
    </Link>
  );
}
