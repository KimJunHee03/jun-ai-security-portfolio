import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jun | AI Security Portfolio",
  description: "정보보안과 인공지능을 연결하는 Jun의 프로젝트 포트폴리오입니다.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const saved = localStorage.getItem("jun-theme");
                const theme = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
                document.documentElement.dataset.theme = theme;
              } catch {
                document.documentElement.dataset.theme = "system";
              }
            })();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
