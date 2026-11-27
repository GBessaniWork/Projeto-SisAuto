import { modoDemo } from "@/lib/dados";

export default function AvisoDemo() {
  if (!modoDemo()) return null;
  return (
    <p className="aviso">
      Modo demonstração: as regras dos clientes são as reais, mas os valores e pedidos são exemplos. Nada é salvo ainda.
    </p>
  );
}
