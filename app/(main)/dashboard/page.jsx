// import { Suspense } from "react";
// import { getUserAccounts } from "@/actions/dashboard";
// import { getDashboardData } from "@/actions/dashboard";
// import { getCurrentBudget } from "@/actions/budget";
// import { AccountCard } from "./_components/account_card";
// import { CreateAccountDrawer } from "@/components/create-account-drawer";
// import { BudgetProgress } from "./_components/budget-progress";
// import { Card, CardContent } from "@/components/ui/card";
// import { Plus } from "lucide-react";
// import { DashboardOverview } from "./_components/transaction-overview";

// export default async function DashboardPage() {
//   const [accounts, transactions] = await Promise.all([
//     getUserAccounts(),
//     getDashboardData(),
//   ]);

//   const defaultAccount = accounts?.find((account) => account.isDefault);

//   // Get budget for default account
//   let budgetData = null;
//   if (defaultAccount) {
//     budgetData = await getCurrentBudget(defaultAccount.id);
//   }

//   return (
//     <div className="space-y-8">
//       {/* Budget Progress */}
//       <BudgetProgress
//         initialBudget={budgetData?.budget}
//         currentExpenses={budgetData?.currentExpenses || 0}
//       />

//       {/* Dashboard Overview */}
//       <DashboardOverview
//         accounts={accounts}
//         transactions={transactions || []}
//       />

//       {/* Accounts Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <CreateAccountDrawer>
//           <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
//             <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
//               <Plus className="h-10 w-10 mb-2" />
//               <p className="text-sm font-medium">Add New Account</p>
//             </CardContent>
//           </Card>
//         </CreateAccountDrawer>
//         {accounts.length > 0 &&
//           accounts?.map((account) => (
//             <AccountCard key={account.id} account={account} />
//           ))}
//       </div>
//     </div>
//   );
// }


// import { Suspense } from "react";
// import { getUserAccounts } from "@/actions/dashboard";
// import { getDashboardData } from "@/actions/dashboard";
// import { getCurrentBudget } from "@/actions/budget";
// import { AccountCard } from "./_components/account_card";
// import { CreateAccountDrawer } from "@/components/create-account-drawer";
// import { BudgetProgress } from "./_components/budget-progress";
// import { Card, CardContent } from "@/components/ui/card";
// import { Plus } from "lucide-react";
// import { DashboardOverview } from "./_components/transaction-overview";

// export default async function DashboardPage() {
//   const [accounts, transactions] = await Promise.all([
//     getUserAccounts(),
//     getDashboardData(),
//   ]);

//   const defaultAccount = accounts?.find((account) => account.isDefault);

//   // Get budget for default account
//   let budgetData = null;
//   if (defaultAccount) {
//     budgetData = await getCurrentBudget(defaultAccount.id);
//   }

//   return (
//     <div className="space-y-10 p-6 bg-gray-900 min-h-screen text-gray-100">
      
//       {/* Budget Progress Section */}
//       <BudgetProgress
//         initialBudget={budgetData?.budget}
//         currentExpenses={budgetData?.currentExpenses || 0}
//         className="bg-gradient-to-r from-indigo-800 via-violet-900 to-pink-700 rounded-xl shadow-lg p-6"
//       />

//       {/* Dashboard Overview */}
//       <Suspense fallback={<p className="text-gray-400 animate-pulse">Loading Overview....</p>}>
//         <DashboardOverview
//           accounts={accounts}
//           transactions={transactions || []}
//           className="bg-gray-800 rounded-xl shadow-lg p-6"
//         />
//       </Suspense>

//       {/* Accounts Section */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {/* Create New Account */}
//         <CreateAccountDrawer>
//           <Card className="bg-gray-800 hover:bg-indigo-900 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer border-dashed border-gray-600">
//             <CardContent className="flex flex-col items-center justify-center text-gray-400 h-full pt-6">
//               <Plus className="h-12 w-12 mb-3 text-pink-500" />
//               <p className="text-sm font-semibold text-gray-200 hover:text-indigo-300">Add New Account</p>
//             </CardContent>
//           </Card>
//         </CreateAccountDrawer>

//         {/* Existing Accounts */}
//         {accounts.length > 0 && accounts.map((account) => (
//           <AccountCard 
//             key={account.id} 
//             account={account} 
//             className="bg-gray-800 hover:bg-indigo-900 hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account_card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  // Fetch accounts & transactions in parallel
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  // Identify the default account
  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for the default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-10 p-6 bg-gray-900 min-h-screen text-gray-100">
      
      {/* Budget Progress Section */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
        className="bg-gradient-to-r from-indigo-800 via-violet-900 to-pink-700 
                   rounded-xl shadow-lg p-6"
      />

      {/* Dashboard Overview */}
      <Suspense
        fallback={
          <p className="text-gray-400 animate-pulse text-sm">
            Loading Overview...
          </p>
        }
      >
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
          className="bg-gray-800 rounded-xl shadow-lg p-6"
        />
      </Suspense>

      {/* Accounts Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Create New Account */}
        <CreateAccountDrawer>
          <Card className="bg-gray-800 hover:bg-indigo-900 hover:scale-105 
                           transition-transform duration-300 shadow-md 
                           cursor-pointer border-dashed border-gray-600 rounded-xl">
            <CardContent className="flex flex-col items-center justify-center text-gray-400 h-full pt-6">
              <Plus className="h-12 w-12 mb-3 text-pink-500" />
              <p className="text-sm font-semibold text-gray-200 hover:text-indigo-300">
                Add New Account
              </p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {/* Existing Accounts */}
        {accounts.length > 0 &&
          accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              className="bg-gray-800 hover:bg-indigo-900 hover:scale-105 
                         transition-transform duration-300 shadow-lg rounded-xl"
            />
          ))}
      </div>
    </div>
  );
}
