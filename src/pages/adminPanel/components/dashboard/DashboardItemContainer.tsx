import { Box } from "@mui/material";
import { ReactNode } from "react";

interface DashboardItemProps {
  children: ReactNode
  marginTop?: number
}

export function DashboardItemContainer({ children, marginTop }: DashboardItemProps) {
  return (
    <Box
      display='flex' gap={2}
      justifyContent='space-between' alignItems='center'
      paddingX={4} marginTop={marginTop ?? 0}
    >
      {children}
    </Box>
  )
}
