import { Menu, MenuItem, Snackbar, Grow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToTab, removeFromTab } from "../redux/slice/addToTab";
import { RootState } from "../redux/store";
import { useState } from "react";

const CustomMenu = ({
  contextMenu,
  handleMenuClose,
  selectedRowData,
  handleMenuOptionClick,
}: any) => {
  const dispatch = useDispatch();
  const tabNames = useSelector((state: RootState) => state.addTabName); // Get the list of tab names
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to handle Snackbar visibility

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const addTab = (row: any) => {
    if (tabNames.length === 0) {
      // Show Snackbar when there are no tabs created
      setSnackbarOpen(true);
      return;
    }
    dispatch(addToTab(row));
    handleMenuClose();
  };

  return (
    <>
      <Menu
        open={contextMenu !== null}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        onContextMenu={(e) => {
          e.preventDefault();
          handleMenuClose();
        }}
      >
        <MenuItem disabled>
          {selectedRowData?.full_name || "No name available"}
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("Edit")}>Edit</MenuItem>
        <MenuItem
          onClick={() => addTab(selectedRowData)}
          // disabled={tabNames.length === 0}
        >
          Add To Tab
        </MenuItem>
        <MenuItem onClick={() => dispatch(removeFromTab(selectedRowData))}>
          Remove From Tab
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("View Details")}>
          Chart Instrument
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("View Details")}>
          Buy Order
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("View Details")}>
          Sell Order
        </MenuItem>
      </Menu>

      {/* Snackbar Component for showing message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message="Please create a tab first before adding items."
        onClose={handleCloseSnackbar}
        slots={{ transition: Grow }}
        anchorOrigin={{
          vertical: "top", // Place at the top
          horizontal: "center", // Center it horizontally
        }}
      />
    </>
  );
};

export default CustomMenu;
