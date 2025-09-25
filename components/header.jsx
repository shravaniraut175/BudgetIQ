// import React from "react";
// import {
//   SignedIn,
//   SignedOut,
//   UserButton,
//   SignInButton,
//   SignUpButton,
//   ClerkProvider,
// } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { LayoutDashboard, PenBoxIcon } from "lucide-react";
// import { checkUser } from "@/lib/checkUser";

// const Header = async () => {
//   await checkUser();
//   return (
//     <div className="fixed top-0 w-full bg-green-70/80 backdrop-blur-md z-50 border-b">
//       <nav className="container mx-auto flex justify-between items-center py-4 px-4">
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src={"/logo.png"}
//             alt="BudgetIQ Logo"
//             width={80}
//             height={200}
//             className="object-contain"
//           />
//           {/* <span className='text-lg font-bold text-gray-700'>BudgetIQ</span> */}
//         </Link>
//         <div className="flex items-center gap-4">
//           <SignedIn>
//             <Link href={"/dashboard"} className="text-gray-700">
//               <Button variant="outline" className="flex items-center gap-2 hover:text-green-600">
//                 <LayoutDashboard size={18} />
//                 <span className="hidden md:inline">Dashboard</span>
//               </Button>
//             </Link>

//             <Link href={"/transaction/create"} className="text-gray-700">
//               <Button variant="outline" className="flex items-center gap-2 hover:text-green-600">
//                 <PenBoxIcon size={18} />
//                 <span className="hidden md:inline">Add Transaction</span>
//               </Button>
//             </Link>


//           </SignedIn>
//           <SignedOut>
//             <SignInButton forceRedirectUrl="/dashboard">
//               <Button variant="outline">Login</Button>
//             </SignInButton>
//           </SignedOut>
//           <SignedIn>
//             <UserButton appearance={{
//               elements: {
//                 avatarBox: "w-10 h-10"
//             },
//           }}
//           />
//           </SignedIn>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;



import React from 'react'
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '../lib/checkUser';

const Header = async () => {
    await checkUser();
    return (
        <div className="fixed top-0 w-full bg-gradient-to-r from-blue-950 via-black to-indigo-950 backdrop-blur-md z-50 border-b border-violet-700/30 shadow-lg shadow-indigo-900/30">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/">
                    <Image
                        src={"/logo_name.png"}
                        alt="BudgetIQ Logo"
                        width={200}
                        height={60}
                        className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(138,43,226,0.6)]"
                    />
                </Link>
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <Link
                            href={"/dashboard"}
                            className="flex items-center gap-2 text-lavender-200 hover:text-blue-400 transition"
                        >
                            <Button
                                variant="outline"
                                className="border-indigo-700/50 bg-gray-900/70 text-lavender-200 hover:bg-indigo-800/60 hover:text-white"
                            >
                                <LayoutDashboard size={18} className="text-blue-400" />
                                <span className="hidden md:inline">Dashboard</span>
                            </Button>
                        </Link>

                        <Link href={"/transaction/create"}>
                            <Button
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-violet-500 hover:to-blue-500 shadow-md shadow-violet-800/40"
                            >
                                <PenBox size={18} className="text-lavender-100" />
                                <span className="hidden md:inline">Transaction</span>
                            </Button>
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button
                                variant="outline"
                                className="border-violet-500/70 bg-gradient-to-r from-indigo-700/80 to-blue-800/80 text-white font-medium 
                                           hover:from-violet-600 hover:to-blue-600 hover:scale-105 transition-transform duration-200 
                                           shadow-md shadow-violet-800/40"
                            >
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox:
                                        "w-10 h-10 ring-2 ring-violet-500 hover:ring-blue-400 transition rounded-full shadow-md shadow-violet-800/40",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
}

export default Header