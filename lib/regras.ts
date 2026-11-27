import type { Pedido } from "./tipos";

// Mínimo por filial na Eurotextil: tabela cheia R$ 3.000, com desconto R$ 6.000.
export const MINIMO_TABELA_CHEIA = 3000;
export const MINIMO_COM_DESCONTO = 6000;

export function minimoDoPedido(p: Pedido): number {
  return p.desconto > 0 ? MINIMO_COM_DESCONTO : MINIMO_TABELA_CHEIA;
}

export function faltaParaMinimo(p: Pedido): number {
  return Math.max(0, minimoDoPedido(p) - p.valorTotal);
}

export function proximoPasso(p: Pedido): string {
  switch (p.status) {
    case "rascunho":
      return "Terminar de montar os itens";
    case "previa_enviada": {
      const falta = faltaParaMinimo(p);
      return falta > 0
        ? `Faltam ${reais(falta)} para o mínimo`
        : "Aguardando aprovação do cliente";
    }
    case "aprovado":
      return "Lançar no portal";
    case "lancado":
      return "Aguardando faturamento";
    case "faturado":
      return p.notaFiscal ? `NF ${p.notaFiscal} emitida` : "Faturado";
    case "entregue":
      return "Concluído";
    case "cancelado":
      return "Cancelado";
  }
}

export function comissaoDoPedido(p: Pedido): number | null {
  if (p.comissaoPercentual == null) return null;
  return (p.valorTotal * p.comissaoPercentual) / 100;
}

export function reais(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function dataCurta(iso: string): string {
  const [a, m, d] = iso.slice(0, 10).split("-");
  return `${d}/${m}/${a}`;
}
