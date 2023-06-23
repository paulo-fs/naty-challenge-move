import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { ConfirmModal, FormModal, HeaderMenu, MyTable, NotificationModal } from "@/components";

import { useVeiclePanel } from "./vehiclePanel.controller";
import { getAllVehicles } from "@/services/requests/vehicle.request";
import { IVehicle } from "@/dataTypes/vehicle.dto";
import Link from "next/link";
import { menuLinks } from "@/constants/adminPanelLinks";
import { VehicleForm } from "./register/VehicleForm/VehicleForm";

export default function VehiclesPanel({ vehicles } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    tableHead,
    tableData,
    tableActions,
    isFormModalOpen,
    handleOpenCloseFormModal,
    handleSubmit,
    submitForm,
    isSubmitting,
    errors,
    control,
    isModalOpen,
    closeNotificationModal,
    modalInfos,
    confirmModalState,
    handleCloseConfirmModal,
    deleteVehicleRequest,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
  } = useVeiclePanel(vehicles)

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
              Relatório de veículos
            </Typography>
            <Typography variant="body1">
              Dados dos veículos da plataforma Move.
            </Typography>
          </Grid>
        </Grid>

        {/* content */}
        <Grid container marginTop={4} paddingX={4}>
        <Grid item xs={8}>
            <TextField fullWidth placeholder="Busque por..." size="small"
              value={searchInputValue}
              onChange={handleSearch}
            />
          </Grid>

          <Grid item xs={2} paddingX={2} marginBottom={4}>
              <Button variant="outlined" fullWidth onClick={clearSearchInput}>
                Limpar busca
              </Button>
          </Grid>

          <Grid item xs={2}>
            <Link href='/adminpanel/vehicles/register'>
              <Button variant="contained" fullWidth>
                Cadastrar veículo
              </Button>
            </Link>
          </Grid>

          <MyTable
            tableHead={tableHead}
            data={filteredTableData ?? tableData ?? []}
            renderActions={tableActions}
          />
        </Grid>

        <FormModal
          isOpen={isFormModalOpen}
          handleModal={handleOpenCloseFormModal}
          handleSubmit={handleSubmit}
          submitFunc={submitForm}
          isSubmitting={isSubmitting}
        >
          <VehicleForm
            control={control}
            errors={errors}
            keepDisabled
          />
        </FormModal>

        <ConfirmModal
          action={deleteVehicleRequest}
          confirmModalState={confirmModalState}
          handleCloseConfirmModal={handleCloseConfirmModal}
        />

        <NotificationModal
          isModalOpen={isModalOpen}
          modalInfos={modalInfos}
          closeNotificationModal={closeNotificationModal}
        />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  vehicles: IVehicle[] | null
}> = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=30"
  );

  try {
    const { vehicles } = await getAllVehicles()
    return {
      props: {
        vehicles
      },
    }
  } catch (err: any) {
    return {
      props: {
        vehicles: null
      },
    }
  };
};
