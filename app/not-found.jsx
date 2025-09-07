import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-center px-6">
      {/* Big gradient 404 */}
      <h1 className="text-9xl font-extrabold bg-gradient-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-6 text-4xl font-bold text-white">
        Page Not Found
      </h2>

      {/* Subtitle */}
      <p className="mt-3 text-lg text-gray-400 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      {/* Button */}
      <Link href="/" className="mt-8">
        <Button className="px-8 py-4 text-lg rounded-2xl shadow-lg bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 transition-all duration-300">
          Return Home
        </Button>
      </Link>

      {/* Animated ring behind */}
      <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-green-400/30 animate-spin-slow mt-[-400px]" />
    </div>
  );
}
