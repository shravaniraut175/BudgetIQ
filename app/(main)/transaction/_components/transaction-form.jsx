"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) setValue("description", scannedData.description);
      if (scannedData.category) setValue("category", scannedData.category);
      toast.success("Receipt scanned successfully");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-6 bg-gray-900 rounded-2xl shadow-xl max-w-3xl mx-auto"
    >
      {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}

      {/* Type */}
      <div className="space-y-2 bg-gray-800 p-4 rounded-xl shadow-md">
        <label className="text-sm font-medium text-lavender-200">Type</label>
        <Select onValueChange={(value) => setValue("type", value)} defaultValue={type}>
          <SelectTrigger className="bg-gray-900 text-white border-indigo-700/50 hover:ring-2 hover:ring-cyan-400/50 transition">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white">
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-red-400">{errors.type.message}</p>}
      </div>

      {/* Amount & Account */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 bg-gray-800 p-4 rounded-xl shadow-md">
          <label className="text-sm font-medium text-lavender-200">Amount</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
            className="bg-gray-900 text-white border-indigo-700/50 placeholder-lavender-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
          />
          {errors.amount && <p className="text-sm text-red-400">{errors.amount.message}</p>}
        </div>

        <div className="space-y-2 bg-gray-800 p-4 rounded-xl shadow-md">
          <label className="text-sm font-medium text-lavender-200">Account</label>
          <Select onValueChange={(value) => setValue("accountId", value)} defaultValue={getValues("accountId")}>
            <SelectTrigger className="bg-gray-900 text-white border-indigo-700/50 hover:ring-2 hover:ring-cyan-400/50 transition">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} (₹{parseFloat(account.balance).toFixed(2)})
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="w-full text-lavender-300 hover:text-cyan-400 hover:bg-gray-800 transition"
                >
                  Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && <p className="text-sm text-red-400">{errors.accountId.message}</p>}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2 bg-gray-800 p-4 rounded-xl shadow-md">
        <label className="text-sm font-medium text-lavender-200">Category</label>
        <Select onValueChange={(value) => setValue("category", value)} defaultValue={getValues("category")}>
          <SelectTrigger className="bg-gray-900 text-white border-indigo-700/50 hover:ring-2 hover:ring-cyan-400/50 transition">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white">
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-red-400">{errors.category.message}</p>}
      </div>

      {/* Date */}
      <div className="space-y-2 bg-gray-800 p-4 rounded-xl shadow-md">
        <label className="text-sm font-medium text-lavender-200">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal text-lavender-200 border-indigo-700/50 hover:ring-2 hover:ring-cyan-400/50 transition"
              )}
            >
              {date ? format(date, "PPP") : "Pick a date"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-300 text-white rounded-lg shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("date", date)}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && <p className="text-sm text-red-400">{errors.date.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2 bg-gray-800 p-4 rounded-xl shadow-md">
        <label className="text-sm font-medium text-lavender-200">Description</label>
        <Input
          placeholder="Enter description"
          {...register("description")}
          className="bg-gray-900 text-white border-indigo-700/50 placeholder-lavender-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
        />
        {errors.description && <p className="text-sm text-red-400">{errors.description.message}</p>}
      </div>

      {/* Recurring Toggle */}
      <div className="flex flex-row items-center justify-between rounded-xl border border-indigo-700/50 p-4 bg-gray-800 shadow-md">
        <div className="space-y-0.5">
          <label className="text-base font-medium text-lavender-200">Recurring Transaction</label>
          <div className="text-sm text-lavender-400">Set up a recurring schedule for this transaction</div>
        </div>
        <Switch checked={isRecurring} onCheckedChange={(checked) => setValue("isRecurring", checked)} />
      </div>

      {/* Recurring Interval */}
      {isRecurring && (
        <div className="space-y-2 bg-gray-800 p-4 rounded-xl shadow-md">
          <label className="text-sm font-medium text-lavender-200">Recurring Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="bg-gray-900 text-white border-indigo-700/50 hover:ring-2 hover:ring-cyan-400/50 transition">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && <p className="text-sm text-red-400">{errors.recurringInterval.message}</p>}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-gray-900 text-lavender-200 border-indigo-700/50 hover:bg-indigo-800/50 hover:text-white transition"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 text-cyan-400 shadow-lg shadow-cyan-700/40 hover:scale-105 hover:shadow-cyan-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-cyan-300" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? "Update Transaction" : "Create Transaction"}
        </Button>
      </div>
    </form>
  );
}
