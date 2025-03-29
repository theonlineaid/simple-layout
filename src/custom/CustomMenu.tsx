import { Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToTab } from "../redux/slice/addToTab";

const CustomMenu = ({
  contextMenu,
  handleMenuClose,
  selectedRowData,
  handleMenuOptionClick,
}: any) => {
  const dispatch = useDispatch();

  const addTab = (row: any) => {
    dispatch(addToTab(row));
    handleMenuClose();
  };

  return (
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
      <MenuItem onClick={() => addTab(selectedRowData)}>Add To Tab</MenuItem>
      <MenuItem onClick={() => handleMenuOptionClick("View Details")}>
        Chart instrument
      </MenuItem>
      <MenuItem onClick={() => handleMenuOptionClick("View Details")}>
        Buy Order
      </MenuItem>
      <MenuItem onClick={() => handleMenuOptionClick("View Details")}>
        Sell Order
      </MenuItem>
    </Menu>
  );
};

export default CustomMenu;
