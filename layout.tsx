import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import NextAuthProvider from "./NextAuthProvider";
import "./globals.css";
import Header from "./ui/root/header";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})


export const metadata: Metadata = {
  title: "Chats",
  description: "List of active chats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
      
        className={`${openSans.className} antialiased`}
      >
      <NextAuthProvider>
        <Header />
      {children}
      </NextAuthProvider>
      
      </body>
    </html>
  );
}
