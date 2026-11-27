-- SisAuto: modelo de dados da Fase 1
-- Pensado para vários representantes no futuro: toda tabela tem representante_id.

-- Cada representante é um usuário do login do Supabase.
create table representantes (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  criado_em timestamptz not null default now()
);

create table fabricas (
  id uuid primary key default gen_random_uuid(),
  representante_id uuid not null default auth.uid() references representantes(id) on delete cascade,
  nome text not null,                       -- ex.: Eurotextil
  comissao_padrao numeric(5,2)              -- % padrão da fábrica
);

create table filiais (
  id uuid primary key default gen_random_uuid(),
  fabrica_id uuid not null references fabricas(id),
  nome text not null,                       -- ex.: Matriz, Filial ES, Filial SC
  minimo_tabela_cheia numeric(12,2),        -- ex.: 3000
  minimo_com_desconto numeric(12,2)         -- ex.: 6000
);

create table clientes (
  id uuid primary key default gen_random_uuid(),
  representante_id uuid not null default auth.uid() references representantes(id) on delete cascade,
  empresa text not null,                    -- razão social usada no portal
  contato text,                             -- nome no WhatsApp
  telefone text,
  cnpj text,
  desconto numeric(5,2) not null default 0, -- % sobre a tabela
  prazo text,                               -- ex.: 30/60/90/120/150
  forma_pagamento text,                     -- boleto | cartao
  observacoes text,
  criado_em timestamptz not null default now()
);

create table lista_desejos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  artigo text not null
);

create type status_pedido as enum
  ('rascunho', 'previa_enviada', 'aprovado', 'lancado', 'faturado', 'entregue', 'cancelado');

create table pedidos (
  id uuid primary key default gen_random_uuid(),
  representante_id uuid not null default auth.uid() references representantes(id) on delete cascade,
  cliente_id uuid not null references clientes(id),
  filial_id uuid references filiais(id),
  numero_fabrica text,                      -- nº do pedido no portal (ex.: 2260889)
  status status_pedido not null default 'rascunho',
  forma_pagamento text,
  prazo text,
  desconto numeric(5,2) not null default 0,
  valor_total numeric(12,2) not null default 0,
  comissao_percentual numeric(5,2),
  observacoes text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create table itens_pedido (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pedidos(id) on delete cascade,
  codigo text not null,                     -- código do artigo
  descricao text,
  cor text,
  quantidade numeric(10,2) not null,
  unidade text,                             -- peça, kg, m
  preco_unitario numeric(12,2) not null
);

create table notas_fiscais (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pedidos(id) on delete cascade,
  numero text not null,                     -- ex.: 567552
  emitida_em date,
  valor numeric(12,2),
  transportadora text,
  danfe_url text,
  romaneio_url text,
  enviada_ao_cliente boolean not null default false
);

create table historico_status (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pedidos(id) on delete cascade,
  status status_pedido not null,
  em timestamptz not null default now(),
  nota text
);

-- Quando alguém cria conta, vira um representante.
create function public.novo_representante() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.representantes (id, nome)
  values (new.id, coalesce(new.raw_user_meta_data->>'nome', new.email));
  return new;
end;
$$;

create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.novo_representante();

-- Segurança: cada representante só vê e altera os próprios dados.
alter table representantes enable row level security;
alter table fabricas enable row level security;
alter table filiais enable row level security;
alter table clientes enable row level security;
alter table lista_desejos enable row level security;
alter table pedidos enable row level security;
alter table itens_pedido enable row level security;
alter table notas_fiscais enable row level security;
alter table historico_status enable row level security;

create policy "proprio" on representantes for all
  using (id = auth.uid()) with check (id = auth.uid());
create policy "proprio" on fabricas for all
  using (representante_id = auth.uid()) with check (representante_id = auth.uid());
create policy "proprio" on clientes for all
  using (representante_id = auth.uid()) with check (representante_id = auth.uid());
create policy "proprio" on pedidos for all
  using (representante_id = auth.uid()) with check (representante_id = auth.uid());

create policy "da fabrica" on filiais for all
  using (exists (select 1 from fabricas f where f.id = fabrica_id and f.representante_id = auth.uid()))
  with check (exists (select 1 from fabricas f where f.id = fabrica_id and f.representante_id = auth.uid()));
create policy "do cliente" on lista_desejos for all
  using (exists (select 1 from clientes c where c.id = cliente_id and c.representante_id = auth.uid()))
  with check (exists (select 1 from clientes c where c.id = cliente_id and c.representante_id = auth.uid()));
create policy "do pedido" on itens_pedido for all
  using (exists (select 1 from pedidos p where p.id = pedido_id and p.representante_id = auth.uid()))
  with check (exists (select 1 from pedidos p where p.id = pedido_id and p.representante_id = auth.uid()));
create policy "do pedido" on notas_fiscais for all
  using (exists (select 1 from pedidos p where p.id = pedido_id and p.representante_id = auth.uid()))
  with check (exists (select 1 from pedidos p where p.id = pedido_id and p.representante_id = auth.uid()));
create policy "do pedido" on historico_status for all
  using (exists (select 1 from pedidos p where p.id = pedido_id and p.representante_id = auth.uid()))
  with check (exists (select 1 from pedidos p where p.id = pedido_id and p.representante_id = auth.uid()));
