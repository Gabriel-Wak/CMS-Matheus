import Link from "next/link";
import { BotaoExcluir } from "@/componentes/botao-excluir";
import { CabecalhoAdmin } from "@/componentes/cabecalho-admin";
import { banco } from "@/lib/banco";

export default async function PaginaAdminBanners() {
  const banners = await banco.banner.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div>
      <CabecalhoAdmin titulo="Banners" linkNovo={{ caminho: "/admin/banners/novo", texto: "Novo banner" }} />

      {banners.length === 0 ? (
        <p className="text-gray-500">Nenhum banner cadastrado.</p>
      ) : (
        <div className="tabela-admin-wrap">
          <table className="tabela-admin">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Subtítulo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td>
                  <img src={banner.imagem} alt="" className="h-12 w-20 object-cover" />
                </td>
                <td>{banner.titulo}</td>
                <td>{banner.subtitulo ?? "-"}</td>
                <td className="acoes-tabela">
                  <Link href={`/admin/banners/${banner.id}/editar`} className="link-acao">
                    Editar
                  </Link>
                  <BotaoExcluir id={banner.id} tipo="banners" />
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
