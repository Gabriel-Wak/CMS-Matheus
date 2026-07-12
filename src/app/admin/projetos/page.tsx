import Link from "next/link";
import { BotaoExcluir } from "@/componentes/botao-excluir";
import { CabecalhoAdmin } from "@/componentes/cabecalho-admin";
import { banco } from "@/lib/banco";

export default async function PaginaAdminProjetos() {
  const projetos = await banco.projeto.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div>
      <CabecalhoAdmin titulo="Projetos" linkNovo={{ caminho: "/admin/projetos/novo", texto: "Novo projeto" }} />

      {projetos.length === 0 ? (
        <p className="text-gray-500">Sem projetos.</p>
      ) : (
        <div className="tabela-admin-wrap">
          <table className="tabela-admin">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto) => (
              <tr key={projeto.id}>
                <td>
                  <img src={projeto.imagem} alt="" className="h-12 w-20 object-cover" />
                </td>
                <td>{projeto.titulo}</td>
                <td className="text-sm text-gray-600">
                  {projeto.descricao.length > 40
                    ? projeto.descricao.slice(0, 40) + "..."
                    : projeto.descricao}
                </td>
                <td className="acoes-tabela">
                  <Link href={`/admin/projetos/${projeto.id}/editar`} className="link-acao">
                    Editar
                  </Link>
                  <BotaoExcluir id={projeto.id} tipo="projetos" />
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
