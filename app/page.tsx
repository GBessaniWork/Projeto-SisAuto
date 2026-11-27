import Link from "next/link";
import AvisoDemo from "@/components/AvisoDemo";
import Status from "@/components/Status";
import { listarClientes, listarPedidos } from "@/lib/dados";
import { proximoPasso, reais } from "@/lib/regras";
import { ETAPAS, type StatusPedido } from "@/lib/tipos";

export const dynamic = "force-dynamic";

export default async function PaginaPedidos({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filtro = ETAPAS.some((e) => e.status === status) ? (status as StatusPedido) : null;
  const [pedidos, clientes] = await Promise.all([listarPedidos(), listarClientes()]);
  const cliente = new Map(clientes.map((c) => [c.id, c]));
  const visiveis = filtro ? pedidos.filter((p) => p.status === filtro) : pedidos;

  return (
    <>
      <div>
        <h1>Pedidos</h1>
        <p className="sub" style={{ margin: "4px 0 0" }}>Do rascunho até a entrega</p>
      </div>
      <AvisoDemo />

      <nav className="filtros" aria-label="Filtrar por status">
        <Link className="filtro" href="/" aria-current={filtro === null ? "true" : undefined}>
          Todos <b>{pedidos.length}</b>
        </Link>
        {ETAPAS.map((e) => (
          <Link
            key={e.status}
            className="filtro"
            href={`/?status=${e.status}`}
            aria-current={filtro === e.status ? "true" : undefined}
          >
            {e.nome} <b>{pedidos.filter((p) => p.status === e.status).length}</b>
          </Link>
        ))}
      </nav>

      {visiveis.length === 0 ? (
        <p className="sub">Nenhum pedido neste status.</p>
      ) : (
        <div className="lista">
          {visiveis.map((p) => {
            const c = cliente.get(p.clienteId);
            return (
              <article key={p.id} className="cartao">
                <div className="linha">
                  <span className="nome">{c?.contato ?? c?.empresa ?? "Cliente"}</span>
                  <span className="valor">{reais(p.valorTotal)}</span>
                </div>
                <div className="detalhe">
                  {c?.empresa}
                  {p.numeroFabrica ? ` · Pedido ${p.numeroFabrica}` : ""}
                </div>
                <div className="detalhe">
                  {[p.filial, p.formaPagamento, p.prazo].filter(Boolean).join(" · ")}
                </div>
                <div className="linha">
                  <Status status={p.status} />
                  <span className="proximo">{proximoPasso(p)}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
