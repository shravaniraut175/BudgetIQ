import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BudgetIQ",
  description: "AI Enhanced System for Expense Automation and Insights",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* header */}  
        <Header />

        <main className="min-h-screen bg-white">
          {children}
        </main>

        
        {/* footer */}
        <footer className="bg-green-50 py-10">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} BudgetIQ. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
