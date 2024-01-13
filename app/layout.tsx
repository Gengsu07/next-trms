import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme-provider";
import Header from "@/components/Header";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { cn } from "@/lib/utils";

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
      <body
        className={cn(poppins.className, {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col justify-start items-center h-screen w-screen ">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
