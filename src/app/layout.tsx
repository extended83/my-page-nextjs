import { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={`${inter.variable} ${manrope.variable} ${manrope.className}`}>
        {children}
      </body>
    </html>
  );
}
