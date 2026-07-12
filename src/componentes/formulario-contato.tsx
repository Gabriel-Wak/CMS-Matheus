"use client";

import { useState } from "react";

export function FormularioContato() {
  const [enviado, setEnviado] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={(evento) => {
        evento.preventDefault();
        // ainda nao salva no banco - vou fazer depois
        setEnviado(true);
      }}
    >
      <input className="campo border border-gray-200" type="text" placeholder="Nome" required />
      <input className="campo border border-gray-200" type="email" placeholder="E-mail" required />
      <input className="campo border border-gray-200" type="tel" placeholder="Celular" />
      <textarea className="campo min-h-[120px] border border-gray-200" placeholder="Mensagem" />
      <button className="botao botao-amarelo w-full" type="submit">
        Enviar
      </button>
      {enviado ? (
        <p className="text-sm text-gray-600">
          Mensagem enviada (so visual por enquanto).
        </p>
      ) : null}
    </form>
  );
}
