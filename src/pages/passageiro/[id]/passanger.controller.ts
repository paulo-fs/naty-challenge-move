import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { useMySnackBar } from "@/components/MySnackBar/MySnackBar.controller";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { IDisplacementOnStore } from "@/dataTypes/displacement.dto";
import {
  recoverDisplacementOnStore,
  removeDisplacementOnStore,
  saveDisplacementOnStore,
} from "@/helpers/displacementStore";
import {
  finishDisplacement,
  getDisplacementById,
  startDisplacement,
} from "@/services/requests/displacement.request";
import { useRouter } from "next/router";
import React from "react";

export function usePassanger(userId: string | undefined) {
  const [driverName, setDriverName] = React.useState("");
  const [driverId, setDriverId] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carId, setCarId] = React.useState("");
  const [activeDisplacement, setActiveDisplacement] =
    React.useState<IDisplacementOnStore | null>(null);

  const {
    closeNotificationModal,
    defineNotificationModalInfos,
    isModalOpen,
    modalInfos,
  } = useNotificationModal();
  const {
    isSnackbarOpen,
    snackbarInfos,
    handleMySnackBar,
    defineMySnackbarInfos,
  } = useMySnackBar();

  const router = useRouter();
  const isDisabled = driverName.length === 0 || carModel.length === 0;

  async function getActiveDisplacement(id: string) {
    try {
      const { displacement } = await getDisplacementById(id);
      defineMySnackbarInfos({
        type: "success",
        message: "Deslocamento iniciado com sucesso.",
      });
      const currentDisplacement = {
        id: displacement.id,
        userId: displacement.idCliente,
        startDisplacement: displacement.inicioDeslocamento,
        endDisplacement: displacement.fimDeslocamento,
      };
      saveDisplacementOnStore(currentDisplacement);
      setActiveDisplacement(currentDisplacement);
    } catch (err: any) {
      removeDisplacementOnStore(userId!);
      setActiveDisplacement(null);
    }
  }

  async function handleStartDisplacement() {
    if (userId === undefined || driverId.length === 0 || carId.length === 0)
      return;

    try {
      const { displacementId } = await startDisplacement({
        idCliente: Number(userId),
        idCondutor: Number(driverId),
        idVeiculo: Number(carId),
      });
      getActiveDisplacement(displacementId);
    } catch (err: any) {
      const message =
        err.response.data ??
        "Um erro desconhecido ocorreu, tente novamente mais tarde.";
      defineNotificationModalInfos({
        message: message + " Recarregue a página e tente novamente.",
        title: "Ops, algo deu errado",
        error: true,
      });
      removeDisplacementOnStore(userId!);
      setActiveDisplacement(null);
    }
  }

  async function handleFinishDisplacement() {
    if (!activeDisplacement) return;

    try {
      await finishDisplacement({
        id: activeDisplacement.id,
        startTime: activeDisplacement.startDisplacement,
      });
      removeDisplacementOnStore(userId!);
      setActiveDisplacement(null);
      defineMySnackbarInfos({
        type: "success",
        message: "Deslocamento finalizado com sucesso.",
      });
    } catch (err: any) {
      const message =
        err.response.data ??
        "Um erro desconhecido ocorreu, tente novamente mais tarde.";
      removeDisplacementOnStore(userId!);
      defineNotificationModalInfos({
        message: message + " Recarregue a página e tente novamente.",
        title: "Ops, algo deu errado",
        error: true,
      });
    }
  }

  React.useEffect(() => {
    if (userId === undefined) {
      router.replace("/");
      return;
    }
    if (activeDisplacement) return;
    const displacementOnStore = recoverDisplacementOnStore(userId);
    if (displacementOnStore) {
      setActiveDisplacement(displacementOnStore);
      getActiveDisplacement(displacementOnStore.id);
    }
  }, [userId]);

  return {
    driverName,
    setDriverName,
    setDriverId,
    carModel,
    setCarModel,
    setCarId,
    isDisabled,
    handleStartDisplacement,
    activeDisplacement,
    handleFinishDisplacement,
    closeNotificationModal,
    isModalOpen,
    modalInfos,
    isSnackbarOpen,
    snackbarInfos,
    handleMySnackBar,
  };
}
