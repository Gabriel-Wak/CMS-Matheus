"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Propriedades = {
  id: string;
  tipo: "banners" | "noticias" | "projetos";
};

export function BotaoExcluir({ id, tipo }: Propriedades) {
  const roteador = useRouter();
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");

  async function excluir() {
    const confirmou = window.confirm("Tem certeza que quer excluir?");
    if (!confirmou) return;

    setErro("");
    setExcluindo(true);

    try {
      const resposta = await fetch(`/api/${tipo}/${id}`, { method: "DELETE" });
      const dados = await resposta.json();

      if (dados.erro) {
        setErro(dados.erro);
        return;
      }

      roteador.refresh();
    } catch {
      setErro("Nao deu pra excluir. Tenta de novo.");
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        className="botao-excluir"
        onClick={excluir}
        disabled={excluindo}
      >
        {excluindo ? "Excluindo..." : "Excluir"}
      </button>
      {erro ? <span className="text-xs text-red-600">{erro}</span> : null}
    </span>
  );
}
