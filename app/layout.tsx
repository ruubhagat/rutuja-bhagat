import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google"; // Import the fancy fonts
import "./globals.css";

// Configure fonts
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif", // We give it a name to use in Tailwind
  weight: ["400", "600"],
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "Rutuja Bhagat | Portfolio",
  description: "Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased bg-[#FDFCF8] text-[#1a1a1a]`}>
        {children}
      </body>
    </html>
  );
}