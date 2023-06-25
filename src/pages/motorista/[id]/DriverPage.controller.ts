import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { IDriver, IDriverUpdate } from "@/dataTypes/driver.dto";

import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useDriverForm } from "@/pages/register/DriverForm/DriverForm.controller";

import { deleteDriver, updateDriver } from "@/services/requests/driver.request";

export function useDriverPage(driver: IDriver | null) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDeleteMenu = Boolean(anchorEl);
  const router = useRouter();

  const {
    closeNotificationModal,
    defineNotificationModalInfos,
    isModalOpen,
    modalInfos,
  } = useNotificationModal();

  const menuLinks: IMenuLink[] = [
    {
      title: "Perfil",
      url: `motorista/${driver?.id}`,
    },
    {
      title: "Deslocamentos",
      url: `motorista/deslocamento/${driver?.id}`,
    },
  ];

  const { driverFormSchema, isDisabled, handleAbleDisableForm } =
    useDriverForm();

  const defaultDriverValues = {
    nome: driver?.nome,
    numeroHabilitacao: driver?.numeroHabilitacao,
    categoriaHabilitacao: driver?.catergoriaHabilitacao,
    vencimentoHabilitacao: dayjs(driver?.vencimentoHabilitacao!).format(
      "YYYY-MM-DD"
    ),
  };

  type DriveRegisterFormData = z.infer<typeof driverFormSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DriveRegisterFormData>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: defaultDriverValues,
  });

  async function updateDriverInfos(data: DriveRegisterFormData) {
    const updatedData: IDriverUpdate = {
      id: driver?.id ?? "",
      categoriaHabilitacao: data.categoriaHabilitacao,
      vencimentoHabilitacao: data.vencimentoHabilitacao,
    };

    if (!driver) {
      defineNotificationModalInfos({
        title: "Ops, existe algo errado",
        message:
          "Existe algo de errado com este usuário, esta conta parece não existir, por favor, relogue e tente novamente",
        error: true,
        redirect: "/",
      });
    }

    try {
      await updateDriver(updatedData);
      defineNotificationModalInfos({
        title: "Sucesso",
        message: "Seus dados foram atualizados.",
        redirect: `/motorista/${driver!.id}`,
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

  async function deleteThisDriver() {
    const { id } = driver!;
    try {
      await deleteDriver({ id });
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

  function handleOpenDeleteMenu(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseDeleteMenu() {
    setAnchorEl(null);
  }

  useEffect(() => {
    if (!driver) router.replace("/");
  }, []);

  return {
    menuLinks,
    control,
    handleSubmit,
    updateDriverInfos,
    deleteThisDriver,
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
