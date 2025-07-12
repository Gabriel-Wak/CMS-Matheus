"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DadosProjeto = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
};

export function FormularioProjeto({ projeto }: { projeto?: DadosProjeto }) {
  const roteador = useRouter();
  const [titulo, setTitulo] = useState(projeto ? projeto.titulo : "");
  const [descricao, setDescricao] = useState(projeto ? projeto.descricao : "");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setSalvando(true);

    const formulario = new FormData(evento.currentTarget);

    // mesma ideia do formulario de noticia
    let url = "/api/projetos";
    let metodo = "POST";

    if (projeto && projeto.id) {
      url = "/api/projetos/" + projeto.id;
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

      roteador.push("/admin/projetos");
      roteador.refresh();
    } catch {
      setErro("Deu erro ao salvar. Tenta de novo.");
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={salvar} className="form-admin">
      <h2 className="form-admin-titulo">{projeto ? "Editar projeto" : "Novo projeto"}</h2>

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
        Descrição
        <textarea
          className="campo campo-borda min-h-[160px]"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
      </label>

      <label className="form-admin-label">
        Imagem {projeto ? "(deixa vazio pra manter a atual)" : ""}
        <input
          className="campo campo-borda"
          name="imagem"
          type="file"
          accept="image/*"
          required={!projeto}
        />
      </label>

      {projeto ? (
        <img src={projeto.imagem} alt="" className="h-24 w-full object-cover" />
      ) : null}

      <button className="botao" type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
