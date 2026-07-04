"use client";

import { Children, useEffect, useRef, useState } from "react";

export function ListaCardsAnimada({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo) return;

    // quando o card aparece na tela, roda a animacao
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(alvo);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="lista-cards-animada">
      {Children.map(children, (filho, indice) => (
        <div
          key={indice}
          className={visivel ? "card-surgindo visivel" : "card-surgindo"}
          style={{ animationDelay: indice * 0.12 + "s" }}
        >
          {filho}
        </div>
      ))}
    </div>
  );
}
