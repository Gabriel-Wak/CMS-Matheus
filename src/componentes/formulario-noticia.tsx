"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DadosNoticia = {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string;
};

export function FormularioNoticia({ noticia }: { noticia?: DadosNoticia }) {
  const roteador = useRouter();
  const [titulo, setTitulo] = useState(noticia ? noticia.titulo : "");
  const [resumo, setResumo] = useState(noticia ? noticia.resumo : "");
  const [conteudo, setConteudo] = useState(noticia ? noticia.conteudo : "");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setSalvando(true);

    const formulario = new FormData(evento.currentTarget);

    // slug é gerado na api
    let url = "/api/noticias";
    let metodo = "POST";

    if (noticia && noticia.id) {
      url = "/api/noticias/" + noticia.id;
      metodo = "PUT";
    }

    try {
      const resposta = await fetch(url, {
        method: metodo,
        body: formulario,
      });

      const dados = await resposta.json();

      if (dados.erro) {
        setErro(dados.erro);
        setSalvando(false);
        return;
      }

      roteador.push("/admin/noticias");
      roteador.refresh();
    } catch {
      setErro("Deu erro ao salvar. Tenta de novo.");
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={salvar} className="form-admin">
      <h2 className="form-admin-titulo">{noticia ? "Editar notícia" : "Nova notícia"}</h2>

      {erro ? <p className="form-admin-erro">{erro}</p> : null}

      <label className="form-admin-label">
        Título
        <input
          className="campo campo-borda"
          name="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </label>

      <label className="form-admin-label">
        Resumo
        <input
          className="campo campo-borda"
          name="resumo"
          value={resumo}
          onChange={(e) => setResumo(e.target.value)}
          required
        />
      </label>

      <label className="form-admin-label">
        Conteúdo
        <textarea
          className="campo campo-borda min-h-[160px]"
          name="conteudo"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
        />
      </label>

      <label className="form-admin-label">
        Imagem {noticia ? "(deixa vazio pra manter a atual)" : ""}
        <input
          className="campo campo-borda"
          name="imagem"
          type="file"
          accept="image/*"
          required={!noticia}
        />
      </label>

      {noticia ? (
        <img src={noticia.imagem} alt="" className="h-24 w-full object-cover" />
      ) : null}

      <button className="botao" type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
