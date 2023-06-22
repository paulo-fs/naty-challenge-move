import { Grid, InputLabel, TextField } from "@mui/material";
import { Controller } from 'react-hook-form'

interface DriverFormProps {
  control: any
  errors: any
  hasLabel?: boolean
  isDisabled?: boolean
  keepDisabled?: boolean
}

export function DriverForm(props: DriverFormProps) {
  const { control, errors, hasLabel, isDisabled, keepDisabled } = props

  return (
    <>
      <Grid item xs={12} padding={1}>
        {hasLabel && <InputLabel>Nome</InputLabel>}
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <TextField placeholder="Nome e sobrenome" fullWidth {...field}
              error={!!errors.nome?.message}
              helperText={errors.nome?.message}
              disabled={isDisabled}
              variant={isDisabled ? 'standard' : undefined}
            />
          )}
        />
      </Grid>

      <Grid item xs={8} padding={1}>
        {hasLabel && <InputLabel>Habilitação</InputLabel>}
        <Controller
            name="numeroHabilitacao"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Número da habilitação" fullWidth {...field}
                error={!!errors.numeroHabilitacao?.message}
                helperText={errors.numeroHabilitacao?.message}
                disabled={isDisabled || keepDisabled}
                variant={(isDisabled || keepDisabled) ? 'standard' : undefined}
              />
            )}
          />
      </Grid>
      <Grid item xs={4} padding={1}>
        {hasLabel && <InputLabel>Categoria</InputLabel>}
        <Controller
            name="categoriaHabilitacao"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Categoria" fullWidth {...field}
                error={!!errors.categoriaHabilitacao?.message}
                helperText={errors.categoriaHabilitacao?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
              />
            )}
          />
      </Grid>

      <Grid item xs={12} padding={1}>
        {hasLabel && <InputLabel>Vencimento da Habilitação</InputLabel>}
        <Controller
            name="vencimentoHabilitacao"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Validade do documento" fullWidth {...field}
                type="date"
                error={!!errors.vencimentoHabilitacao?.message}
                helperText={errors.vencimentoHabilitacao?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
              />
            )}
          />
      </Grid>
    </>
  )
}
