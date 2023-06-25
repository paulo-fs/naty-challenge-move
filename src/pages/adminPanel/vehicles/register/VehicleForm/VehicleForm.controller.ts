import { useState } from "react";

export function useVehicleForm() {
  const [isDisabled, setIsDisabled] = useState(true);

  const defaultVehicleFormSchema = {
    marcaModelo: "",
    anoFabricacao: 0,
    placa: "",
    kmAtual: 0,
  };

  function handleAbleDisableForm(state?: boolean) {
    setIsDisabled(state ?? !isDisabled);
  }

  return {
    defaultVehicleFormSchema,
    isDisabled,
    handleAbleDisableForm,
  };
}
