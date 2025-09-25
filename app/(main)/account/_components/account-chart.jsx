// "use client";

// import { useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { format, subDays, startOfDay, endOfDay } from "date-fns";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const DATE_RANGES = {
//   "7D": { label: "Last 7 Days", days: 7 },
//   "1M": { label: "Last Month", days: 30 },
//   "3M": { label: "Last 3 Months", days: 90 },
//   "6M": { label: "Last 6 Months", days: 180 },
//   ALL: { label: "All Time", days: null },
// };

// export function AccountChart({ transactions }) {
//   const [dateRange, setDateRange] = useState("1M");

//   const filteredData = useMemo(() => {
//     const range = DATE_RANGES[dateRange];
//     const now = new Date();
//     const startDate = range.days
//       ? startOfDay(subDays(now, range.days))
//       : startOfDay(new Date(0));

//     // Filter transactions within date range
//     const filtered = transactions.filter(
//       (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
//     );

//     // Group transactions by date
//     const grouped = filtered.reduce((acc, transaction) => {
//       const date = format(new Date(transaction.date), "MMM dd");
//       if (!acc[date]) {
//         acc[date] = { date, income: 0, expense: 0 };
//       }
//       if (transaction.type === "INCOME") {
//         acc[date].income += transaction.amount;
//       } else {
//         acc[date].expense += transaction.amount;
//       }
//       return acc;
//     }, {});

//     // Convert to array and sort by date
//     return Object.values(grouped).sort(
//       (a, b) => new Date(a.date) - new Date(b.date)
//     );
//   }, [transactions, dateRange]);

//   // Calculate totals for the selected period
//   const totals = useMemo(() => {
//     return filteredData.reduce(
//       (acc, day) => ({
//         income: acc.income + day.income,
//         expense: acc.expense + day.expense,
//       }),
//       { income: 0, expense: 0 }
//     );
//   }, [filteredData]);

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
//         <CardTitle className="text-base font-normal">
//           Transaction Overview
//         </CardTitle>
//         <Select defaultValue={dateRange} onValueChange={setDateRange}>
//           <SelectTrigger className="w-[140px]">
//             <SelectValue placeholder="Select range" />
//           </SelectTrigger>
//           <SelectContent>
//             {Object.entries(DATE_RANGES).map(([key, { label }]) => (
//               <SelectItem key={key} value={key}>
//                 {label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-around mb-6 text-sm">
//           <div className="text-center">
//             <p className="text-muted-foreground">Total Income</p>
//             <p className="text-lg font-bold text-green-500">
//               ${totals.income.toFixed(2)}
//             </p>
//           </div>
//           <div className="text-center">
//             <p className="text-muted-foreground">Total Expenses</p>
//             <p className="text-lg font-bold text-red-500">
//               ${totals.expense.toFixed(2)}
//             </p>
//           </div>
//           <div className="text-center">
//             <p className="text-muted-foreground">Net</p>
//             <p
//               className={`text-lg font-bold ${
//                 totals.income - totals.expense >= 0
//                   ? "text-green-500"
//                   : "text-red-500"
//               }`}
//             >
//               ${(totals.income - totals.expense).toFixed(2)}
//             </p>
//           </div>
//         </div>
//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={filteredData}
//               margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis
//                 dataKey="date"
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//               />
//               <YAxis
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//                 tickFormatter={(value) => `$${value}`}
//               />
//               <Tooltip
//                 formatter={(value) => [`$${value}`, undefined]}
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "var(--radius)",
//                 }}
//               />
//               <Legend />
//               <Bar
//                 dataKey="income"
//                 name="Income"
//                 fill="#22c55e"
//                 radius={[4, 4, 0, 0]}
//               />
//               <Bar
//                 dataKey="expense"
//                 name="Expense"
//                 fill="#ef4444"
//                 radius={[4, 4, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { format, subDays, startOfDay, endOfDay } from "date-fns";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const DATE_RANGES = {
//   "7D": { label: "Last 7 Days", days: 7 },
//   "1M": { label: "Last Month", days: 30 },
//   "3M": { label: "Last 3 Months", days: 90 },
//   "6M": { label: "Last 6 Months", days: 180 },
//   ALL: { label: "All Time", days: null },
// };

// export function AccountChart({ transactions }) {
//   const [dateRange, setDateRange] = useState("1M");

//   const filteredData = useMemo(() => {
//     const range = DATE_RANGES[dateRange];
//     const now = new Date();
//     const startDate = range.days
//       ? startOfDay(subDays(now, range.days))
//       : startOfDay(new Date(0));

//     const filtered = transactions.filter(
//       (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
//     );

//     const grouped = filtered.reduce((acc, transaction) => {
//       const date = format(new Date(transaction.date), "MMM dd");
//       if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
//       if (transaction.type === "INCOME") acc[date].income += transaction.amount;
//       else acc[date].expense += transaction.amount;
//       return acc;
//     }, {});

