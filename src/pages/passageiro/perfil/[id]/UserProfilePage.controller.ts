import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useUserForm } from "@/pages/register/UserForm/UserForm.controller";

import { IUser, IUserUpdate } from "@/dataTypes/passanger.dto";
import { deleteUser, updateUser } from "@/services/requests/user.request";
import { MouseEvent, useEffect, useState } from "react";
import {
  UserRegisterFormData,
  userFormSchema,
} from "@/dataTypes/userFormSchema";

export function useUserProfilePage(user: IUser | null) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDeleteMenu = Boolean(anchorEl);
  const router = useRouter();

  const {
    closeNotificationModal,
    defineNotificationModalInfos,
    isModalOpen,
    modalInfos,
  } = useNotificationModal();

  const { isDisabled, handleAbleDisableForm } = useUserForm();

  const defaultUserValues = {
    nome: user?.nome,
    numeroDocumento: user?.numeroDocumento,
    tipoDocumento: user?.tipoDocumento,
    logradouro: user?.logradouro,
    numero: user?.numero,
    bairro: user?.bairro,
    cidade: user?.cidade,
    uf: user?.uf,
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultUserValues,
  });

  async function updateUserInfos(data: UserRegisterFormData) {
    const updatedData: IUserUpdate = {
      id: user?.id ?? "",
      nome: data.nome,
      bairro: data.bairro,
      cidade: data.cidade,
      logradouro: data.logradouro,
      numero: data.numero,
      uf: data.uf,
    };

    if (!user) {
      defineNotificationModalInfos({
        title: "Ops, existe algo errado",
        message:
          "Existe algo de errado com este usuário, esta conta parece não existir, por favor, relogue e tente novamente",
        error: true,
        redirect: "/",
      });
    }

    try {
      await updateUser(updatedData);
      defineNotificationModalInfos({
        title: "Sucesso",
        message: "Seus dados foram atualizados.",
        redirect: `/passageiro/perfil/${user!.id}`,
      });
      handleAbleDisableForm();
    } catch (err: any) {
      defineNotificationModalInfos({
        title: "Ops, alguma coisa deu errado",
        message: "Confira as informações e tente novamente",
        error: true,
      });
    }
  }

  async function deleteThisUser() {
    const { id } = user!;
    try {
      await deleteUser({ id });
      defineNotificationModalInfos({
        message: "Seu perfil foi excluído com sucesso. Até breve...",
        title: "Sucesso",
        redirect: "/",
      });
    } catch (err: any) {
      const unknowError =
        err.response.data ===
        "An error occurred while updating the entries. See the inner exception for details.";

      defineNotificationModalInfos({
        message: unknowError
          ? "Houve um erro desconhecido, se ele persistir, entre em contato com o atendimento"
          : "Houve um erro na exclusão do seu cadastro, confirme ele realmente existe. Saia da aplicacação e tente entrar novamente.",
        title: "Ops...",
        error: true,
      });
    }
  }

  function handleOpenDeleteMenu(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseDeleteMenu() {
    setAnchorEl(null);
  }

  useEffect(() => {
    if (!user) router.replace("/");
  }, []);

  return {
    control,
    handleSubmit,
    updateUserInfos,
    deleteThisUser,
    errors,
    isSubmitting,
    isDisabled,
    handleAbleDisableForm,
    openDeleteMenu,
    anchorEl,
    handleOpenDeleteMenu,
    handleCloseDeleteMenu,
    closeNotificationModal,
    isModalOpen,
    modalInfos,
  };
}
