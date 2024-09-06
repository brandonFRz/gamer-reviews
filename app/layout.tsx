import NavBar from "@/components/navigation/NavBar";
import { exo2, orbitron } from "@/font";
import type { Metadata } from "next";
import "./globals.css";

// Define los metadatos de la página, incluyendo un título por defecto y una plantilla para el título
export const metadata: Metadata = {
  title: {
    default: "GAMER REVIEWS",
    template: "%s | GAMER REVIEWS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="flex min-h-screen flex-col items-center">
        {/* Sección del encabezado que incluye la barra de navegación */}
        <header className="mb-8 w-full max-w-[1140px]">
          <NavBar />
        </header>
        {/* El contenido principal de la página se renderiza aquí */}
        <main className="w-full max-w-[1140px] grow">{children}</main>
        {/* Pie de página con información sobre la fuente de los datos */}
        <footer className="border-t py-3 text-center text-xs text-slate-500">
          <p>Informacion de los juegos poporcionada por</p>
          <a
            className="text-orange-800 hover:underline"
            href="http://rawg.io/"
            target="_blank"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
