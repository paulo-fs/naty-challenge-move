import { Grid, TextField, Typography } from "@mui/material";
import { Controller } from 'react-hook-form'

interface DriverFormProps {
  control: any
  errors: any
  isDisabled?: boolean
  keepDisabled?: boolean
}

export function DriverForm(props: DriverFormProps) {
  const { control, errors, isDisabled, keepDisabled } = props

  return (
    <>
      <Grid item xs={12} padding={1}>
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <>
              <TextField id='nome' placeholder="Nome e sobrenome" fullWidth {...field}
                label='Nome e sobrenome'
                error={!!errors.nome?.message}
                helperText={errors.nome?.message}
                disabled={isDisabled || keepDisabled}
                variant={(isDisabled || keepDisabled) ? 'standard' : undefined}
              />
            </>
          )}
        />
      </Grid>

      <Grid item xs={8} padding={1}>
        <Controller
            name="numeroHabilitacao"
            control={control}
            render={({ field }) => (
              <>
                <TextField id='num-hab' placeholder="Número da habilitação" fullWidth {...field}
                  label='Número da habilitação'
                  error={!!errors.numeroHabilitacao?.message}
                  helperText={errors.numeroHabilitacao?.message}
                  disabled={isDisabled || keepDisabled}
                  variant={(isDisabled || keepDisabled) ? 'standard' : undefined}
                />
              </>
            )}
          />
      </Grid>
      <Grid item xs={4} padding={1}>
        <Controller
            name="categoriaHabilitacao"
            control={control}
            render={({ field }) => (
              <>
                <TextField id='cat-hab' placeholder="Categoria" fullWidth {...field}
                  label='Categoria'
                  error={!!errors.categoriaHabilitacao?.message}
                  helperText={errors.categoriaHabilitacao?.message}
                  disabled={isDisabled}
                  variant={isDisabled ? 'standard' : undefined}
                />
              </>
            )}
          />
      </Grid>

      <Grid item xs={12} padding={1}>
        <Controller
            name="vencimentoHabilitacao"
            control={control}
            render={({ field }) => (
              <>
                <Typography variant="caption" color='gray'>Vencimento da Habilitação</Typography>
                <TextField id='venc-hab' placeholder="Validade do documento" fullWidth {...field}
                  type="date"
                  inputProps={{ 'aria-label': 'description'}}
                  error={!!errors.vencimentoHabilitacao?.message}
                  helperText={errors.vencimentoHabilitacao?.message}
                  disabled={isDisabled}
                  variant={isDisabled ? 'standard' : undefined}
                />
              </>
            )}
          />
      </Grid>
    </>
  )
}
