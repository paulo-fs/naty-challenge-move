import { RadioGroupClientDriver } from "@/components/RadioGroupClientDriver/RadioGroupClientDriver";
import { Bolt } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRegister } from "./Register.controller";
import { UserForm } from "./UserForm/Userform";
import { DriverForm } from "./DriverForm/DriverForm";
import { NotificationModal } from "@/components";

export default function Register() {
  const {
    radioGroupValue,
    handleRadioGroupChange,
    handleSubmit,
    submitForm,
    isSubmitting,
    errors,
    control,
    isModalOpen,
    closeNotificationModal,
    modalInfos,
  } = useRegister()

  return (
    <Container maxWidth='xl'>
      <Box component={'main'} display='flex' flexDirection='column' alignItems='center' justifyContent='center' width='100%' height='100%' marginY={4}>
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Bolt sx={{ fontSize: 45 }} color='primary' />
            <Typography color='primary' variant='h3' fontWeight={700}>MOVE</Typography>
          </Box>
          <Typography>
            Sua plataforma de deslocamento.
          </Typography>
        </>

        <Card variant='outlined' sx={{ width: '100%', maxWidth: '560px', marginTop: 6, padding: 2 }}>
          <CardContent>
            <Typography variant='h6' fontWeight={600}>
              Seja bem vindo(a)!
            </Typography>
            <Typography>
              Faça o cadastro e comece a utilizar os nossos serviços.
            </Typography>
          </CardContent>

          <FormControl component='form' onSubmit={handleSubmit(submitForm)}>
            <CardContent>
              <Box paddingX={1} marginBottom={2}>
                <RadioGroupClientDriver
                  label="Você quer se cadastrar como:"
                  value={radioGroupValue}
                  onChange={handleRadioGroupChange}
                />
              </Box>

              <Grid container>
                {radioGroupValue === 'passageiro'
                  ? (<UserForm
                      errors={errors}
                      control={control}
                    />)
                  : (
                    <DriverForm
                      errors={errors}
                      control={control}
                    />
                  )
                }
              </Grid>
            </CardContent>

            <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingX: 3 }}>
              <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth>
                {isSubmitting
                  ? <CircularProgress size={20} />
                  : 'Registrar'
                }
              </Button>
              <Link href='/' title='Quero me registrar'>
                <Button variant='text' color='primary'>Cancelar</Button>
              </Link>
            </CardActions>
          </FormControl>
        </Card>
      </Box>
      <NotificationModal
        isModalOpen={isModalOpen}
        closeNotificationModal={closeNotificationModal}
        modalInfos={modalInfos}
      />
    </Container>
  )
}
