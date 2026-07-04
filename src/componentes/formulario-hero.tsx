"use client";

export function FormularioHero({ titulo, subtitulo }: { titulo: string; subtitulo: string }) {
  return (
    <div className="formulario-hero">
      <div className="formulario-hero-faixa">
        <span />
        <span />
        <span />
      </div>

      <h2 className="formulario-hero-titulo">{titulo}</h2>
      <p className="formulario-hero-texto">{subtitulo}</p>

      {/* formulario so visual por enquanto */}
      <form
        className="formulario-hero-campos"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input className="campo" type="text" placeholder="Nome" />
        <input className="campo" type="email" placeholder="E-mail" />
        <input className="campo" type="tel" placeholder="Celular: 79 99900-0000" />
        <button className="botao botao-amarelo w-full" type="submit">
          Enviar
        </button>
        <p className="text-xs text-white/70">Ainda nao envia de verdade, so o layout.</p>
      </form>
    </div>
  );
}
