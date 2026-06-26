// dados do site - editar aqui quando for colocar em producao
export const NOME_DO_SITE = "Portal Institucional";

export const LINKS_MENU = [
  { caminho: "/", rotulo: "Início" },
  { caminho: "/noticias", rotulo: "Notícias" },
  { caminho: "/projetos", rotulo: "Projetos" },
  { caminho: "/contato", rotulo: "Contato" },
];

export const CONTATO = {
  telefone: "(79) 99999-0000",
  telefoneRotulo: "Contato",
  escritorios: [
    { nome: "Gabinete Local", endereco: "Rua Exemplo, 100 - Aracaju", telefone: "(79) 3333-0000" },
    { nome: "Gabinete Capital", endereco: "Brasília - DF", telefone: "(61) 3333-0000" },
  ],
};

export const REDES_SOCIAIS = [
  { nome: "WhatsApp", link: "https://wa.me/5579981232193" },
  { nome: "Instagram", link: "https://instagram.com" },
  { nome: "Facebook", link: "https://facebook.com" },
  { nome: "X", link: "https://x.com" },
  { nome: "YouTube", link: "https://youtube.com" },
];

// imagem padrao quando nao tem banner cadastrado
export const IMAGEM_PADRAO =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80";
