import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface AthleteData {
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
  id: string;
}

interface ShortNameAutocompleteProps {
  filteredData: Array<AthleteData>;
  onChange: (value: string | null) => void;
}

export default function ShortNameAutocomplete({
  filteredData,
  onChange,
}: ShortNameAutocompleteProps) {
  return (
    <div>
      <Autocomplete
        disablePortal
        options={filteredData} // Use filteredData directly
        getOptionLabel={(option) => option.athlete} // Display the athlete name in the dropdown
        onChange={(event, newValue) =>
          onChange(newValue ? newValue.athlete : null)
        } // Return the selected athlete name
        ListboxProps={{
          style: { maxHeight: "200px", fontSize: 12, fontWeight: 600 },
        }}
        sx={{
          width: 200,
          "& .MuiInputBase-root": {
            height: 35,
            fontSize: 12,
          },
          "& .MuiAutocomplete-listbox": {
            maxHeight: 200,
          },
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Select athlete" size="small" />
        )}
      />
    </div>
  );
}
