"use client";

import { createColumnHelper } from "@tanstack/react-table";

const testData = [
  {
    name: "chicken",
    calorie: 12,
    protein: 23,
    fat: 34,
    carbohydrate: 45,
    created_at: "date",
    type: "lunch",
  },
  {
    name: "milk",
    calorie: 23,
    protein: 23,
    fat: 54,
    carbohydrate: 45,
    created_at: "date",
    type: "lunch",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => <span>Food Name</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("calorie", {
    header: () => <span>Calories</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("protein", {
    header: () => <span>Proteins</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("fat", {
    header: () => <span>Fats</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("carbohydrate", {
    header: () => <span>Carbohydrates</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("type", {
    header: () => <span>Meal</span>,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
];

const TableColumns = {
  columns,
  testData,
};

export default TableColumns;
