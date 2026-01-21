import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/app/ui/darkmode";
import { geistSans, geistMono } from "@/app/ui/fonts";
import SideNav from '@/app/ui/dashboard/sidenav';


export const metadata: Metadata = {
    title: "Timetable App",
    description: "Get your timetable on the go",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`bg-stone-200 dark:bg-gray-950 ${geistSans.className} ${geistMono.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >

                    <div className="flex">
                        <div className="justify-start fixed top-2 left-2 md:top-2"></div>
                        <div className="justify-end fixed top-2 right-2 md:top-4 md:right-4">
                            <ModeToggle />
                        </div>
                    </div>
                    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                        <div className="w-full flex-none md:w-64">
                            <SideNav />
                        </div>
                        <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}