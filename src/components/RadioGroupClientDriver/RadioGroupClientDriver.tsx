import { Box, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { RadioGroupClientDriverProps } from "./RadioGroupClientDriver.props";

export function RadioGroupClientDriver(data: RadioGroupClientDriverProps) {
  const {
    label = 'Deseja entrar como:',
    value,
    onChange
  } = data

  return (
    <Box>
      <FormLabel id='client-or-driver'>{label}</FormLabel>
      <RadioGroup
        aria-labelledby='client-or-driver'
        defaultValue='passageiro'
        name='radio-button-group'
        row
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value='passageiro' control={<Radio />} label='Passageiro' />
        <FormControlLabel value='motorista' control={<Radio />} label='Motorista' />
      </RadioGroup>
    </Box>
  )
}
