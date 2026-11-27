import Link from "next/link";
import AvisoDemo from "@/components/AvisoDemo";
import { listarClientes, modoDemo } from "@/lib/dados";
import { importarClientesIniciais } from "./acoes";

export const dynamic = "force-dynamic";

export default async function PaginaClientes() {
  const clientes = await listarClientes();
  return (
    <>
      <div>
        <h1>Clientes</h1>
        <p className="sub" style={{ margin: "4px 0 0" }}>Regras de cada cliente: desconto, prazo e lista de desejos</p>
      </div>
      <AvisoDemo />
      {!modoDemo() && clientes.length === 0 && (
        <form action={importarClientesIniciais} className="cartao">
          <h2>Nenhum cliente ainda</h2>
          <p className="sub" style={{ margin: 0 }}>
            Importe os clientes e regras que já estão anotados (Gustavo, Afonso, Andreusa, Karine, Nelize, Bruna e Leandro).
          </p>
          <button type="submit" style={{ minHeight: 48, border: 0, borderRadius: 10, background: "var(--azul)", color: "#fff", font: "inherit", fontWeight: 600, cursor: "pointer" }}>
            Importar meus clientes
          </button>
        </form>
      )}
      <div className="lista">
        {clientes.map((c) => (
          <Link key={c.id} href={`/clientes/${c.id}`} className="cartao">
            <div className="linha">
              <span className="nome">{c.contato ?? c.empresa}</span>
              <span className="detalhe">{c.desconto > 0 ? `${c.desconto}% desc.` : "Tabela cheia"}</span>
            </div>
            <div className="detalhe">{c.empresa}</div>
            <div className="detalhe">{[c.formaPagamento, c.prazo].filter(Boolean).join(" · ")}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
