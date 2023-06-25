import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useMySnackBar } from "@/components/MySnackBar/MySnackBar.controller";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useStartDisplacementModal } from "./StartDisplacementModal/controller";

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
import { getAllDrivers } from "@/services/requests/driver.request";
import { getAllVehicles } from "@/services/requests/vehicle.request";

export function usePassanger(userId: string | undefined) {
  const [isLoading, setIsLoading] = useState(false);
  const [driverAndVehicleId, setCarAndVehicleId] = useState({
    driverId: "",
    vehicleId: "",
  });
  const [activeDisplacement, setActiveDisplacement] =
    useState<IDisplacementOnStore | null>(null);

  const {
    isStartModalOpen,
    handleStartModal,
    isSuccessStart,
    handleSuccessStart,
  } = useStartDisplacementModal();

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

  async function askACar() {
    setIsLoading(true);
    const vehicle = await getFirsVehicle();
    const driver = await getFirstDriver();

    const hasAProblema = !vehicle || !driver;
    if (hasAProblema) {
      handleStartModal();
      setIsLoading(false);
      return false;
    }

    setCarAndVehicleId({
      driverId: driver.id,
      vehicleId: vehicle.id,
    });
    setIsLoading(false);
    handleSuccessStart(true);
    handleStartModal();
  }

  async function getFirsVehicle() {
    try {
      const { vehicles } = await getAllVehicles();
      return vehicles?.[0];
    } catch (err: any) {
      console.log("car error >>>", err.message.data);
      return null;
    }
  }

  async function getFirstDriver() {
    try {
      const { drivers } = await getAllDrivers();
      return drivers?.[0];
    } catch (err: any) {
      console.log("driver error >>>", err.messsage.data);
      return null;
    }
  }

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
    handleStartModal();
    setIsLoading(true);

    try {
      const { displacementId } = await startDisplacement({
        idCliente: Number(userId),
        idCondutor: Number(driverAndVehicleId.driverId),
        idVeiculo: Number(driverAndVehicleId.vehicleId),
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
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFinishDisplacement() {
    if (!activeDisplacement) return;
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
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
    askACar,
    isStartModalOpen,
    handleStartModal,
    isSuccessStart,
    isLoading,
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
