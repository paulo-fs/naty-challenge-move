import React from "react";

export function useStartDisplacementModal() {
  const [isStartModalOpen, setIsStartModalOpen] = React.useState(false);
  const [isSuccessStart, setIsSuccessStart] = React.useState(false);

  function handleStartModal() {
    setIsStartModalOpen(!isStartModalOpen);
  }

  function handleSuccessStart(state: boolean) {
    setIsSuccessStart(state);
  }

  return {
    isStartModalOpen,
    handleStartModal,
    isSuccessStart,
    handleSuccessStart,
  };
}
