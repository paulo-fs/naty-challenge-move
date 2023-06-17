import { axiosApi } from "@/lib/axios";
import { useRouter } from "next/router";
import React from "react";

export function useLoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [radioGroupValue, setRadioGroupValue] = React.useState("passageiro");
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    title: "",
    message: "",
    error: false,
  });

  const router = useRouter();
  const isDisabled = userId.length === 0 || password.length === 0;

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  function handleRadioGroupChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRadioGroupValue((event.target as HTMLInputElement).value);
  }

  function handleIdInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserId(event.currentTarget.value);
  }

  function handlePasswordInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setPassword(event.currentTarget.value);
  }

  function handleModalClose() {
    setIsModalOpen((state) => !state);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isDisabled) return;
    const requestUrl =
      radioGroupValue === "passageiro"
        ? `/Cliente/${userId}`
        : `/Condutor/${userId}`;

    try {
      await axiosApi.get(requestUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return router.push(`/${radioGroupValue}/${userId}`);
    } catch (err) {
      setModalContent({
        title: "Ops!",
        message: "Usuário ou senha inválidos. Por favor, tente novamente.",
        error: true,
      });
      setIsModalOpen(true);
    }
  }

  return {
    showPassword,
    radioGroupValue,
    userId,
    password,
    isModalOpen,
    modalContent,
    isDisabled,
    handleClickShowPassword,
    handlePasswordInputChange,
    handleIdInputChange,
    handleModalClose,
    handleMouseDownPassword,
    handleRadioGroupChange,
    handleSubmit,
  };
}
