import React from "react";

export interface INotificationModalInfos {
  error?: boolean;
  title: string;
  message: string;
}

export function useNotificationModal() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalInfos, setModalInfos] = React.useState<INotificationModalInfos>({
    error: false,
    title: "",
    message: "",
  });

  function closeNotificationModal() {
    setIsModalOpen(false);
  }

  function defineNotificationModalInfos(data: INotificationModalInfos) {
    setIsModalOpen(true);
    setModalInfos({
      error: data.error,
      title: data.title,
      message: data.message,
    });
  }

  return {
    isModalOpen,
    modalInfos,
    closeNotificationModal,
    defineNotificationModalInfos,
  };
}
