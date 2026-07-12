"use client";

import { useEffect, useState } from "react";
import { FormularioHero } from "@/componentes/formulario-hero";
import { IMAGEM_PADRAO } from "@/lib/config";

type ItemBanner = {
  id: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
};

// troca o banner a cada 6 segundos
const INTERVALO_MS = 6000;

export function CarrosselBanner({ itens }: { itens: ItemBanner[] }) {
  const lista =
    itens.length > 0
      ? itens
      : [
          {
            id: "padrao",
            titulo: "Banner padrao",
            subtitulo: "texto de exemplo",
            imagem: IMAGEM_PADRAO,
          },
        ];

  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (lista.length <= 1) return;

    const timer = setInterval(() => {
      setAtual((indice) => (indice + 1) % lista.length);
    }, INTERVALO_MS);

    return () => clearInterval(timer);
  }, [lista.length]);

  const itemAtual = lista[atual];

  return (
    <section className="hero-banner">
      <div className="hero-banner-fotos">
        {lista.map((item, indice) => (
          <img
            key={item.id}
            src={item.imagem || IMAGEM_PADRAO}
            alt={item.titulo}
            className={indice === atual ? "hero-banner-foto ativa" : "hero-banner-foto"}
          />
        ))}
        <div className="hero-banner-overlay" />
      </div>

      <div className="hero-banner-conteudo">
        <FormularioHero titulo={itemAtual.titulo} subtitulo={itemAtual.subtitulo} />
      </div>

      {lista.length > 1 ? (
        <div className="hero-banner-pontos">
          {lista.map((item, indice) => (
            <button
              key={item.id}
              type="button"
              className={indice === atual ? "hero-banner-ponto ativo" : "hero-banner-ponto"}
              aria-label={"Banner " + (indice + 1)}
              onClick={() => setAtual(indice)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
