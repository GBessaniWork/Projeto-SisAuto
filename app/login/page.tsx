import { criarConta, entrar } from "./acoes";

const campo: React.CSSProperties = {
  width: "100%", minHeight: 48, padding: "0 12px", border: "1px solid var(--borda)",
  borderRadius: 10, font: "inherit", background: "#fff",
};
const botao: React.CSSProperties = {
  minHeight: 48, border: 0, borderRadius: 10, background: "var(--azul)", color: "#fff",
  font: "inherit", fontWeight: 600, cursor: "pointer",
};

export default async function PaginaLogin({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string; erro?: string; aviso?: string }>;
}) {
  const { modo, erro, aviso } = await searchParams;
  const criando = modo === "criar";
  return (
    <div style={{ maxWidth: 400, width: "100%", margin: "24px auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <h1>{criando ? "Criar conta" : "Entrar"}</h1>
      {erro && <p className="aviso" style={{ margin: 0 }}>{erro}</p>}
      {aviso && <p className="aviso" style={{ margin: 0 }}>{aviso}</p>}
      <form action={criando ? criarConta : entrar} className="cartao" style={{ gap: 14 }}>
        {criando && (
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            Seu nome
            <input name="nome" required autoComplete="name" style={campo} />
          </label>
        )}
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          E-mail
          <input name="email" type="email" required autoComplete="email" style={campo} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          Senha
          <input name="senha" type="password" required minLength={8} autoComplete={criando ? "new-password" : "current-password"} style={campo} />
        </label>
        <button type="submit" style={botao}>{criando ? "Criar conta" : "Entrar"}</button>
      </form>
      <a href={criando ? "/login" : "/login?modo=criar"} className="voltar">
        {criando ? "Já tenho conta" : "Primeira vez? Criar conta"}
      </a>
    </div>
  );
}
