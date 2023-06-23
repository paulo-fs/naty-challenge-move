import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Container, Grid, Typography } from "@mui/material";
import { HeaderMenu, MyTable } from "@/components";

import { useDisplacementPanel } from "./displacementsPanel.controller";
import { getAllDisplacements } from "@/services/requests/displacement.request";
import { IDisplacement } from "@/dataTypes/displacement.dto";
import { menuLinks } from "@/constants/adminPanelLinks";

export default function DisplacementsPanel({ displacements } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    tableHead,
    tableData,
  } = useDisplacementPanel(displacements)

  return (
    <>
      <HeaderMenu
        pages={menuLinks}
      />
      <Container maxWidth='xl'>
        {/* head description */}
        <Grid container marginTop={14} >
          <Grid item sm={6} padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Relatório de deslocamentos
            </Typography>
            <Typography variant="body1">
              Dados dos deslocamentos realizados utilizando a plataforma Move.
            </Typography>
          </Grid>
        </Grid>

        {/* content */}
        <Grid container marginTop={4} paddingX={4}>
          <MyTable
            tableHead={tableHead}
            data={tableData ?? []}
          />
        </Grid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  displacements: IDisplacement[] | null
}> = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=49"
  );

  try {
    const { displacements } = await getAllDisplacements()
    return {
      props: {
        displacements
      },
    }
  } catch (err: any) {
    return {
      props: {
        displacements: null
      },
    }
  };
};
