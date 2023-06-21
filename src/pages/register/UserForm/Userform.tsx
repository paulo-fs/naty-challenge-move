import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export function UserForm(props: any) {
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
          name="numeroDocumento"
          control={control}
          render={({ field }) => (
            <TextField placeholder="Número do documento" fullWidth {...field}
              error={!!errors.numeroDocumento?.message}
              helperText={errors.numeroDocumento?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={4} padding={1}>
        <Controller
            name="tipoDocumento"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Tipo" fullWidth {...field}
                error={!!errors.tipoDocumento?.message}
                helperText={errors.tipoDocumento?.message}
              />
            )}
          />
      </Grid>

      <Grid item xs={12} padding={1}>
        <Controller
            name="logradouro"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Seu endereço" fullWidth {...field}
                error={!!errors.logradouro?.message}
                helperText={errors.logradouro?.message}
              />
            )}
          />
      </Grid>

      <Grid item xs={9} padding={1}>
        <Controller
            name="bairro"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Bairro" fullWidth {...field}
                error={!!errors.bairro?.message}
                helperText={errors.bairro?.message}
              />
            )}
          />
      </Grid>
      <Grid item xs={3} padding={1}>
        <Controller
            name="numero"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Número" fullWidth {...field}
                error={!!errors.numero?.message}
                helperText={errors.numero?.message}
              />
            )}
          />
      </Grid>

      <Grid item xs={9} padding={1}>
        <Controller
            name="cidade"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Cidade" fullWidth {...field}
                error={!!errors.cidade?.message}
                helperText={errors.cidade?.message}
              />
            )}
          />
      </Grid>
      <Grid item xs={3} padding={1}>
        <Controller
            name="uf"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Estado" fullWidth {...field}
                error={!!errors.uf?.message}
                helperText={errors.uf?.message}
              />
            )}
          />
      </Grid>
    </>
  )
}
