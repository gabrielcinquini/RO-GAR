import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { getServerSession } from "next-auth";
import { ClientProviderLayout } from "@/layouts";
import SessionProvider  from "@/layouts/session-provider";
import { authConfigs } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R.O GAR",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfigs);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
          >
            <ClientProviderLayout>{children}</ClientProviderLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>

      <Toaster position="bottom-right" richColors closeButton duration={2500} />
    </html>
  );
}
