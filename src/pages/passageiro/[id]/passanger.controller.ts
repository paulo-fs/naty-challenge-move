import { startDisplacement } from "@/services/requests/displacement.request";
import React from "react";

export function usePassanger(userId: string | undefined) {
  const [driverName, setDriverName] = React.useState("");
  const [driverId, setDriverId] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carId, setCarId] = React.useState("");

  const [displacementId, setDisplacementId] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const isDisabled = driverName.length === 0 || carModel.length === 0;

  async function handleStartDisplacement() {
    if (userId === undefined || driverId.length === 0 || carId.length === 0)
      return;

    try {
      const { displacementId } = await startDisplacement({
        idCliente: Number(userId),
        idCondutor: Number(driverId),
        idVeiculo: Number(carId),
      });
      setDisplacementId(displacementId);
    } catch (err: any) {
      const message =
        err.response.data ??
        "Um erro desconhecido ocorreu, tente novamente mais tarde.";
      setErrorMessage(message);
      setIsModalOpen(true);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(!isModalOpen);
  }

  return {
    driverName,
    setDriverName,
    setDriverId,
    carModel,
    setCarModel,
    setCarId,
    isDisabled,
    handleStartDisplacement,
    errorMessage,
    isModalOpen,
    handleCloseModal,
  };
}
