import { InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material";
import { CustomSelectProps, MenuProps } from "./CustomSelect.props";

export function CustomSelect({valuesList, label, selectedValue, placeholderValue, setValueFunc}: CustomSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const {
      target: { value },
    } = event;
    setValueFunc(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <InputLabel id='driver-input'>{label}:</InputLabel>
      <Select
        labelId={label}
        displayEmpty
        value={selectedValue}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>{placeholderValue ?? 'Placeholder'}</em>
          }
          return selected.join(', ')
        }}
      >
        <MenuItem disabled value=''>
          <em>Placeholder</em>
        </MenuItem>
        {valuesList.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
