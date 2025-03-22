import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export default function BasicHeader({ title, item, handleHeaderClick }: { title: string; item: { i: string }; handleHeaderClick: (id: string) => void }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{  padding: "0 8px" }}>
        <Toolbar sx={{ 
          justifyContent: "space-between", 
          minHeight: "20px", 
          height: "20px", 
          padding: "0 8px"
        }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1, p: 0 }}>
              <MenuIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ cursor: "move", fontSize: "12px" }} className="grid-header">
              Header {item.i}
            </Typography>
          </Box>

          {/* Center Section (Only for item.i === "1") */}
          {item.i === "1" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>tab</Typography>
            </Box>
          )}

          {/* Right Section */}
          <Box>
            <IconButton size="small" color="inherit" onClick={() => handleHeaderClick(item.i)} sx={{ p: 0 }}>
              <FullscreenIcon fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
