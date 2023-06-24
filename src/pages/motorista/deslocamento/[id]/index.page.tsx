import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Container, Grid, Typography } from "@mui/material";
import { HeaderMenu, MyTable, SearchInput } from "@/components";

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
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
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
          <Grid item xs={12}>
            <SearchInput
              clearSearchInput={clearSearchInput}
              handleSearch={handleSearch}
              searchInputValue={searchInputValue}
            />
          </Grid>

          <MyTable
            tableHead={tableHead}
            data={filteredTableData ?? tableData ?? []}
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
    "public, s-maxage=10, stale-while-revalidate=30"
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
