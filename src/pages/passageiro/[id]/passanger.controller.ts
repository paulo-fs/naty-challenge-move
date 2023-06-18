import React from "react";

export function usePassanger() {
  const [driverName, setDriverName] = React.useState("");
  const [driverId, setDriverId] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carId, setCarId] = React.useState("");
  const isDisabled = driverName.length === 0 || carModel.length === 0;

  return {
    driverName,
    setDriverName,
    setDriverId,
    carModel,
    setCarModel,
    setCarId,
    isDisabled,
  };
}
