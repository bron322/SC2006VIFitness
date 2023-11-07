"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@mui/material";
import { tokens } from "@/routes/theme";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const mealTypes = [
  {
    value: "run",
    label: "run",
  },
  {
    value: "swim",
    label: "swim",
  },
  {
    value: "ride",
    label: "ride",
  },
];

export default function StravaDataTable({ columns, data }) {
  const [sorting, setSorting] = useState([{ id: "type", desc: true }]); // Sorting state for table
  const [columnFilters, setColumnFilters] = useState([]); // Filter state for table
  const [open, setOpen] = useState(false); // open state of combobox for meal type
  const [mealType, setMealType] = useState(""); // track value of meal type selected in combo box
  const [date, setDate] = useState(); // track state of date picker

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
      columnVisibility: {
        createdAt: false,
        LocalDate: false,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // add 1 day to ISO date format becasue of timezone
  const convertDate = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0];
  };

  return (
    <div>
      {/* ///////////////// Date Picker ///////////////// */}
      <div className="flex items-center justify-center py-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline2"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              style={{
                borderColor: colors.secondary.default,
                color: colors.accent.foreground,
              }}
            >
              <CalendarIcon className="mr-4 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span style={{ color: colors.accent.foreground }}>
                  Pick a date
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(currentValue) => {
                console.log(format(currentValue, "PPP"));
                setDate(currentValue);
                table
                  .getColumn("LocalDate")
                  ?.setFilterValue(format(currentValue, "PPP"));
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* ///////////////// Sport Type Filter ///////////////// */}
      <div className="flex items-center justify-end py-4">
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline2"
                size="sm"
                role="combobox"
                aria-expanded={open}
                className="w-[150px] justify-between"
                style={{
                  color: colors.accent.foreground,
                  borderColor: colors.secondary.default,
                }}
              >
                {mealType
                  ? mealTypes.find((type) => type.value === mealType)?.label
                  : "Select sport type..."}
                <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                <CommandInput placeholder="Search type..." className="h-9" />
                <CommandEmpty>No meal type found.</CommandEmpty>
                <CommandGroup>
                  {mealTypes.map((type) => (
                    <CommandItem
                      key={type.value}
                      value={type.value}
                      onSelect={(currentValue) => {
                        setMealType(currentValue);
                        setOpen(false);
                        table.getColumn("type")?.setFilterValue(currentValue);
                      }}
                    >
                      {type.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          mealType === type.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* ///////////////// Data Table ///////////////// */}
      <div
        className="rounded-md border"
        style={{ borderColor: colors.secondary.default }}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                style={{
                  borderColor: colors.secondary.default,
                }}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        color: colors.accent.foreground,
                        fontWeight: 700,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  style={{ borderColor: colors.secondary.default }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ color: colors.accent.foreground }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                  style={{ color: colors.accent.foreground }}
                >
                  No activities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ///////////////// Pagination ///////////////// */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <span style={{ color: colors.accent.foreground }}>
          page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="pagination"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{ color: colors.accent.foreground }}
        >
          Previous
        </Button>
        <Button
          variant="pagination"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{ color: colors.accent.foreground }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
