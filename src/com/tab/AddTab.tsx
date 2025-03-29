import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTabName, clearAllTabNames } from "../../redux/slice/addTabName";

const AddTab: React.FC = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Tab Name"
      />
      <button
        onClick={() => {
          if (input.trim()) {
            dispatch(addTabName(input));
            setInput("");
          }
        }}
      >
        Add Tab Name
      </button>
      <button onClick={() => dispatch(clearAllTabNames())}>
        Clear All Tabs
      </button>
    </div>
  );
};

export default AddTab;
