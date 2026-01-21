import type { Metadata } from "next";
import { geistSans, geistMono } from "@/app/ui/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./ui/darkmode";


export const metadata: Metadata = {
  title: "Timetable App",
  description: "Get your timetable on the go",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} ${geistMono.className} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          {children}
          
        <div className="flex">
          <div className="justify-start fixed top-2 left-2 md:top-2"></div>
          <div className="justify-end fixed top-2 right-2 md:top-4 md:right-4">
            <ModeToggle />
          </div>
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}
