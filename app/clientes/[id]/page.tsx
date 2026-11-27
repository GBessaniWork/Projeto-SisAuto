import Link from "next/link";
import { notFound } from "next/navigation";
import Status from "@/components/Status";
import { listarClientes, listarPedidos } from "@/lib/dados";
import { MINIMO_COM_DESCONTO, MINIMO_TABELA_CHEIA, reais, dataCurta } from "@/lib/regras";

export const dynamic = "force-dynamic";

export default async function PaginaCliente({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [clientes, pedidos] = await Promise.all([listarClientes(), listarPedidos()]);
  const c = clientes.find((x) => x.id === id);
  if (!c) notFound();
  const dele = pedidos.filter((p) => p.clienteId === c.id);
  const minimo = c.desconto > 0 ? MINIMO_COM_DESCONTO : MINIMO_TABELA_CHEIA;

  return (
    <>
      <Link href="/clientes" className="voltar">← Clientes</Link>
      <div>
        <h1>{c.contato ?? c.empresa}</h1>
        <p className="sub" style={{ margin: "4px 0 0" }}>{c.empresa}</p>
      </div>

      <div className="regras">
        <div className="numero"><span>Desconto</span><strong>{c.desconto > 0 ? `${c.desconto}%` : "Tabela cheia"}</strong></div>
        <div className="numero"><span>Mínimo por filial</span><strong>{reais(minimo)}</strong></div>
        <div className="numero" style={{ gridColumn: "1 / -1" }}><span>Pagamento</span><strong style={{ fontSize: 18 }}>{[c.formaPagamento, c.prazo].filter(Boolean).join(" ") || "—"}</strong></div>
      </div>

      {c.observacoes && (
        <section className="cartao">
          <h2>Observações</h2>
          <p style={{ margin: 0 }}>{c.observacoes}</p>
        </section>
      )}

      <section className="cartao">
        <h2>Lista de desejos</h2>
        {c.desejos.length ? (
          <div className="tags">{c.desejos.map((d) => <span key={d} className="tag">{d}</span>)}</div>
        ) : (
          <p className="sub" style={{ margin: 0 }}>Nenhum artigo ainda.</p>
        )}
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2>Pedidos</h2>
        {dele.length ? (
          dele.map((p) => (
            <div key={p.id} className="cartao">
              <div className="linha">
                <span>{dataCurta(p.criadoEm)}{p.numeroFabrica ? ` · ${p.numeroFabrica}` : ""}</span>
                <span className="valor">{reais(p.valorTotal)}</span>
              </div>
              <Status status={p.status} />
            </div>
          ))
        ) : (
          <p className="sub" style={{ margin: 0 }}>Nenhum pedido ainda.</p>
        )}
      </section>
    </>
  );
}
