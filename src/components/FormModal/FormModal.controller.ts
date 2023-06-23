import React from "react";

export function useFormModal() {
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);

  function handleOpenCloseFormModal() {
    setIsFormModalOpen(!isFormModalOpen);
  }

  return {
    isFormModalOpen,
    handleOpenCloseFormModal,
  };
}
