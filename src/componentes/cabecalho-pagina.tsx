import { IMAGEM_PADRAO } from "@/lib/config";

export function CabecalhoPagina({
  titulo,
  caminho,
}: {
  titulo: string;
  caminho?: { rotulo: string; caminho?: string }[];
}) {
  return (
    <section className="relative text-white" style={{ background: "#001a3d" }}>
      <img
        src={IMAGEM_PADRAO}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,26,61,0.85), rgba(43,90,154,0.75), rgba(31,157,85,0.5))",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">{titulo}</h1>
        {caminho ? (
          <p className="mt-4 text-sm text-white/80">
            {caminho.map((item, i) => (
              <span key={i}>
                {item.caminho ? <a href={item.caminho}>{item.rotulo}</a> : item.rotulo}
                {i < caminho.length - 1 ? " / " : ""}
              </span>
            ))}
          </p>
        ) : null}
      </div>

      <div className="relative flex justify-center">
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "18px solid transparent",
            borderRight: "18px solid transparent",
            borderTop: "14px solid #ffcc00",
          }}
        />
      </div>
    </section>
  );
}
