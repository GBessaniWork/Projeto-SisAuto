import AvisoDemo from "@/components/AvisoDemo";
import Status from "@/components/Status";
import { listarClientes, listarPedidos } from "@/lib/dados";
import { comissaoDoPedido, dataCurta, reais } from "@/lib/regras";

export const dynamic = "force-dynamic";

// Só entram na comissão pedidos já lançados no portal.
const CONTA = new Set(["lancado", "faturado", "entregue"]);

export default async function PaginaComissao() {
  const [pedidos, clientes] = await Promise.all([listarPedidos(), listarClientes()]);
  const cliente = new Map(clientes.map((c) => [c.id, c]));
  const lancados = pedidos.filter((p) => CONTA.has(p.status));
  const vendido = lancados.reduce((s, p) => s + p.valorTotal, 0);
  const comissoes = lancados.map(comissaoDoPedido);
  const semPercentual = comissoes.some((c) => c === null);
  const total = comissoes.reduce<number>((s, c) => s + (c ?? 0), 0);

  return (
    <>
      <div>
        <h1>Comissão</h1>
        <p className="sub" style={{ margin: "4px 0 0" }}>Pedidos lançados no portal, no lugar da planilha</p>
      </div>
      <AvisoDemo />

      <div className="numeros">
        <div className="numero"><span>Vendido</span><strong>{reais(vendido)}</strong></div>
        <div className="numero"><span>Comissão</span><strong>{semPercentual ? "Definir %" : reais(total)}</strong></div>
        <div className="numero"><span>Pedidos</span><strong>{lancados.length}</strong></div>
      </div>
      {semPercentual && (
        <p className="sub" style={{ margin: 0 }}>
          O percentual de comissão ainda não foi definido. Ele virá da sua planilha atual.
        </p>
      )}

      <div className="lista">
        {lancados.map((p) => {
          const c = cliente.get(p.clienteId);
          const com = comissaoDoPedido(p);
          return (
            <article key={p.id} className="cartao">
              <div className="linha">
                <span className="nome">{c?.contato ?? c?.empresa}</span>
                <span className="valor">{com === null ? "—" : reais(com)}</span>
              </div>
              <div className="detalhe">
                {p.numeroFabrica ? `Pedido ${p.numeroFabrica} · ` : ""}{dataCurta(p.criadoEm)} · {reais(p.valorTotal)}
                {p.comissaoPercentual != null ? ` · ${p.comissaoPercentual}%` : ""}
              </div>
              <Status status={p.status} />
            </article>
          );
        })}
      </div>
    </>
  );
}
