import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useUserForm } from "@/pages/register/UserForm/UserForm.controller";

import { IUser, IUserUpdate } from "@/dataTypes/passanger.dto";
import { deleteUser, updateUser } from "@/services/requests/user.request";

export function useUserProfilePage(user: IUser | null) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDeleteMenu = Boolean(anchorEl);
  const router = useRouter();

  const {
    closeNotificationModal,
    defineNotificationModalInfos,
    isModalOpen,
    modalInfos,
  } = useNotificationModal();

  const { userFormSchema, isDisabled, handleAbleDisableForm } = useUserForm();

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

  type UserRegisterFormData = z.infer<typeof userFormSchema>;
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
      defineNotificationModalInfos({
        message: "Seu perfil foi excluído com sucesso. Até breve...",
        title: "Sucesso",
        redirect: "/",
      });
    }
  }

  function handleOpenDeleteMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseDeleteMenu() {
    setAnchorEl(null);
  }

  React.useEffect(() => {
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
