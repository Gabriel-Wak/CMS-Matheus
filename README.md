# CMS Portal Institucional

Site institucional com painel admin pra cadastrar banners, notícias e projetos.

Feito com Next.js, Prisma e Supabase (auth + storage + postgres).

## Rodar local

1. Clona o repo e entra na pasta
2. `npm install`
3. Copia `.env.exemplo` pra `.env.local` e preenche as variáveis
4. `npx prisma migrate deploy`
5. `npm run dev`

Abre http://localhost:3000

## Admin

- Login em `/login` (usuário criado no Supabase Auth)
- Painel em `/admin`
- Upload de imagem vai pro storage do Supabase (buckets: banners, noticias, projetos)

## O que já funciona

- Home com carrossel de banners
- Listagem e página de notícia/projeto
- Busca simples
- CRUD no admin

## Pendências (pra fazer depois)

- Formulário de contato ainda não salva no banco
- Formulário do hero é só visual
- Melhorar tratamento de erro nas APIs
- Paginação na busca

## Conteúdo demo

Se o banco estiver vazio: `npm run db:seed`

## Deploy

Subi na Vercel. Push na `main` gera preview. Produção precisa promote manual no painel.
