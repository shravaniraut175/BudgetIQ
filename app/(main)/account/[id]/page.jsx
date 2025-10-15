
import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-10 px-6 py-8 bg-gray-900 min-h-screen text-gray-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight 
                         bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-500 to-pink-500 capitalize">
            {account.name}
          </h1>
          <p className="text-gray-400 mt-1">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            ₹{parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-400">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={
          <div className="flex justify-center mt-4">
            <BarLoader width="80%" color="#9333ea" height={6} />
          </div>
        }
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={
          <div className="flex justify-center mt-4">
            <BarLoader width="80%" color="#9333ea" height={6} />
          </div>
        }
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}