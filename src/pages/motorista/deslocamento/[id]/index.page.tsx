import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Container, Grid, Typography } from "@mui/material";
import { HeaderMenu, MyTable } from "@/components";

import { getDriverById } from "@/services/requests/driver.request";
import { IDriver } from "@/dataTypes/driver.dto";

import { getAllDisplacements } from "@/services/requests/displacement.request";
import { useDeslocamentoPage } from "./deslocamento.controller";
import { IDisplacement } from "@/dataTypes/displacement.dto";

export default function DriverDisplacement({ driver, displacements } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    menuLinks,
    tableHead,
    tableData,
  } = useDeslocamentoPage(driver, displacements)

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
              Deslocamentos
            </Typography>
            <Typography variant="body1">
              Aqui estão listadas todos os deslocamentos que você realizou.
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
  driver: IDriver | null;
  displacements: IDisplacement[] | null
}> = async ({ req, res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=49"
  );

  const driverId = String(params?.id);

  try {
    const { driver } = await getDriverById(driverId);
    const { displacements } = await getAllDisplacements()

    const driverDisplacements = displacements.filter(item => String(item.idCondutor) === driverId)

    return {
      props: {
        driver,
        displacements: driverDisplacements
      },
    };
  } catch (err) {
    return {
      props: {
        driver: null,
        displacements: null
      },
    };
  }
};
