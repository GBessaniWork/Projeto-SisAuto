import type { Cliente, Pedido } from "./tipos";

// Dados de demonstração: usados quando o Supabase ainda não está configurado.
// As regras dos clientes são as reais; valores e números de pedido são exemplos.

export const clientesDemo: Cliente[] = [
  {
    id: "gustavo",
    empresa: "MATRIZ TECIDOS LTDA",
    contato: "Gustavo",
    desconto: 10,
    prazo: "30/60/90/120/150",
    formaPagamento: "Boleto",
    observacoes: "Pode perguntar a forma de pagamento direto a ele. Sempre enviar a prévia e esperar aprovação.",
    desejos: ["Suede Summer", "Micro Sport Tinto 1,60", "Oxford Tinto 1,50", "Oxfordine Madrid", "Veludo Cristal", "Eurostar 400 fios", "Damask 2,80", "Blackout 2,80", "Oxford estampa Afro"],
  },
  {
    id: "afonso",
    empresa: "CASAS LOANDA NOVA LONDRINA LTDA",
    contato: "Afonso",
    desconto: 10,
    prazo: "60/90/120/150",
    formaPagamento: "Boleto",
    observacoes: "Várias lojas: ele escreve a loja no cabeçalho do pedido (ex.: N. Londrina, Umuarama). Felpudo é sempre o 3886.",
    desejos: ["Helanka Hiper Soft", "Tulle Armação", "Crepe Amanda", "Felpudo Premium", "Rendado plástico", "Oxford Tinto 1,50", "Oxford Tinto 3,00", "Blackout 2,80"],
  },
  {
    id: "andreusa",
    empresa: "FEIRATEX COML DE TEC. LTDA",
    contato: "Andreusa",
    desconto: 10,
    prazo: "100/140",
    formaPagamento: "Boleto",
    observacoes: "Prazo é sempre 100/140.",
    desejos: [],
  },
  {
    id: "karine",
    empresa: "F G L COMERCIO DE TECIDOS LTDA",
    contato: "Karine",
    desconto: 0,
    prazo: "Pelo valor do pedido",
    formaPagamento: "Boleto",
    observacoes: "Acima de R$ 5.000: 30/60/90/120/150. De R$ 4.000 a R$ 5.000: 30/60/90/120.",
    desejos: [],
  },
  {
    id: "nelize",
    empresa: "NS COMERCIO SPANHOL",
    contato: "Nelize",
    desconto: 0,
    prazo: "Máximo de parcelas",
    formaPagamento: "Cartão",
    observacoes: "Atoalhado = Felpudo 3886.",
    desejos: [],
  },
  {
    id: "bruna",
    empresa: "GOTEX",
    contato: "Bruna",
    desconto: 10,
    prazo: "30/60/90/120/150",
    formaPagamento: "Boleto",
    observacoes: "Prazo padrão.",
    desejos: [],
  },
  {
    id: "leandro",
    empresa: "IND. DE CONF. CANCAO LTDA",
    contato: "Leandro",
    desconto: 0,
    prazo: null,
    formaPagamento: "Boleto",
    observacoes: "Recebe a tabela de preços toda segunda e as notas faturadas pelo WhatsApp.",
    desejos: [],
  },
];

export const pedidosDemo: Pedido[] = [
  { id: "p1", numeroFabrica: "2260889", clienteId: "leandro", filial: "Matriz", formaPagamento: "Boleto", prazo: null, desconto: 0, valorTotal: 8940, status: "faturado", comissaoPercentual: null, criadoEm: "2026-10-30", notaFiscal: "567552" },
  { id: "p2", numeroFabrica: null, clienteId: "gustavo", filial: "Filial ES", formaPagamento: "Boleto", prazo: "30/60/90/120/150", desconto: 10, valorTotal: 6480, status: "previa_enviada", comissaoPercentual: null, criadoEm: "2026-11-26", notaFiscal: null },
  { id: "p3", numeroFabrica: null, clienteId: "afonso", filial: "Matriz", formaPagamento: "Boleto", prazo: "60/90/120/150", desconto: 10, valorTotal: 5120, status: "previa_enviada", comissaoPercentual: null, criadoEm: "2026-11-26", notaFiscal: null },
  { id: "p4", numeroFabrica: null, clienteId: "andreusa", filial: "Filial SC", formaPagamento: "Boleto", prazo: "100/140", desconto: 10, valorTotal: 7300, status: "aprovado", comissaoPercentual: null, criadoEm: "2026-11-25", notaFiscal: null },
  { id: "p5", numeroFabrica: "2261034", clienteId: "bruna", filial: "Matriz", formaPagamento: "Boleto", prazo: "30/60/90/120/150", desconto: 10, valorTotal: 9210, status: "lancado", comissaoPercentual: null, criadoEm: "2026-11-24", notaFiscal: null },
  { id: "p6", numeroFabrica: null, clienteId: "nelize", filial: "Filial ES", formaPagamento: "Cartão", prazo: null, desconto: 0, valorTotal: 2150, status: "rascunho", comissaoPercentual: null, criadoEm: "2026-11-27", notaFiscal: null },
];
