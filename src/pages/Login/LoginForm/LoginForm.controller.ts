import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useRadioGroupClientDriver } from "@/components/RadioGroupClientDriver/RadioGroupClientDriver.controller";
import { axiosApi } from "@/lib/axios";
import { useRouter } from "next/router";
import React from "react";

export function useLoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { radioGroupValue, handleRadioGroupChange } =
    useRadioGroupClientDriver();

  const {
    closeNotificationModal,
    defineNotificationModalInfos,
    isModalOpen,
    modalInfos,
  } = useNotificationModal();

  const router = useRouter();
  const isDisabled = userId.length === 0 || password.length === 0;

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  function handleIdInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserId(event.currentTarget.value);
  }

  function handlePasswordInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setPassword(event.currentTarget.value);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isDisabled) return;
    const requestUrl =
      radioGroupValue === "passageiro"
        ? `/Cliente/${userId}`
        : `/Condutor/${userId}`;

    try {
      await axiosApi.get(requestUrl);
      return router.push(`/${radioGroupValue}/${userId}`);
    } catch (err) {
      defineNotificationModalInfos({
        title: "Ops, algo deu errado!",
        message: "Usuário ou senha inválidos. Por favor, tente novamente.",
        error: true,
      });
    }
  }

  return {
    showPassword,
    radioGroupValue,
    userId,
    password,
    isDisabled,
    closeNotificationModal,
    isModalOpen,
    modalInfos,
    handleClickShowPassword,
    handlePasswordInputChange,
    handleIdInputChange,
    handleMouseDownPassword,
    handleRadioGroupChange,
    handleSubmit,
  };
}
