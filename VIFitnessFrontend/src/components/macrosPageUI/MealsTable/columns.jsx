"use client";

import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import DeleteMealButton from "../deleteMealButton";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("foodName", {
    header: () => <span>Food Name</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("calorie", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghostHeader"
          style={{
            fontWeight: 700,
          }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Calories (Cal)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("protein", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghostHeader"
          style={{
            fontWeight: 700,
          }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proteins (g)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("fat", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghostHeader"
          style={{
            fontWeight: 700,
          }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fats (g)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("carbohydrate", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghostHeader"
          style={{
            fontWeight: 700,
          }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Carbohydrates (g)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("mealType", {
    header: () => <span>Meal</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => {
      return <DeleteMealButton data={props.row.original} />;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: () => <span>Date</span>,
    cell: (props) => {
      return <span>{format(new Date(props.getValue()), "PPP")}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => `${format(new Date(row.createdAt), "PPP")}`, {
    id: "LocalDate",
  }),
];

const TableColumns = {
  columns,
};

export default TableColumns;
