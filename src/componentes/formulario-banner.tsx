"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DadosBanner = {
  id: string;
  titulo: string;
  subtitulo: string | null;
  imagem: string;
};

export function FormularioBanner({ banner }: { banner?: DadosBanner }) {
  const roteador = useRouter();
  const [titulo, setTitulo] = useState(banner ? banner.titulo : "");
  const [subtitulo, setSubtitulo] = useState(banner ? banner.subtitulo ?? "" : "");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setSalvando(true);

    const formulario = new FormData(evento.currentTarget);

    // na edicao a imagem e opcional
    let url = "/api/banners";
    let metodo = "POST";

    if (banner && banner.id) {
      url = "/api/banners/" + banner.id;
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

      roteador.push("/admin/banners");
      roteador.refresh();
    } catch {
      setErro("Deu erro ao salvar. Tenta de novo.");
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={salvar} className="form-admin">
      <h2 className="form-admin-titulo">{banner ? "Editar banner" : "Novo banner"}</h2>

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
        Subtítulo
        <input
          className="campo campo-borda"
          name="subtitulo"
          value={subtitulo}
          onChange={(e) => setSubtitulo(e.target.value)}
        />
      </label>

      <label className="form-admin-label">
        Imagem {banner ? "(deixa vazio pra manter a atual)" : ""}
        <input
          className="campo campo-borda"
          name="imagem"
          type="file"
          accept="image/*"
          required={!banner}
        />
      </label>

      {banner ? (
        <img src={banner.imagem} alt="" className="h-24 w-full object-cover" />
      ) : null}

      <button className="botao" type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
