import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TabTrack",
  description: "App for tracking guitar progress via YouTube videos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen grid place-items-center">{children}</main>
      </body>
    </html>
  );
}
