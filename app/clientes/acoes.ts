"use server";

import { revalidatePath } from "next/cache";
import { clientesDemo } from "@/lib/demo";
import { supabaseServidor } from "@/lib/supabase/server";

// Cadastra para quem está logado os clientes e regras que já estavam anotados.
export async function importarClientesIniciais() {
  const db = await supabaseServidor();
  if (!db) return;
  const { count } = await db.from("clientes").select("id", { count: "exact", head: true });
  if (count) return; // já tem clientes: não duplica

  for (const c of clientesDemo) {
    const { data, error } = await db
      .from("clientes")
      .insert({
        empresa: c.empresa,
        contato: c.contato,
        desconto: c.desconto,
        prazo: c.prazo,
        forma_pagamento: c.formaPagamento,
        observacoes: c.observacoes,
      })
      .select("id")
      .single();
    if (error) throw error;
    if (c.desejos.length) {
      const { error: e2 } = await db
        .from("lista_desejos")
        .insert(c.desejos.map((artigo) => ({ cliente_id: data.id, artigo })));
      if (e2) throw e2;
    }
  }
  revalidatePath("/clientes");
}
