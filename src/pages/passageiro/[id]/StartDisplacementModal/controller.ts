import { useState } from "react";

export function useStartDisplacementModal() {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isSuccessStart, setIsSuccessStart] = useState(false);

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
