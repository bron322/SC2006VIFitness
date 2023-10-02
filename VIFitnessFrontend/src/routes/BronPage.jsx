import { Link } from "react-router-dom";
import MacroTable from "../components/MacroTable";
import React from "react";

export default function LebronPage() {
    return (
        <div>
            {/* Header with inline css */}
            <h1
                style={{
                    display: 'flex', justifyContent: 'center', padding: '15px',
                    border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)'
                }}>
                Geeks For Geeks Material UI Table
            </h1>
            {/* Table component below header */}
            <MacroTable />
        </div>
    );
}
