"use server";

import { redirect } from "next/navigation";
import { supabaseServidor } from "@/lib/supabase/server";

function texto(f: FormData, k: string) {
  return String(f.get(k) ?? "").trim();
}

export async function entrar(f: FormData) {
  const db = await supabaseServidor();
  if (!db) redirect("/");
  const { error } = await db.auth.signInWithPassword({ email: texto(f, "email"), password: texto(f, "senha") });
  if (error) redirect("/login?erro=" + encodeURIComponent("E-mail ou senha incorretos."));
  redirect("/");
}

export async function criarConta(f: FormData) {
  const db = await supabaseServidor();
  if (!db) redirect("/");
  const { data, error } = await db.auth.signUp({
    email: texto(f, "email"),
    password: texto(f, "senha"),
    options: { data: { nome: texto(f, "nome") } },
  });
  if (error) redirect("/login?modo=criar&erro=" + encodeURIComponent(error.message));
  if (!data.session) {
    redirect("/login?aviso=" + encodeURIComponent("Conta criada. Confirme pelo link que chegou no seu e-mail e depois entre."));
  }
  redirect("/");
}

export async function sair() {
  const db = await supabaseServidor();
  if (db) await db.auth.signOut();
  redirect("/login");
}
