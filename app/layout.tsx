import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme-provider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "500", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tax Revenue Monitoring System",
  description: "Self Service Monitor Penerimaan Pajak",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col gap-1 justify-start items-center h-screen w-full ">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
