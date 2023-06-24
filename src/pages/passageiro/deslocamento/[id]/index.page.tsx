import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Container, Grid, Typography } from "@mui/material";
import { HeaderMenu, MyTable, SearchInput } from "@/components";

import { IDisplacement } from "@/dataTypes/displacement.dto";
import { IUser } from "@/dataTypes/passanger.dto";
import { getUserById } from "@/services/requests/user.request";

import { getAllDisplacements } from "@/services/requests/displacement.request";
import { useDeslocamentoPage } from "./deslocamento.controller";
import { userMenuLinks } from "@/constants/userMenuLinks";

export default function DriverDisplacement({ user, displacements } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    tableHead,
    tableData,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
  } = useDeslocamentoPage(user, displacements)

  return (
    <>
      <HeaderMenu
        pages={userMenuLinks(user?.id!)}
      />
      <Container maxWidth='xl'>
        {/* head description */}
        <Grid container marginTop={14} >
          <Grid padding={2}>
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
  user: IUser | null;
  displacements: IDisplacement[] | null
}> = async ({ req, res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=30"
  );

  const userId = String(params?.id);

  try {
    const { user } = await getUserById(userId);
    const { displacements } = await getAllDisplacements()

    const driverDisplacements = displacements.filter(item => String(item.idCliente) === userId)

    return {
      props: {
        user,
        displacements: driverDisplacements
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
        displacements: null
      },
    };
  }
};
