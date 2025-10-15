"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
  PlusCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/data/categories";
import { bulkDeleteTransactions } from "@/actions/account";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export function TransactionTable({ transactions, currency = "INR" }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { loading: deleteLoading, fn: deleteFn, data: deleted } = useFetch(
    bulkDeleteTransactions
  );

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((t) =>
        t.description?.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (typeFilter) {
      result = result.filter((t) => t.type === typeFilter);
    }

    // Recurring filter
    if (recurringFilter) {
      result = result.filter((t) =>
        recurringFilter === "recurring" ? t.isRecurring : !t.isRecurring
      );
    }

    // Sorting
    result.sort((a, b) => {
      let comp = 0;
      switch (sortConfig.field) {
        case "date":
          comp = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comp = a.amount - b.amount;
          break;
        case "category":
          comp = a.category.localeCompare(b.category);
          break;
      }
      return sortConfig.direction === "asc" ? comp : -comp;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedTransactions, currentPage]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction: current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((i) => i !== id) : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === paginatedTransactions.length
        ? []
        : paginatedTransactions.map((t) => t.id)
    );
  };

  const handleBulkDelete = () => {
    if (!window.confirm(`Delete ${selectedIds.length} transactions?`)) return;
    deleteFn(selectedIds);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSelectedIds([]);
  };

  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.success("Transactions deleted successfully");
      setSelectedIds([]);
    }
  }, [deleted, deleteLoading]);

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);

  return (
    <div className="space-y-4 text-gray-100">
      {deleteLoading && <BarLoader width="100%" color="#7c3aed" />}
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-gray-900 text-gray-100 border border-gray-700 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select
            value={typeFilter}
            onValueChange={(val) => {
              setTypeFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="bg-gray-900 border border-gray-700 text-gray-100 w-[130px] focus:ring-purple-500 focus:border-purple-500">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100">
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(val) => {
              setRecurringFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="bg-gray-900 border border-gray-700 text-gray-100 w-[140px] focus:ring-purple-500 focus:border-purple-500">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100">
              <SelectItem value="recurring">Recurring Only</SelectItem>
              <SelectItem value="non-recurring">Non-recurring Only</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-400"
              aria-label={`Delete ${selectedIds.length} selected transactions`}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Selected ({selectedIds.length})
            </Button>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              className="border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 focus:ring-2 focus:ring-purple-500"
              aria-label="Clear filters"
            >
              <X className="h-4 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-700 overflow-hidden shadow-lg">
        <Table className="bg-gray-900">
          <TableHeader className="bg-gray-800 text-gray-100">
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedIds.length === paginatedTransactions.length &&
                    paginatedTransactions.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  className="border-gray-600 text-purple-500 focus:ring-purple-400"
                  aria-label="Select all transactions on current page"
                />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  <ChevronUp
                    className={cn(
                      "h-4 w-4 text-gray-100",
                      sortConfig.field === "date" && sortConfig.direction === "asc"
                        ? "opacity-100"
                        : "opacity-30"
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-100",
                      sortConfig.field === "date" && sortConfig.direction === "desc"
                        ? "opacity-100"
                        : "opacity-30"
                    )}
                  />
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-1">
                  Category
                  <ChevronUp
                    className={cn(
                      "h-4 w-4 text-gray-100",
                      sortConfig.field === "category" && sortConfig.direction === "asc"
                        ? "opacity-100"
                        : "opacity-30"
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-100",
                      sortConfig.field === "category" && sortConfig.direction === "desc"
                        ? "opacity-100"
                        : "opacity-30"
                    )}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-right select-none"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end gap-1">
                  Amount
                  <ChevronUp
                    className={cn(
                      "h-4 w-4 text-gray-100",
                      sortConfig.field === "amount" && sortConfig.direction === "asc"
                        ? "opacity-100"
                        : "opacity-30"
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-100",
                      sortConfig.field === "amount" && sortConfig.direction === "desc"
                        ? "opacity-100"
                        : "opacity-30"
                    )}
                  />
                </div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                  <div className="flex flex-col items-center gap-2">
                    <PlusCircle className="h-8 w-8 text-gray-400" />
                    No transactions found
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                      onClick={() => router.push("/transaction/create")}
                    >
                      Add Transaction
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((t) => (
                <TableRow
                  key={t.id}
                  className="hover:bg-gray-800 transition-colors duration-200"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(t.id)}
                      onCheckedChange={() => handleSelect(t.id)}
                      className="border-gray-600 text-purple-500 focus:ring-purple-400"
                      aria-label={`Select transaction ${t.description}`}
                    />
                  </TableCell>
                  <TableCell>{format(new Date(t.date), "PP")}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell className="capitalize">
                    <span
                      style={{ background: categoryColors[t.category] || "#4B5563" }}
                      className="px-2 py-1 rounded text-white text-sm"
                    >
                      {t.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium",
                      t.type === "EXPENSE" ? "text-red-400" : "text-green-400"
                    )}
                  >
                    {t.type === "EXPENSE" ? "-" : "+"}
                    {formatCurrency(t.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={t.isRecurring ? "bg-purple-700 text-white" : "border-gray-600 text-gray-300"}
                    >
                      {t.isRecurring
                        ? RECURRING_INTERVALS[t.recurringInterval]
                        : "One-time"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Transaction menu"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 text-gray-100">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedIds([t.id]);
                            handleBulkDelete();
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 text-gray-300">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
