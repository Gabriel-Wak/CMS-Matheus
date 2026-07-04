import { REDES_SOCIAIS } from "@/lib/config";

// icones svg inline - links vêm do config.ts
type TipoEstilo = "circulo" | "icone";

type Propriedades = {
  estilo?: TipoEstilo;
  tamanho?: number;
  className?: string;
};

const CORES: Record<string, string> = {
  WhatsApp: "#25d366",
  Instagram: "#e4405f",
  Facebook: "#1877f2",
  X: "#111827",
  YouTube: "#ff0000",
};

function IconeRede({ nome, tamanho }: { nome: string; tamanho: number }) {
  if (nome === "WhatsApp") {
    return (
      <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  }

  if (nome === "Instagram") {
    return (
      <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7.8 2h8.4A5.8 5.8 0 0122 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8A5.8 5.8 0 012 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8A3.6 3.6 0 007.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6A3.6 3.6 0 0016.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    );
  }

  if (nome === "Facebook") {
    return (
      <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.25V12h2.2l-.35 3h-1.85v7A10 10 0 0022 12z" />
      </svg>
    );
  }

  if (nome === "X") {
    return (
      <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.8L5.4 22H2.3l7.3-8.4L1 2h6.9l4.7 6.2L18.9 2zm-1.2 18h1.7L7.1 4H5.3l12.4 16z" />
      </svg>
    );
  }

  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18 5.1 12 5.1 12 5.1s-6 0-7.8.3a2.5 2.5 0 00-1.8 1.8C2.1 9 2.1 12 2.1 12s0 3 .3 4.8a2.5 2.5 0 001.8 1.8c1.8.3 7.8.3 7.8.3s6 0 7.8-.3a2.5 2.5 0 001.8-1.8c.3-1.8.3-4.8.3-4.8s0-3-.3-4.8zM10 15.5v-7l5.2 3.5L10 15.5z" />
    </svg>
  );
}

export function LinksRedes({ estilo = "circulo", tamanho = 18, className = "" }: Propriedades) {
  const tamanhoBotao = tamanho + 14;

  return (
    <div className={`links-redes ${className}`.trim()}>
      {REDES_SOCIAIS.map((rede) => {
        const cor = CORES[rede.nome] ?? "#2b5a9a";

        if (estilo === "icone") {
          return (
            <a
              key={rede.nome}
              href={rede.link}
              target="_blank"
              rel="noreferrer"
              className="link-rede-icone"
              aria-label={rede.nome}
              title={rede.nome}
            >
              <IconeRede nome={rede.nome} tamanho={tamanho} />
            </a>
          );
        }

        return (
          <a
            key={rede.nome}
            href={rede.link}
            target="_blank"
            rel="noreferrer"
            className="link-rede-circulo"
            style={{ background: cor, width: tamanhoBotao, height: tamanhoBotao }}
            aria-label={rede.nome}
            title={rede.nome}
          >
            <IconeRede nome={rede.nome} tamanho={tamanho} />
          </a>
        );
      })}
    </div>
  );
}
