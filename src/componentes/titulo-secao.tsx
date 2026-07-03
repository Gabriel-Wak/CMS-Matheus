export function TituloSecao({ texto }: { texto: string }) {
  return (
    <div className="text-center">
      <h2
        className="text-2xl font-bold uppercase tracking-widest sm:text-3xl"
        style={{ color: "#001a3d" }}
      >
        {texto}
      </h2>
      <div className="mx-auto mt-3 flex w-16 justify-center gap-1">
        <span className="h-1 w-6" style={{ background: "#2b5a9a" }} />
        <span className="h-1 w-4" style={{ background: "#ffcc00" }} />
        <span className="h-1 w-2" style={{ background: "#1f9d55" }} />
      </div>
    </div>
  );
}
