import { Grid, TextField } from "@mui/material";
import { Controller } from 'react-hook-form'

export function DriverForm(props: any) {
  const { control, errors } = props

  return (
    <>
      <Grid item xs={12} padding={1}>
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <TextField placeholder="Nome e sobrenome" fullWidth {...field}
              error={!!errors.nome?.message}
              helperText={errors.nome?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={8} padding={1}>
        <Controller
            name="numeroHabilitacao"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Número da habilitação" fullWidth {...field}
                error={!!errors.numeroHabilitacao?.message}
                helperText={errors.numeroHabilitacao?.message}
              />
            )}
          />
      </Grid>
      <Grid item xs={4} padding={1}>
        <Controller
            name="categoriaHabilitacao"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Categoria" fullWidth {...field}
                error={!!errors.categoriaHabilitacao?.message}
                helperText={errors.categoriaHabilitacao?.message}
              />
            )}
          />
      </Grid>

      <Grid item xs={12} padding={1}>
        <Controller
            name="vencimentoHabilitacao"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Validade do documento" fullWidth {...field}
                type="date"
                error={!!errors.vencimentoHabilitacao?.message}
                helperText={errors.vencimentoHabilitacao?.message}
              />
            )}
          />
      </Grid>
    </>
  )
}
