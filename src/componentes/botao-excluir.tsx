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

  async function excluir() {
    const confirmou = window.confirm("Tem certeza que quer excluir?");
    if (!confirmou) return;

    setExcluindo(true);

    const resposta = await fetch(`/api/${tipo}/${id}`, { method: "DELETE" });
    const dados = await resposta.json();
    setExcluindo(false);

    if (dados.erro) {
      alert(dados.erro);
      return;
    }

    roteador.refresh();
  }

  return (
    <button
      type="button"
      className="botao-excluir"
      onClick={excluir}
      disabled={excluindo}
    >
      {excluindo ? "Excluindo..." : "Excluir"}
    </button>
  );
}
