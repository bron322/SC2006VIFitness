"use client";

import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => <span>Name</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("distance", {
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghostHeader"
            style={{
              fontWeight: 700,
            }}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Distance (m)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: (info) => {
      return <div className="text-center">{info.getValue()}</div>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("duration", {
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghostHeader"
            style={{
              fontWeight: 700,
            }}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duration (s)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: (info) => {
      return <div className="text-center">{info.getValue()}</div>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("calorieBurned", {
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghostHeader"
            style={{
              fontWeight: 700,
            }}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Calorie Burned (Cal)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: (info) => {
      return <div className="text-center">{info.getValue()}</div>;
    },
    footer: (props) => props.column.id,
  }),

  columnHelper.accessor("type", {
    header: () => (
      <div className="flex justify-center">
        <span>Type</span>
      </div>
    ),
    cell: (info) => {
      return <div className="text-center">{info.getValue()}</div>;
    },
    footer: (props) => props.column.id,
  }),

  columnHelper.accessor("date", {
    header: () => <span>Date</span>,
    cell: (props) => {
      return <span>{format(new Date(props.getValue()), "PPP")}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => `${format(new Date(row.date), "PPP")}`, {
    id: "LocalDate",
  }),
];

const StravaTableColumns = {
  columns,
};

export default StravaTableColumns;
