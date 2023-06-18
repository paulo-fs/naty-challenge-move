import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CustomSelectProps, MenuProps } from "./CustomSelect.props";

export function CustomSelect({
  valuesList, label, selectedValue, placeholderValue, setValueFunc, setId
}: CustomSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const { target: { value } } = event;
    setValueFunc(String(value));
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
            return <em>{placeholderValue ?? 'Selecione'}</em>
          }
          return selected
        }}
      >
        <MenuItem disabled value=''>
          <em>{placeholderValue}</em>
        </MenuItem>
        {valuesList.map((driver) => {
          setId(driver.id)
          return (
            <MenuItem
              key={driver.id}
              value={driver.nome}
            >
              {driver.nome}
            </MenuItem>
          )
        })}
      </Select>
    </>
  )
}
