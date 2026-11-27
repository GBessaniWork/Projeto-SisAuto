export type StatusPedido =
  | "rascunho"
  | "previa_enviada"
  | "aprovado"
  | "lancado"
  | "faturado"
  | "entregue"
  | "cancelado";

export const ETAPAS: { status: StatusPedido; nome: string }[] = [
  { status: "rascunho", nome: "Rascunho" },
  { status: "previa_enviada", nome: "Prévia enviada" },
  { status: "aprovado", nome: "Aprovado" },
  { status: "lancado", nome: "Lançado no portal" },
  { status: "faturado", nome: "Faturado" },
  { status: "entregue", nome: "Entregue" },
];

export function nomeStatus(s: StatusPedido): string {
  if (s === "cancelado") return "Cancelado";
  return ETAPAS.find((e) => e.status === s)?.nome ?? s;
}

export type Cliente = {
  id: string;
  empresa: string;
  contato: string | null;
  desconto: number; // % sobre a tabela
  prazo: string | null;
  formaPagamento: string | null;
  observacoes: string | null;
  desejos: string[];
};

export type Pedido = {
  id: string;
  numeroFabrica: string | null;
  clienteId: string;
  filial: string | null;
  formaPagamento: string | null;
  prazo: string | null;
  desconto: number;
  valorTotal: number;
  status: StatusPedido;
  comissaoPercentual: number | null;
  criadoEm: string; // ISO
  notaFiscal: string | null;
};
