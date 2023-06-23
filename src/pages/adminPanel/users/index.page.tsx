import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import { HeaderMenu, MyTable } from "@/components";

import { getAllUsers } from "@/services/requests/user.request";
import { IUser } from "@/dataTypes/passanger.dto";
import { useUserPanel } from "./userPanel.controller";

export default function UsersPanel({ users } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    menuLinks,
    tableHead,
    tableData,
  } = useUserPanel(users)

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
              Relatório de usuários
            </Typography>
            <Typography variant="body1">
              Dados dos usuários da plataforma Move.
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
  users: IUser[] | null
}> = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=49"
  );

  try {
    const { users } = await getAllUsers()
    return {
      props: {
        users
      },
    }
  } catch (err: any) {
    return {
      props: {
        users: null
      },
    }
  };
};
