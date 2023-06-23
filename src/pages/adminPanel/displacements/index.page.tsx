import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Container, Grid, Typography } from "@mui/material";
import { HeaderMenu, MyTable, SearchInput } from "@/components";

import { useDisplacementPanel } from "./displacementsPanel.controller";
import { getAllDisplacements } from "@/services/requests/displacement.request";
import { IDisplacement } from "@/dataTypes/displacement.dto";
import { menuLinks } from "@/constants/adminPanelLinks";

export default function DisplacementsPanel({ displacements } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    tableHead,
    tableData,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
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
