import type { MetadataRoute } from "next";

// Permite instalar o painel como aplicativo na tela inicial do celular.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meus Pedidos",
    short_name: "Pedidos",
    description: "Clientes, pedidos e comissão do representante",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f6f3",
    theme_color: "#ffffff",
    lang: "pt-BR",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
