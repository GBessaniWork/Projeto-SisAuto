import type { Metadata, Viewport } from "next";
import Menu from "@/components/Menu";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          <span className="marca">Meus Pedidos</span>
          <Menu />
        </header>
        <main className="conteudo">{children}</main>
      </body>
    </html>
  );
}
