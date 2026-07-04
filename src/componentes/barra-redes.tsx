import { LinksRedes } from "@/componentes/links-redes";

export function BarraRedes() {
  return (
    <section className="barra-redes">
      <div className="barra-redes-conteudo">
        <p className="barra-redes-texto">Siga e Compartilhe</p>
        <LinksRedes estilo="circulo" tamanho={16} />
      </div>
    </section>
  );
}
