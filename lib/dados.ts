import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { clientesDemo, pedidosDemo } from "./demo";
import type { Cliente, Pedido, StatusPedido } from "./tipos";

function supabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export function modoDemo(): boolean {
  return supabase() === null;
}

export async function listarClientes(): Promise<Cliente[]> {
  const db = supabase();
  if (!db) return clientesDemo;
  const { data, error } = await db
    .from("clientes")
    .select("id, empresa, contato, desconto, prazo, forma_pagamento, observacoes, lista_desejos(artigo)")
    .order("contato");
  if (error) throw error;
  return (data ?? []).map((c) => ({
    id: c.id,
    empresa: c.empresa,
    contato: c.contato,
    desconto: Number(c.desconto),
    prazo: c.prazo,
    formaPagamento: c.forma_pagamento,
    observacoes: c.observacoes,
    desejos: (c.lista_desejos ?? []).map((d: { artigo: string }) => d.artigo),
  }));
}

export async function listarPedidos(): Promise<Pedido[]> {
  const db = supabase();
  if (!db) return pedidosDemo;
  const { data, error } = await db
    .from("pedidos")
    .select("id, numero_fabrica, cliente_id, forma_pagamento, prazo, desconto, valor_total, status, comissao_percentual, criado_em, filiais(nome), notas_fiscais(numero)")
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((p) => {
    const filial = p.filiais as unknown as { nome: string } | null;
    const notas = (p.notas_fiscais ?? []) as { numero: string }[];
    return {
      id: p.id,
      numeroFabrica: p.numero_fabrica,
      clienteId: p.cliente_id,
      filial: filial?.nome ?? null,
      formaPagamento: p.forma_pagamento,
      prazo: p.prazo,
      desconto: Number(p.desconto),
      valorTotal: Number(p.valor_total),
      status: p.status as StatusPedido,
      comissaoPercentual: p.comissao_percentual == null ? null : Number(p.comissao_percentual),
      criadoEm: p.criado_em,
      notaFiscal: notas.at(-1)?.numero ?? null,
    };
  });
}
