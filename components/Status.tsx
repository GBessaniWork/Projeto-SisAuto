import { nomeStatus, type StatusPedido } from "@/lib/tipos";

export default function Status({ status }: { status: StatusPedido }) {
  return <span className={`chip s-${status}`}>{nomeStatus(status)}</span>;
}
