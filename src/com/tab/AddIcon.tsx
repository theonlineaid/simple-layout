import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export default function AddLoadingIconButton() {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  });
  return (
    <Tooltip title="Add Tab">
      <IconButton
        onClick={() => setLoading(true)}
        loading={loading}
        size="small"
      >
        <AddIcon sx={{ color: "#fff" }} />
      </IconButton>
    </Tooltip>
  );
}
