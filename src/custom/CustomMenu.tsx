import { Menu, MenuItem } from "@mui/material";

const CustomMenu = ({ contextMenu, handleMenuClose, selectedRowData, handleMenuOptionClick }: any) => {
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
      <MenuItem onClick={() => handleMenuOptionClick("Delete")}>Add To Tab</MenuItem>
      <MenuItem onClick={() => handleMenuOptionClick("View Details")}>Chart instrument</MenuItem>
      <MenuItem onClick={() => handleMenuOptionClick("View Details")}>Buy Order</MenuItem>
      <MenuItem onClick={() => handleMenuOptionClick("View Details")}>Sell Order</MenuItem>
    </Menu>
  );
};

export default CustomMenu;
