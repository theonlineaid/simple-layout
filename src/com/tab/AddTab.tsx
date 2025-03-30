import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTabName } from "../../redux/slice/addTabName";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import AddLoadingIconButton from "./AddIcon";

const AddTab: React.FC = () => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <div onClick={() => setShowInput(!showInput)} style={{ color: "#fff" }}>
        {showInput ? "❌" : <AddLoadingIconButton />}
      </div>
      {showInput && (
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Tab Name"
          />
          <IconButton
            onClick={() => {
              if (input.trim()) {
                dispatch(addTabName(input));
                setInput("");
                setShowInput(false);
              }
            }}
            aria-label="add"
            size="small"
          >
            <AddIcon sx={{ color: "#fff" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default AddTab;
