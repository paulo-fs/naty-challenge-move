import { Grid, TextField } from "@mui/material";
import { Controller } from 'react-hook-form'

interface DriverFormProps {
  control: any
  errors: any
  isDisabled?: boolean
  keepDisabled?: boolean
}

export function VehicleForm(props: DriverFormProps) {
  const { control, errors, isDisabled, keepDisabled } = props

  return (
    <>
      <Grid item xs={12} padding={1}>
        <Controller
          name="marcaModelo"
          control={control}
          render={({ field }) => (
            <>
              <TextField id='marcaModelo' placeholder="Marca/Modelo" fullWidth {...field}
                label='Marca/Modelo'
                error={!!errors.marcaModelo?.message}
                helperText={errors.marcaModelo?.message}
                disabled={isDisabled}
                variant={(isDisabled) ? 'standard' : undefined}
              />
            </>
          )}
        />
      </Grid>

      <Grid item xs={12} padding={1}>
        <Controller
            name="anoFabricacao"
            control={control}
            render={({ field }) => (
              <>
                <TextField id='anoFabricacao' placeholder="Ano de Fabricação" fullWidth {...field}
                  label='Ano de Fabricação'
                  error={!!errors.anoFabricacao?.message}
                  helperText={errors.anoFabricacao?.message}
                  disabled={isDisabled}
                  variant={(isDisabled) ? 'standard' : undefined}
                />
              </>
            )}
          />
      </Grid>
      <Grid item xs={12} padding={1}>
        <Controller
            name="placa"
            control={control}
            render={({ field }) => (
              <>
                <TextField id='placa' placeholder="Placa" fullWidth {...field}
                  label='Placa'
                  error={!!errors.placa?.message}
                  helperText={errors.placa?.message}
                  disabled={isDisabled || keepDisabled}
                  variant={(isDisabled || keepDisabled) ? 'standard' : undefined}
                />
              </>
            )}
          />
      </Grid>

      <Grid item xs={12} padding={1}>
        <Controller
            name="kmAtual"
            control={control}
            render={({ field }) => (
              <>
                <TextField id='kmAtual' placeholder="Kilometragem atual" fullWidth {...field}
                  label='Kilometragem atual'
                  error={!!errors.kmAtual?.message}
                  helperText={errors.kmAtual?.message}
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
