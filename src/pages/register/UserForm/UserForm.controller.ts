import { useState } from "react";
import { z } from "zod";

export function useUserForm() {
  const [isDisabled, setIsDisabled] = useState(true);

  const userFormSchema = z.object({
    nome: z
      .string()
      .max(50, "Permitido até 50 caracteres")
      .min(3, "Necessário pelo menos 3 caracteres"),
    numeroDocumento: z
      .string()
      .max(20, "Permitido até 20 caracteres")
      .min(2, "Necessário pelo menos 2 caracteres"),
    tipoDocumento: z
      .string()
      .max(4, "Permitido até 4 caracteres")
      .min(2, "Necessário pelo menos 2 caracteres")
      .trim()
      .toUpperCase(),
    logradouro: z
      .string()
      .max(50, "Permitido até 50 caracteres")
      .min(3, "Necessário pelo menos 3 caracteres"),
    numero: z
      .string()
      .max(10, "Permitido até 10 caracteres")
      .min(1, "Necessário pelo menos 1 caractere")
      .regex(new RegExp("[0-9]"), "É permitido apenas números"),
    bairro: z
      .string()
      .max(20, "Permitido até 20 caracteres")
      .min(5, "Necessário pelo menos 5 caracteres"),
    cidade: z
      .string()
      .max(20, "Permitido até 20 caracteres")
      .min(5, "Necessário pelo menos 5 caracteres"),
    uf: z
      .string()
      .max(2, "Permitido até 2 caracteres")
      .min(2, "Necessário ter 2 caracteres")
      .trim()
      .toUpperCase(),
  });

  const defaultUserValues = {
    nome: "",
    numeroDocumento: "",
    tipoDocumento: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  };

  function handleAbleDisableForm(state?: boolean) {
    setIsDisabled(state ?? !isDisabled);
  }

  return {
    userFormSchema,
    defaultUserValues,
    isDisabled,
    handleAbleDisableForm,
  };
}
