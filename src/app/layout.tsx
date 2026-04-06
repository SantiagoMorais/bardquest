import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "../styles/globals.scss";
import { Providers } from "../components/providers";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontTitle = Cinzel({
  variable: "--font-title",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BardQuest",
  description:
    "BardQuest é uma jornada gamificada de aprendizado musical onde você evolui praticando instrumentos reais. Complete missões diárias, construa sua sequência e avance através da música.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fontSans.variable} ${fontTitle.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
