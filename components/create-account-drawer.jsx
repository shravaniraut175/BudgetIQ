// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import useFetch from "@/hooks/use-fetch";

// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
//   DrawerClose,
// } from "@/components/ui/drawer";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { createAccount } from "@/actions/dashboard";
// import { accountSchema } from "@/app/lib/schema";

// export function CreateAccountDrawer({ children }) {
//   const [open, setOpen] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//     reset,
//   } = useForm({
//     resolver: zodResolver(accountSchema),
//     defaultValues: {
//       name: "",
//       type: "CURRENT",
//       balance: "",
//       isDefault: false,
//     },
//   });

//   const {
//     loading: createAccountLoading,
//     fn: createAccountFn,
//     error,
//     data: newAccount,
//   } = useFetch(createAccount);

//   const onSubmit = async (data) => {
//     await createAccountFn(data);
//   };

//   useEffect(() => {
//     if (newAccount) {
//       toast.success("Account created successfully");
//       reset();
//       setOpen(false);
//     }
//   }, [newAccount, reset]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message || "Failed to create account");
//     }
//   }, [error]);

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>{children}</DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader>
//           <DrawerTitle>Create New Account</DrawerTitle>
//         </DrawerHeader>
//         <div className="px-4 pb-4">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="space-y-2">
//               <label
//                 htmlFor="name"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Account Name
//               </label>
//               <Input
//                 id="name"
//                 placeholder="e.g., Main Checking"
//                 {...register("name")}
//               />
//               {errors.name && (
//                 <p className="text-sm text-red-500">{errors.name.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="type"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Account Type
//               </label>
//               <Select
//                 onValueChange={(value) => setValue("type", value)}
//                 defaultValue={watch("type")}
//               >
//                 <SelectTrigger id="type">
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="CURRENT">Current</SelectItem>
//                   <SelectItem value="SAVINGS">Savings</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.type && (
//                 <p className="text-sm text-red-500">{errors.type.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="balance"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Initial Balance
//               </label>
//               <Input
//                 id="balance"
//                 type="number"
//                 step="0.01"
//                 placeholder="0.00"
//                 {...register("balance")}
//               />
//               {errors.balance && (
//                 <p className="text-sm text-red-500">{errors.balance.message}</p>
//               )}
//             </div>

//             <div className="flex items-center justify-between rounded-lg border p-3">
//               <div className="space-y-0.5">
//                 <label
//                   htmlFor="isDefault"
//                   className="text-base font-medium cursor-pointer"
//                 >
//                   Set as Default
//                 </label>
//                 <p className="text-sm text-muted-foreground">
//                   This account will be selected by default for transactions
//                 </p>
//               </div>
//               <Switch
//                 id="isDefault"
//                 checked={watch("isDefault")}
//                 onCheckedChange={(checked) => setValue("isDefault", checked)}
//               />
//             </div>

//             <div className="flex gap-4 pt-4">
//               <DrawerClose asChild>
//                 <Button type="button" variant="outline" className="flex-1">
//                   Cancel
//                 </Button>
//               </DrawerClose>
//               <Button
//                 type="submit"
//                 className="flex-1"
//                 disabled={createAccountLoading}
//               >
//                 {createAccountLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Creating...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-gradient-to-r from-blue-950 via-black to-indigo-950 border-t border-violet-700/30 shadow-xl shadow-indigo-900/40">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-lavender-200 drop-shadow-[0_0_10px_rgba(138,43,226,0.7)]">
            Create New Account
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Account Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-lavender-200">
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Main Checking"
                className="bg-gray-900/60 border-indigo-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-lavender-200">
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger
                  id="type"
                  className="bg-gray-900/60 border-indigo-700/50 text-white focus:ring-2 focus:ring-violet-500"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/90 border border-violet-700/50 text-white shadow-lg">
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-400">{errors.type.message}</p>
              )}
            </div>

            {/* Balance */}
            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium text-lavender-200">
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-gray-900/60 border-indigo-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-sm text-red-400">{errors.balance.message}</p>
              )}
            </div>

            {/* Default Switch */}
            <div className="flex items-center justify-between rounded-lg border border-violet-700/50 p-4 bg-gray-900/60 shadow-md shadow-indigo-900/40">
              <div className="space-y-0.5">
                <label htmlFor="isDefault" className="text-base font-medium text-lavender-200 cursor-pointer">
                  Set as Default
                </label>
                <p className="text-sm text-gray-400">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-violet-500/70 bg-gray-900/70 text-lavender-200 hover:bg-indigo-800/60 hover:text-white shadow-md shadow-violet-800/40"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-violet-500 hover:to-blue-500 shadow-md shadow-violet-800/40"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-lavender-100" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
