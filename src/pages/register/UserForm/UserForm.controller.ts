import { useState } from "react";

export function useUserForm() {
  const [isDisabled, setIsDisabled] = useState(true);

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
    defaultUserValues,
    isDisabled,
    handleAbleDisableForm,
  };
}
