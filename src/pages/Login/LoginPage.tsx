import Head from 'next/head'
import { Box, Button, Card, Container, CardContent, CardActions, Typography } from '@mui/material'
import Link from 'next/link'
import { Bolt } from '@mui/icons-material'
import { LoginForm } from './LoginForm'

export default function Login() {
  return (
    <>
      <Head>
        <title>Move</title>
        <meta name="description" content="Move - Sua plataforma de deslocamento fácil." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth='xl' sx={{ height: '98vh' }}>
        <Box component={'main'} display='flex' flexDirection='column' alignItems='center' justifyContent='center' width='100%' height='100%'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Bolt sx={{ fontSize: 45 }} color='primary' />
            <Typography color='primary' variant='h3' fontWeight={700}>MOVE</Typography>
          </Box>
          <Typography>
            Sua plataforma de deslocamento.
          </Typography>

          <Card variant='outlined' sx={{ width: '400px', maxWidth: '100%', marginTop: 6, padding: 2 }}>
            <CardContent>
              <Typography variant='h6' fontWeight={600}>
                Seja bem vindo a plataforma Move.
              </Typography>
              <Typography>
                Entre usando o seu id, senha e selecione como deseja acessar.
              </Typography>

              <LoginForm />
            </CardContent>

            <CardActions>
              <Link href='/register' title='Quero me registrar'>
                <Button variant='text' color='primary'>Quero me registrar</Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  )
}
