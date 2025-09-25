// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/header";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "BudgetIQ",
//   description: "AI Enhanced System for Expense Automation and Insights",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//     <html lang="en">
//       <body className={`${inter.className} antialiased`}>
//         {/* header */}  
//         <Header />

//         <main className="min-h-screen bg-white">
//           {children}
//         </main>

        
//         {/* footer */}
//         <footer className="bg-green-50 py-10">
//           <div className="container mx-auto px-4 text-center text-gray-600">
//             <p>&copy; {new Date().getFullYear()} BudgetIQ. All rights reserved.</p>
//           </div>
//         </footer>
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }



import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BudgetIQ",
  description: "AI-Enhanced System for Expense Automation and Insights",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-b from-black via-blue-950 to-indigo-950 text-gray-100 min-h-screen flex flex-col`}
        >
          {/* Header */}
          <Header />

          {/* Main */}
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

          {/* Toaster Notifications */}
          <Toaster richColors position="top-right" />

          {/* Footer */}
          <footer className="bg-gradient-to-r from-indigo-950 via-black to-blue-950 py-8 border-t border-violet-700/30 shadow-lg shadow-indigo-900/40">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lavender-200 text-sm md:text-base tracking-wide">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-violet-400">BudgetIQ</span>. 
                All rights reserved.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}