# SisAuto

Sistema para representantes comerciais: atendimento no WhatsApp, pedidos com regras por cliente, acompanhamento de notas e comissão.

## Fases
1. **Painel de clientes, pedidos e comissão** (em construção)
2. Notas, romaneios e boletos automáticos
3. WhatsApp oficial (API do WhatsApp Business)
4. Preparar para outros representantes e fábricas

## Tecnologia (Fase 1)
- Next.js (painel web, funciona no celular e no computador)
- Supabase (banco de dados Postgres + login)
- Hospedagem na Vercel

O modelo de dados está em `supabase/schema.sql`.

## Como rodar
```
npm install
npm run dev
```
Abra http://localhost:3000. Sem o arquivo `.env.local` o painel abre em modo demonstração.
Para usar dados reais, crie um projeto no Supabase, rode `supabase/schema.sql` e preencha `.env.local` a partir de `.env.example`.

O painel é pensado primeiro para o celular e pode ser instalado na tela inicial ("Adicionar à tela de início").
