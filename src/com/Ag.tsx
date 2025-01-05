"use client";

import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import {
  ClientSideRowModelModule,
  ColDef,
  ColumnApiModule,
  ColumnState,
  GridReadyEvent,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";

interface IOlympicData {
    athlete: string;
    age: number;
    country: string;
    year: number;
    date: string;
    sport: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;  
}

// Register the required modules for ag-Grid
ModuleRegistry.registerModules([
  ColumnApiModule,
  ClientSideRowModelModule,
  ValidationModule, // Optional module for validation
]);

const Ag = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // State for rowData (Olympic data) and columnDefs (grid columns definition)
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "athlete" },
    { field: "age", width: 100 },
    { field: "country" },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  // Default column configuration
  const defaultColDef = useMemo<ColDef>(() => ({
    width: 300, // default column width
  }), []);

  // Fetch data on grid readiness
  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));

    // Apply default sorting state (sorting first by country, then by athlete)
    const defaultSortModel: ColumnState[] = [
      { colId: "country", sort: "asc", sortIndex: 0 },
      { colId: "athlete", sort: "asc", sortIndex: 1 },
    ];
    params.api.applyColumnState({ state: defaultSortModel });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          multiSortKey={"ctrl"} // Allow multi-column sorting with Ctrl key
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
export default Ag;