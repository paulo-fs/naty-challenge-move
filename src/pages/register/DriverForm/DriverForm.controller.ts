import React from "react";
import { z } from "zod";

export function useDriverForm() {
  const [isDisabled, setIsDisabled] = React.useState(true);

  const driverFormSchema = z.object({
    nome: z
      .string()
      .min(3, "É necessário ter pelo menos 3 caracteres")
      .max(50, "É permitido apenas 50 caracteres para nome"),
    numeroHabilitacao: z
      .string()
      .min(3, "Necessário ter pelo menos 3 caracteres")
      .max(30, "É permitido apenas 30 caracteres para documento"),
    categoriaHabilitacao: z
      .string()
      .min(1, "Necessário ter pelo menos 1 caractere")
      .max(3, "Máximo de 3 caracteres"),
    vencimentoHabilitacao: z.coerce
      .date()
      .min(
        new Date(),
        "Sua habilitação está prestes a vencer, confira a data de validade novamente."
      )
      .max(new Date("2050-01-01"), "Data inválida")
      .transform((value) => value.toISOString()),
  });

  const defaultDriverValues = {
    nome: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: "",
  };

  function handleAbleDisableForm(state?: boolean) {
    setIsDisabled(state ?? !isDisabled);
  }

  return {
    driverFormSchema,
    defaultDriverValues,
    isDisabled,
    handleAbleDisableForm,
  };
}
