import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { IDriver, IDriverUpdate } from "@/dataTypes/driver.dto";
import { useDriverForm } from "@/pages/register/DriverForm/DriverForm.controller";
import { deleteDriver, updateDriver } from "@/services/requests/driver.request";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useDriverPage(driver: IDriver | null) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
      url: `/motorista/${driver?.id}`,
    },
    {
      title: "Deslocamentos",
      url: `/motorista/deslocamento/${driver?.id}`,
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

    if (driver === null) {
      defineNotificationModalInfos({
        title: "Ops, existe algo errado",
        message:
          "Existe algo com este usuário, esta conta parece não existir, por favor, relogue e tente novamente",
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

  function handleOpenDeleteMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseDeleteMenu() {
    setAnchorEl(null);
  }

  React.useEffect(() => {
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
