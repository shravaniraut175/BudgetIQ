// // import React, { Suspense } from 'react'
// // import DashboardPage from './page';
// // import { BarLoader } from 'react-spinners';

// // const DashboardLayout = () => {
// //   return (
// //   <div className='px-5'>
// //         <h1 className='text-6xl font-bold gradient-title mb-5'>Dashboard</h1>

// //     <Suspense fallback={<BarLoader className='my-10' color="#36d7b7" /  >}>
// //     <DashboardPage />
// //     </Suspense>
// //     </div>
// //     );
// // };

// // export default DashboardLayout;

// import DashboardPage from "./page";
// import { BarLoader } from "react-spinners";
// import { Suspense } from "react";

// export default function DashboardLayout() {
//   return (
//     <div className="px-6 py-8 bg-gray-900 min-h-screen text-gray-100">
      
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent 
//                         bg-gradient-to-r from-indigo-400 via-violet-500 to-pink-500">
//           Dashboard
//         </h1>
//       </div>

//       {/* Main Content with Suspense */}
//       <Suspense 
//         fallback={
//           <div className="flex justify-center mt-8">
//             <BarLoader width={"80%"} color="#9333ea" height={6} />
//           </div>
//         }
//       >
//         <DashboardPage />
//       </Suspense>
//     </div>
//   );
// }


import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function DashboardLayout() {
  return (
    <div className="px-6 py-8 bg-gray-900 min-h-screen text-gray-100">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent 
                        bg-gradient-to-r from-indigo-400 via-violet-500 to-pink-500">
          Dashboard
        </h1>
      </div>

      {/* Main Content with Suspense */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center mt-16">
            <BarLoader width={"70%"} color="#9333ea" height={6} />
          </div>
        }
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}
