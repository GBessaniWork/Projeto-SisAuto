import Link from "next/link";
import AvisoDemo from "@/components/AvisoDemo";
import { listarClientes } from "@/lib/dados";

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
