export const dynamic = "force-dynamic";

import Link from "next/link";
import { CabecalhoPagina } from "@/componentes/cabecalho-pagina";
import { banco } from "@/lib/banco";

export default async function PaginaBusca({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const termo = (params.q ?? "").trim().toLowerCase();

  const todasNoticias = await banco.noticia.findMany();
  const todosProjetos = await banco.projeto.findMany();

  const noticias = todasNoticias.filter(
    (n) =>
      n.titulo.toLowerCase().includes(termo) ||
      n.resumo.toLowerCase().includes(termo)
  );

  const projetos = todosProjetos.filter(
    (p) =>
      p.titulo.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo)
  );

  return (
    <>
      <CabecalhoPagina titulo="Busca" caminho={[{ rotulo: "Início", caminho: "/" }, { rotulo: "Busca" }]} />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <form className="mb-8 flex gap-2">
          <input
            className="campo border border-gray-300"
            type="search"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Digite o que procura"
          />
          <button className="botao" type="submit">
            Buscar
          </button>
        </form>

        {termo === "" ? (
          <p className="text-gray-500">Digite algo para pesquisar.</p>
        ) : noticias.length === 0 && projetos.length === 0 ? (
          <p className="text-gray-500">Nada encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {noticias.map((item) => (
              <li key={item.id} className="cartao p-4">
                <p className="text-xs text-gray-500">Notícia</p>
                <Link href={"/noticias/" + item.slug} className="text-lg font-bold" style={{ color: "#2b5a9a" }}>
                  {item.titulo}
                </Link>
                <p className="mt-1 text-sm text-gray-600">{item.resumo}</p>
              </li>
            ))}
            {projetos.map((item) => (
              <li key={item.id} className="cartao p-4">
                <p className="text-xs text-gray-500">Projeto</p>
                <Link href={"/projetos/" + item.slug} className="text-lg font-bold" style={{ color: "#2b5a9a" }}>
                  {item.titulo}
                </Link>
                <p className="mt-1 text-sm text-gray-600">{item.descricao}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
