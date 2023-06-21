import { useRouter } from "next/router";
import React from "react";

export interface INotificationModalInfos {
  error?: boolean;
  title: string;
  message: string;
  redirect?: string;
}

export function useNotificationModal() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalInfos, setModalInfos] = React.useState<INotificationModalInfos>({
    error: false,
    title: "",
    message: "",
    redirect: undefined,
  });

  const router = useRouter();

  function closeNotificationModal() {
    if (modalInfos.redirect !== undefined) {
      router.replace(modalInfos.redirect);
    }
    setIsModalOpen(false);
  }

  function defineNotificationModalInfos(data: INotificationModalInfos) {
    setIsModalOpen(true);
    setModalInfos({
      error: data.error,
      title: data.title,
      message: data.message,
      redirect: data.redirect,
    });
  }

  return {
    isModalOpen,
    modalInfos,
    closeNotificationModal,
    defineNotificationModalInfos,
  };
}
