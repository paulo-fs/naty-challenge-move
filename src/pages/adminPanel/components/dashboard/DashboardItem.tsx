import { Box, Typography } from "@mui/material";

interface DashboardItemProps {
  title: string
  value: string | number
}

export function DashboardItem(props: DashboardItemProps) {
  const { title, value } = props
  return (
    <>
      <Typography variant="h5" color='gray'>{title}</Typography>
      <Box borderBottom={1} width='100%' borderColor='gray' mt={1} />
      <Typography variant="h5" color='primary'>{value}</Typography>
    </>
  )
}
