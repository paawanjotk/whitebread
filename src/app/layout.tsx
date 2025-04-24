import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { UserProvider } from "@/lib/user";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
  style: ["normal"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "White Bread",
  description: "A modern notes application with AI-powered summarization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} font-sans`}>
        <Providers>
          <UserProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
