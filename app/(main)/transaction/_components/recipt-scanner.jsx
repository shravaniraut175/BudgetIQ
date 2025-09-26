// // "use client";

// // import { useRef, useEffect } from "react";
// // import { Camera, Loader2 } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { toast } from "sonner";
// // import useFetch from "@/hooks/use-fetch";
// // import { scanReceipt } from "@/actions/transaction";

// // export function ReceiptScanner({ onScanComplete }) {
// //   const fileInputRef = useRef(null);

// //   const {
// //     loading: scanReceiptLoading,
// //     fn: scanReceiptFn,
// //     data: scannedData,
// //   } = useFetch(scanReceipt);

// //   const handleReceiptScan = async (file) => {
// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error("File size should be less than 5MB");
// //       return;
// //     }

// //     await scanReceiptFn(file);
// //   };

// //   useEffect(() => {
// //     if (scannedData && !scanReceiptLoading) {
// //       onScanComplete(scannedData);
// //       toast.success("Receipt scanned successfully");
// //     }
// //   }, [scanReceiptLoading, scannedData]);

// //   return (
// //     <div className="flex items-center gap-4">
// //       <input
// //         type="file"
// //         ref={fileInputRef}
// //         className="hidden"
// //         accept="image/*"
// //         capture="environment"
// //         onChange={(e) => {
// //           const file = e.target.files?.[0];
// //           if (file) handleReceiptScan(file);
// //         }}
// //       />
// //       <Button
// //         type="button"
// //         variant="outline"
// //         className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
// //         onClick={() => fileInputRef.current?.click()}
// //         disabled={scanReceiptLoading}
// //       >
// //         {scanReceiptLoading ? (
// //           <>
// //             <Loader2 className="mr-2 animate-spin" />
// //             <span>Scanning Receipt...</span>
// //           </>
// //         ) : (
// //           <>
// //             <Camera className="mr-2" />
// //             <span>Scan Receipt with AI</span>
// //           </>
// //         )}
// //       </Button>
// //     </div>
// //   );
// // }



// "use client";

// import { useRef, useEffect } from "react";
// import { Camera, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import useFetch from "@/hooks/use-fetch";
// import { scanReceipt } from "@/actions/transaction";

// export function ReceiptScanner({ onScanComplete }) {
//   const fileInputRef = useRef(null);

//   const {
//     loading: scanReceiptLoading,
//     fn: scanReceiptFn,
//     data: scannedData,
//   } = useFetch(scanReceipt);

//   const handleReceiptScan = async (file) => {
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File size should be less than 5MB");
//       return;
//     }

//     await scanReceiptFn(file);
//   };

//   useEffect(() => {
//     if (scannedData && !scanReceiptLoading) {
//       onScanComplete(scannedData);
//       toast.success("Receipt scanned successfully");
//     }
//   }, [scanReceiptLoading, scannedData]);

//   return (
//     <div className="flex items-center gap-4">
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         capture="environment"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (file) handleReceiptScan(file);
//         }}
//       />
//       <Button
//         type="button"
//         variant="outline"
//         className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2
//                     bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 
//                     text-cyan-400 shadow-lg shadow-cyan-700/40
//                     hover:scale-105 hover:shadow-cyan-500/60 hover:bg-gradient-to-r 
//                     hover:from-blue-800 hover:via-indigo-800 hover:to-violet-800
//                     transition-all duration-500
//                     disabled:opacity-60 disabled:cursor-not-allowed`}
//         onClick={() => fileInputRef.current?.click()}
//         disabled={scanReceiptLoading}
//       >
//         {scanReceiptLoading ? (
//           <>
//             <Loader2 className="mr-2 animate-spin text-cyan-300 drop-shadow-md" />
//             <span className="text-cyan-200">Scanning Receipt...</span>
//           </>
//         ) : (
//           <>
//             <Camera className="mr-2 text-cyan-400 drop-shadow-md" />
//             <span className="text-cyan-300">Scan Receipt with AI</span>
//           </>
//         )}
//       </Button>
//     </div>
//   );
// }



"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2
                    bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 
                    text-cyan-400 shadow-lg shadow-cyan-700/40
                    hover:scale-105 hover:shadow-cyan-500/60 hover:bg-gradient-to-r 
                    hover:from-blue-800 hover:via-indigo-800 hover:to-violet-800
                    transition-all duration-500
                    disabled:opacity-60 disabled:cursor-not-allowed`}
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin text-cyan-300 drop-shadow-md" />
            <span className="text-cyan-200">Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2 text-cyan-400 drop-shadow-md" />
            <span className="text-cyan-300">Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
}
