import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ColumnApiModule,
  ValidationModule,
  ModuleRegistry,
} from "ag-grid-community";
import CustomMenu from "../custom/CustomMenu";
import CustomDialog from "../custom/CustomDialog";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Register the required modules for ag-Grid
ModuleRegistry.registerModules([
  ColumnApiModule,
  ClientSideRowModelModule,
  ValidationModule,
]);

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

const Ag = ({ theme }: { theme: string }) => {
  const activeTab = useSelector((state: RootState) => state.activeTab.id);
  const addToTab = useSelector((state: RootState) => state.addToTab);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<IOlympicData[]>([]);
  const [filteredRowData, setFilteredRowData] = useState<IOlympicData[]>([]);
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

  const defaultColDef = useMemo<ColDef>(() => ({ width: 300 }), []);

  // Fetch data on mount
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  // Filter data based on activeTab or addToTab
  useEffect(() => {
    if (rowData.length > 0) {
      const filteredData =
        addToTab.length > 0
          ? rowData.filter((row) => {
              // Assuming 'athlete' is the key to match for filtering
              return addToTab.some(
                (tabItem) => tabItem.athlete === row.athlete
              );
            })
          : rowData; // If addToTab is empty, return all data

      setFilteredRowData(filteredData);
    }
  }, [addToTab, rowData]);

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

  const onCellDoubleClicked = useCallback((event: any) => {
    setSelectedRowData(event.data);
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <div style={containerStyle} className={`ag-theme-${theme}-dark`}>
        <div style={gridStyle} onContextMenu={handleContextMenu}>
          <AgGridReact<IOlympicData>
            rowData={filteredRowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onCellDoubleClicked={onCellDoubleClicked}
            onCellContextMenu={onCellContextMenu}
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
          isDraggable={true}
        >
          <div>
            {selectedRowData && (
              <pre>{JSON.stringify(selectedRowData, null, 2)}</pre>
            )}
          </div>
        </CustomDialog>
      )}

      <CustomMenu
        contextMenu={contextMenu}
        handleMenuClose={handleMenuClose}
        selectedRowData={selectedRowData}
        handleMenuOptionClick={handleMenuOptionClick}
      />
    </>
  );
};

export default Ag;
