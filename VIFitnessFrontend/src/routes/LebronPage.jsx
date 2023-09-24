import { useState } from "react";

import "./styles/LebronPage.css";
import { Table } from "../components/MacroTable";
import { Modal } from "../components/Modal";
import PieChartLebron from "../components/piechart";
import Semircirclebar from "../components/semircirclebar"

import Topbar from "../components/topbar";
import { MyProSidebarProvider } from "../components/sidebarContext"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './styles/profilePage.css'

//This is Lebron test micro page

export default function LebronPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "Home",
      description: "This is the main page of the website",
      status: "Breakfast",
    },
    {
      page: "About Us",
      description: "This page has details about the company",
      status: "Lunch",
    },
    {
      page: "Pricing",
      description: "Prices for different subscriptions",
      status: "Dinner",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;

          return newRow;
        })
      );
  };
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />


              <div className="App">
                <div className="piechart-container flex w-5/6 h-1/3 justify-center items-center pt-10">
                  <Semircirclebar />
                </div>
                <div className="piechart-container flex w-5/6 h-1/3 justify-center items-center">
                  <PieChartLebron />
                </div>


                <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
                <button onClick={() => setModalOpen(true)} className="btn flex justify-self-center">
                  Add
                </button>
                {modalOpen && (
                  <Modal
                    closeModal={() => {
                      setModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rows[rowToEdit]}
                  />
                )}
                <div className="relative flex h-[50px] w-full" />



                <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
                <button onClick={() => setModalOpen(true)} className="btn flex justify-self-center">
                  Add
                </button>
                {modalOpen && (
                  <Modal
                    closeModal={() => {
                      setModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rows[rowToEdit]}
                  />
                )}
                <div className="relative flex h-[50px] w-full" />

                <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
                <button onClick={() => setModalOpen(true)} className="btn flex justify-self-center">
                  Add
                </button>
                {modalOpen && (
                  <Modal
                    closeModal={() => {
                      setModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rows[rowToEdit]}
                  />
                )}
                <div className="relative flex h-[50px] w-full" />
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}