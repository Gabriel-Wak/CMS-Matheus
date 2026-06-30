import Link from "next/link";
import { banco } from "@/lib/banco";

export default async function PaginaAdminInicio() {
  const totalBanners = await banco.banner.count();
  const totalNoticias = await banco.noticia.count();
  const totalProjetos = await banco.projeto.count();

  return (
    <div>
      <div className="cabecalho-admin-topo">
        <Link href="/" className="link-voltar-site">
          ← Voltar ao site
        </Link>
      </div>

      <h1 className="cabecalho-admin-titulo">Painel administrativo</h1>
      <p className="mb-6 text-sm text-gray-600">Escolha o que quer cadastrar ou editar.</p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-admin">
          <p className="text-sm text-gray-500">Banners</p>
          <p className="card-admin-numero">{totalBanners}</p>
          <Link href="/admin/banners" className="card-admin-link">
            Gerenciar banners
          </Link>
        </div>

        <div className="card-admin">
          <p className="text-sm text-gray-500">Notícias</p>
          <p className="card-admin-numero">{totalNoticias}</p>
          <Link href="/admin/noticias" className="card-admin-link">
            Gerenciar notícias
          </Link>
        </div>

        <div className="card-admin">
          <p className="text-sm text-gray-500">Projetos</p>
          <p className="card-admin-numero">{totalProjetos}</p>
          <Link href="/admin/projetos" className="card-admin-link">
            Gerenciar projetos
          </Link>
        </div>
      </div>
    </div>
  );
}
