import React from "react";
import { z } from "zod";

export function useVehicleForm() {
  const [isDisabled, setIsDisabled] = React.useState(true);

  const vehicleFormSchema = z.object({
    marcaModelo: z
      .string()
      .min(2, "É necessário ter pelo menos 3 caracteres")
      .max(30, "É permitido apenas 30 caracteres para nome"),
    anoFabricacao: z
      .string()
      .min(2, "Necessário ter pelo menos 2 caracteres")
      .max(4, "É permitido apenas 4 caracteres para documento")
      .regex(new RegExp("[0-9]"), "É permitido apenas números")
      .transform((value) => Number(value)),
    placa: z
      .string()
      .min(5, "Necessário ter pelo menos 5 caractere")
      .max(8, "Máximo de 8 caracteres"),
    kmAtual: z
      .string()
      .min(1, "Se não possui kilometragem, preencha com 0.")
      .max(7, "Este veículo está inadequado para o uso na plataforma")
      .regex(new RegExp("[0-9]"), "É permitido apenas números")
      .transform((value) => Number(value)),
  });

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
    vehicleFormSchema,
    defaultVehicleFormSchema,
    isDisabled,
    handleAbleDisableForm,
  };
}
