
import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import {
  ClientSideRowModelModule,
  ColDef,
  ColumnApiModule,
  ColumnState,
  GridReadyEvent,
  ModuleRegistry,
  RowSelectionOptions,
  ValidationModule,
} from "ag-grid-community";
import CustomMenu from "../custom/CustomMenu";
import CustomDialog from "../custom/CustomDialog";

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
  const menuRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const gridRef = useRef<AgGridReact>(null);
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

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  const showDetailsModal = useCallback((rowData: any) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  }, []);

  const rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(
    () => ({
      mode: "singleRow",
      checkboxes: false,
      enableClickSelection: true,
      enableSelectionWithoutKeys: true,
      enableRightClickSelection: true,
    }),
    []
  );

  const onCellContextMenu = useCallback((event: any) => {
    event.event.preventDefault();
    setContextMenu({
      mouseX: event.event.clientX,
      mouseY: event.event.clientY,
    });

    const clickedRowNode = event.node;
    if (gridRef.current && clickedRowNode) {
      gridRef.current.api.deselectAll();
      clickedRowNode.setSelected(true);
    }

    setSelectedRowData(clickedRowNode.data);
  }, []);

  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleMenuOptionClick = (option: string) => {
    if (option === "View Details" && selectedRowData) {
      showDetailsModal(selectedRowData);
    } else {
      alert(`Option selected: ${option}`);
    }
    handleMenuClose();
  };

  return (
    <>

      <div style={containerStyle}>
        <div style={gridStyle} onContextMenu={handleContextMenu}>
          <AgGridReact<IOlympicData>
            rowDragManaged={true}
            suppressRowDrag={true}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            // multiSortKey={"ctrl"} // Allow multi-column sorting with Ctrl key
            rowSelection={rowSelection}
            onCellContextMenu={onCellContextMenu}
            onGridReady={onGridReady}
          />
        </div>
      </div>


      {isModalOpen && (
        <CustomDialog
          title="Row Details"
          open={isModalOpen}
          onClose={handleCloseModal}
          isFullScreenButtonVisible
          maxWidth="sm"
          isDraggable
        >
          <div>
            {selectedRowData && (
              <pre>{JSON.stringify(selectedRowData, null, 2)}</pre>
            )}
          </div>
        </CustomDialog>
      )}

      <CustomMenu
        ref={menuRef}
        contextMenu={contextMenu}
        handleMenuClose={handleMenuClose}
        selectedRowData={selectedRowData}
        handleMenuOptionClick={handleMenuOptionClick}
      />
    </>
  );
};
export default Ag;