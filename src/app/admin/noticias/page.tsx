import Link from "next/link";
import { BotaoExcluir } from "@/componentes/botao-excluir";
import { CabecalhoAdmin } from "@/componentes/cabecalho-admin";
import { banco } from "@/lib/banco";

export default async function PaginaAdminNoticias() {
  const noticias = await banco.noticia.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div>
      <CabecalhoAdmin titulo="Notícias" linkNovo={{ caminho: "/admin/noticias/novo", texto: "Nova notícia" }} />

      {noticias.length === 0 ? (
        <p className="text-gray-500">Nenhuma notícia cadastrada.</p>
      ) : (
        <div className="tabela-admin-wrap">
          <table className="tabela-admin">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Slug</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => (
              <tr key={noticia.id}>
                <td>
                  <img src={noticia.imagem} alt="" className="h-12 w-20 object-cover" />
                </td>
                <td>{noticia.titulo}</td>
                <td className="text-sm text-gray-600">{noticia.slug}</td>
                <td className="acoes-tabela">
                  <Link href={"/noticias/" + noticia.slug} className="link-acao" target="_blank">
                    Ver
                  </Link>
                  <Link href={`/admin/noticias/${noticia.id}/editar`} className="link-acao">
                    Editar
                  </Link>
                  <BotaoExcluir id={noticia.id} tipo="noticias" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
