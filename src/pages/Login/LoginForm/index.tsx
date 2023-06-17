import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import React from "react";

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [radioGroupValue, setRadioGroupValue] = React.useState('passageiro')

  console.log(radioGroupValue)

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
  }

  function handleRadioGroupChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRadioGroupValue((event.target as HTMLInputElement).value)
  }

  return (
    <FormControl sx={{ display: 'flex'}}>
      <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
        <TextField placeholder='Digite seu id' />
        <OutlinedInput
          placeholder='Digite sua senha'
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>

      <Box marginTop={2}>
        <FormLabel id='client-or-driver'>Deseja entrar como:</FormLabel>
        <RadioGroup
          aria-labelledby='client-or-driver'
          defaultValue='passageiro'
          name='radio-button-group'
          row
          value={radioGroupValue}
          onChange={handleRadioGroupChange}
        >
          <FormControlLabel value='passageiro' control={<Radio />} label='Passageiro' />
          <FormControlLabel value='motorista' control={<Radio />} label='Motorista' />
        </RadioGroup>
      </Box>
    </FormControl>
  )
}
