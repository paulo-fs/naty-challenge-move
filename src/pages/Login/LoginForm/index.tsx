import React from "react";
import { useLoginForm } from "./LoginForm.controller";
import { NotificationModal } from "@/components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import { RadioGroupClientDriver } from "@/components/RadioGroupClientDriver/RadioGroupClientDriver";

export function LoginForm() {
  const {
    showPassword,
    radioGroupValue,
    userId,
    password,
    isDisabled,
    closeNotificationModal,
    isModalOpen,
    modalInfos,
    handleClickShowPassword,
    handlePasswordInputChange,
    handleIdInputChange,
    handleMouseDownPassword,
    handleRadioGroupChange,
    handleSubmit
  } = useLoginForm()

  return (
    <FormControl sx={{ display: 'flex'}} component='form' onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
        <TextField
          placeholder='Digite o número do seu id'
          value={userId}
          onChange={handleIdInputChange}
        />
        <OutlinedInput
          placeholder='Digite sua senha'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordInputChange}
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
        <RadioGroupClientDriver
          label="Deseja entrar como:"
          value={radioGroupValue}
          onChange={handleRadioGroupChange}
        />
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={isDisabled}
      >
        Entrar
      </Button>
      <NotificationModal
        isModalOpen={isModalOpen}
        closeNotificationModal={closeNotificationModal}
        modalInfos={modalInfos}
      />
    </FormControl>
  )
}
