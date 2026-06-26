import { revalidatePath } from "next/cache";

// depois de salvar no admin, atualiza as paginas publicas
export function atualizarSite() {
  revalidatePath("/");
  revalidatePath("/noticias");
  revalidatePath("/projetos");
  revalidatePath("/busca");
}
