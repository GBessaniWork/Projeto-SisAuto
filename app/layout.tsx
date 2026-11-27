import type { Metadata, Viewport } from "next";
import Menu from "@/components/Menu";
import { sair } from "@/app/login/acoes";
import { supabaseServidor } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meus Pedidos",
  description: "Clientes, pedidos e comissão do representante",
  appleWebApp: { capable: true, title: "Meus Pedidos", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const db = await supabaseServidor();
  const logado = db ? Boolean((await db.auth.getUser()).data.user) : false;
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          <span className="marca">Meus Pedidos</span>
          {(!db || logado) && <Menu />}
          {logado && (
            <form action={sair} style={{ marginLeft: "auto" }}>
              <button type="submit" style={{ minHeight: 44, padding: "0 12px", border: "1px solid var(--borda)", borderRadius: 8, background: "#fff", font: "inherit", cursor: "pointer" }}>
                Sair
              </button>
            </form>
          )}
        </header>
        <main className="conteudo">{children}</main>
      </body>
    </html>
  );
}
