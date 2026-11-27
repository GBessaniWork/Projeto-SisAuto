-- SisAuto: modelo de dados da Fase 1
-- Pensado para vários representantes no futuro: toda tabela tem representante_id.

create table representantes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  criado_em timestamptz not null default now()
);

create table fabricas (
  id uuid primary key default gen_random_uuid(),
  representante_id uuid not null references representantes(id),
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
  representante_id uuid not null references representantes(id),
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
  representante_id uuid not null references representantes(id),
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
