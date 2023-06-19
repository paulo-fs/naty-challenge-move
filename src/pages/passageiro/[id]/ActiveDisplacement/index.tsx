import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

interface ActiveDisplacementProps {
  handleFinishDisplacement: () => Promise<void>
}

export function ActiveDisplacement({
  handleFinishDisplacement
}: ActiveDisplacementProps) {
  return (
    <Box marginTop={4}>
      <Typography paddingX={2} variant="h6" fontWeight='bold' sx={{
        animation: '2s infinite fade-in-out',
        '@keyframes fade-in-out': {
          '0%': {
            opacity: 1
          },
          '50%': {
            opacity: 0.2
          },
          '100%': {
            opacity: 1
          },
        }
      }}>
        Deslocamento em andamento
      </Typography>

      <Grid container marginTop={1}>
        <Grid item sm={6} paddingX={2}>
          <Card variant="outlined">
            <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box>
                <Typography>
                  Início do deslocamento
                </Typography>
                <Typography variant="h5">
                  10:00
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Tempo decorrido
                </Typography>
                <Typography variant="h5">
                  01:00
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      <Grid item sm={6} paddingX={2}>
        <Card elevation={0} sx={{ height: '100%' }}>
          <CardActions>
            <Button variant="contained" onClick={handleFinishDisplacement}>
              Finalizar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
    </Box>
  )
}
