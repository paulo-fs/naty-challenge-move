import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface UserFormProps {
  control: any
  errors: any
  isDisabled?: boolean
  keepDisabled?: boolean
}

export function UserForm(props: UserFormProps) {
  const { control, errors, isDisabled, keepDisabled } = props

  return (
    <>
      <Grid item xs={12} padding={1}>
        <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Nome e sobrenome" fullWidth {...field}
                label='Nome e sobrenome'
                error={!!errors.nome?.message}
                helperText={errors.nome?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
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
              label='Número do documento'
              error={!!errors.numeroDocumento?.message}
              helperText={errors.numeroDocumento?.message}
              disabled={isDisabled || keepDisabled}
              variant={(isDisabled || keepDisabled) ? 'standard' : undefined}
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
                label='Tipo'
                error={!!errors.tipoDocumento?.message}
                helperText={errors.tipoDocumento?.message}
                disabled={isDisabled || keepDisabled}
                variant={(isDisabled || keepDisabled) ? 'standard' : undefined}
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
                label='Seu endereço'
                error={!!errors.logradouro?.message}
                helperText={errors.logradouro?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
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
                label='Bairro'
                error={!!errors.bairro?.message}
                helperText={errors.bairro?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
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
                label='Número'
                error={!!errors.numero?.message}
                helperText={errors.numero?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
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
                label='Cidade'
                error={!!errors.cidade?.message}
                helperText={errors.cidade?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
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
                label='UF'
                error={!!errors.uf?.message}
                helperText={errors.uf?.message}
                disabled={isDisabled}
                variant={isDisabled ? 'standard' : undefined}
              />
            )}
          />
      </Grid>
    </>
  )
}
