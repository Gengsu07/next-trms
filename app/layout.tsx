import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme-provider";
import Header from "@/components/Header";
import QueryProvider from "./QueryProvider";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "500", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tax Revenue Monitoring System",
  description: "Self Service Monitor Penerimaan Pajak",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo_djp.png",
        href: "/logo_djp.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "flex flex-col justify-start items-center min-h-screen min-w-screen  ",
          poppins.className
        )}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
