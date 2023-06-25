import dayjs from "dayjs";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Timer } from "../Timer/Timer";
import { IDisplacementOnStore } from "@/dataTypes/displacement.dto";

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
            <CardContent>
              <Grid container rowSpacing={4}>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                  <Typography>
                    Início do deslocamento
                  </Typography>
                  <Typography component='span' variant="h5">
                    {dayjs(data?.startDisplacement).format('DD/MM [às] HH:mm')}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                  <Typography>
                    Tempo decorrido
                  </Typography>
                    <Timer
                      startDate={data?.startDisplacement}
                    />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      <Grid item paddingX={2} mt={4} mx='auto'>
        <Button variant="contained" onClick={handleFinishDisplacement}
          sx={{ width: '100%', maxWidth: 300, height: 64 }}
          fullWidth
        >
          Cheguei no meu destino
        </Button>
      </Grid>
    </Grid>
    </Box>
  )
}
