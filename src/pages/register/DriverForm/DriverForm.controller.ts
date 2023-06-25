import { useState } from "react";

export function useDriverForm() {
  const [isDisabled, setIsDisabled] = useState(true);

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
    defaultDriverValues,
    isDisabled,
    handleAbleDisableForm,
  };
}
