import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "YardShare",
  description: "Rent or list backyards for events, parking, and more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>
        <div className="container py-6">
          <header className="flex items-center justify-between py-4">
            <a href="/" className="text-xl font-bold text-primary-700">YardShare</a>
            <nav className="flex items-center gap-4 text-sm">
              <a href="/browse" className="hover:underline">Browse</a>
              <a href="/host" className="hover:underline">Host</a>
              <a href="/auth/signin" className="rounded bg-primary-600 px-3 py-1.5 text-white">Sign in</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-16 border-t py-8 text-sm text-gray-600">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} YardShare</p>
              <div className="flex gap-4">
                <a href="/about" className="hover:underline">About</a>
                <a href="/contact" className="hover:underline">Contact</a>
              </div>
            </div>
          </footer>
        </div>
        </Providers>
      </body>
    </html>
  );
}

