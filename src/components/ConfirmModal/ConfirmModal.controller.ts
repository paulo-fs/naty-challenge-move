import React from "react";

export interface IConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
}

export function useConfirmModal() {
  const [confirmModalState, setConfirmModalState] =
    React.useState<IConfirmModalState>({
      isOpen: false,
      title: "",
      message: "",
    });

  function setConfirmModal(title: string, message: string) {
    setConfirmModalState({
      isOpen: true,
      title: title,
      message: message,
    });
  }

  function handleCloseConfirmModal() {
    setConfirmModalState({
      ...confirmModalState,
      isOpen: false,
    });
  }

  return {
    confirmModalState,
    setConfirmModal,
    handleCloseConfirmModal,
  };
}
