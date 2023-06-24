import { IDisplacementOnStore } from "@/dataTypes/displacement.dto";
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Timer } from "../Timer/Timer";

interface ActiveDisplacementProps {
  handleFinishDisplacement: () => Promise<void>
  data: IDisplacementOnStore | null
}

export function ActiveDisplacement({
  handleFinishDisplacement, data
}: ActiveDisplacementProps) {
  return (
    <Box marginTop={16}>
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
        <Grid item sm={12} paddingX={2}>
          <Card variant="outlined">
            <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box>
                <Typography>
                  Início do deslocamento
                </Typography>
                <Typography component='span' variant="h5">
                  {dayjs(data?.startDisplacement).format('DD/MM [às] HH:mm')}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Tempo decorrido
                </Typography>
                  <Timer
                    startDate={data?.startDisplacement}
                  />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      <Grid item sm={12} paddingX={2}>
        <Card elevation={0} sx={{ height: '100%' }}>
          <CardActions>
            <Button variant="contained" onClick={handleFinishDisplacement}
              sx={{ width: 300, height: 64, mx: 'auto' }}
            >
              Cheguei no meu destino
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
    </Box>
  )
}