//     return Object.values(grouped).sort(
//       (a, b) => new Date(a.date) - new Date(b.date)
//     );
//   }, [transactions, dateRange]);

//   const totals = useMemo(() => {
//     return filteredData.reduce(
//       (acc, day) => ({
//         income: acc.income + day.income,
//         expense: acc.expense + day.expense,
//       }),
//       { income: 0, expense: 0 }
//     );
//   }, [filteredData]);

//   return (
//     <Card className="bg-gray-900 text-gray-100 shadow-xl rounded-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300">
//       <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 gap-4 md:gap-0">
//         <CardTitle className="text-base font-semibold text-gray-200">
//           Transaction Overview
//         </CardTitle>
//         <Select defaultValue={dateRange} onValueChange={setDateRange}>
//           <SelectTrigger className="w-[150px] bg-gray-800 text-gray-100 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
//             <SelectValue placeholder="Select range" />
//           </SelectTrigger>
//           <SelectContent className="bg-gray-800 text-gray-100">
//             {Object.entries(DATE_RANGES).map(([key, { label }]) => (
//               <SelectItem key={key} value={key}>
//                 {label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>

//       <CardContent>
//         {/* Totals Summary */}
//         <div className="flex flex-col md:flex-row justify-around items-center mb-6 text-sm gap-4 md:gap-0">
//           <div className="text-center">
//             <p className="text-gray-400">Total Income</p>
//             <p className="text-lg md:text-xl font-bold text-green-400">
//               ${totals.income.toFixed(2)}
//             </p>
//           </div>
//           <div className="text-center">
//             <p className="text-gray-400">Total Expenses</p>
//             <p className="text-lg md:text-xl font-bold text-red-400">
//               ${totals.expense.toFixed(2)}
//             </p>
//           </div>
//           <div className="text-center">
//             <p className="text-gray-400">Net</p>
//             <p
//               className={`text-lg md:text-xl font-bold ${
//                 totals.income - totals.expense >= 0
//                   ? "text-green-400"
//                   : "text-red-400"
//               }`}
//             >
//               ${(totals.income - totals.expense).toFixed(2)}
//             </p>
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <div className="h-[320px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={filteredData}
//               margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
//             >
//               <CartesianGrid strokeDasharray="4 4" stroke="#2e2e2e" vertical={false} />
//               <XAxis
//                 dataKey="date"
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={{ stroke: "#555" }}
//                 stroke="#aaa"
//               />
//               <YAxis
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={{ stroke: "#555" }}
//                 tickFormatter={(value) => `$${value}`}
//                 stroke="#aaa"
//               />
//               <Tooltip
//                 formatter={(value) => [`$${value}`, undefined]}
//                 contentStyle={{
//                   backgroundColor: "#1f2937",
//                   border: "1px solid #374151",
//                   borderRadius: "8px",
//                   color: "#f5f5f5",
//                 }}
//               />
//               <Legend wrapperStyle={{ color: "#f5f5f5" }} />
//               <Bar
//                 dataKey="income"
//                 name="Income"
//                 fill="url(#incomeGradient)"
//                 radius={[6, 6, 0, 0]}
//               />
//               <Bar
//                 dataKey="expense"
//                 name="Expense"
//                 fill="url(#expenseGradient)"
//                 radius={[6, 6, 0, 0]}
//               />
//               <defs>
//                 <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
//                   <stop offset="100%" stopColor="#16a34a" stopOpacity={0.8} />
//                 </linearGradient>
//                 <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
//                   <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.8} />
//                 </linearGradient>
//               </defs>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      if (transaction.type === "INCOME") acc[date].income += transaction.amount;
      else acc[date].expense += transaction.amount;
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <Card className="bg-gray-900 text-gray-100 shadow-xl rounded-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 gap-4 md:gap-0">
        <CardTitle className="text-base font-semibold text-gray-200">
          Transaction Overview
        </CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[150px] bg-gray-800 text-gray-100 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100">
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {/* Totals Summary */}
        <div className="flex flex-col md:flex-row justify-around items-center mb-6 text-sm gap-4 md:gap-0">
          <div className="text-center">
            <p className="text-gray-400">Total Income</p>
            <p className="text-lg md:text-xl font-bold text-green-400">
              ₹{totals.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Total Expenses</p>
            <p className="text-lg md:text-xl font-bold text-red-400">
              ₹{totals.expense.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Net</p>
            <p
              className={`text-lg md:text-xl font-bold ${
                totals.income - totals.expense >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              ₹{(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#2e2e2e" vertical={false} />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "#555" }}
                stroke="#aaa"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "#555" }}
                tickFormatter={(value) => `₹${value}`}
                stroke="#aaa"
              />
              <Tooltip
                formatter={(value) => [`₹${value}`, undefined]}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#f5f5f5",
                }}
              />
              <Legend wrapperStyle={{ color: "#f5f5f5" }} />
              <Bar
                dataKey="income"
                name="Income"
                fill="url(#incomeGradient)"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="url(#expenseGradient)"
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
