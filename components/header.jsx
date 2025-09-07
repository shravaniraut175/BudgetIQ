import React from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
  ClerkProvider,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBoxIcon } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-green-70/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="BudgetIQ Logo"
            width={80}
            height={200}
            className="object-contain"
          />
          {/* <span className='text-lg font-bold text-gray-700'>BudgetIQ</span> */}
        </Link>
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href={"/dashboard"} className="text-gray-700">
              <Button variant="outline" className="flex items-center gap-2 hover:text-green-600">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href={"/transaction/create"} className="text-gray-700">
              <Button variant="outline" className="flex items-center gap-2 hover:text-green-600">
                <PenBoxIcon size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>


          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10"
            },
          }}
          />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
