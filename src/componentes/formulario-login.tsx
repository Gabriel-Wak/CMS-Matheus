"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormularioLogin() {
  const roteador = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");

    const resposta = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, senha: senha }),
    });

    const dados = await resposta.json();

    if (dados.erro) {
      setErro(dados.erro);
      return;
    }

    roteador.push("/admin");
  }

  return (
    <form onSubmit={enviar} className="cartao space-y-4 p-6">
      <h1 className="text-xl font-bold uppercase tracking-widest" style={{ color: "#001a3d" }}>
        Login do admin
      </h1>

      {erro ? <p className="text-sm text-red-600">{erro}</p> : null}

      <input
        className="campo border border-gray-300"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="campo border border-gray-300"
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <button className="botao w-full" type="submit">
        Entrar
      </button>
    </form>
  );
}
