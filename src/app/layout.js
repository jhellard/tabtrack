import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TabTrack",
  description: "App for tracking guitar progress via YouTube videos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
