import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRadioGroupClientDriver } from "@/components/RadioGroupClientDriver/RadioGroupClientDriver.controller";
import { useDriverForm } from "./DriverForm/DriverForm.controller";
import { useUserForm } from "./UserForm/UserForm.controller";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";

import { createDriver } from "@/services/requests/driver.request";
import { createUser } from "@/services/requests/user.request";

export function useRegister() {
  const { driverFormSchema, defaultDriverValues } = useDriverForm();
  const { userFormSchema, defaultUserValues } = useUserForm();
  const { handleRadioGroupChange, radioGroupValue } =
    useRadioGroupClientDriver();
  const {
    isModalOpen,
    closeNotificationModal,
    defineNotificationModalInfos,
    modalInfos,
  } = useNotificationModal();

  type DriveRegisterFormData = z.infer<typeof driverFormSchema>;
  type UserRegisterFormData = z.infer<typeof userFormSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DriveRegisterFormData | UserRegisterFormData>({
    resolver: zodResolver(
      radioGroupValue === "passageiro" ? userFormSchema : driverFormSchema
    ),
  });

  async function driverSubmit(data: any) {
    try {
      const { driverId } = await createDriver(data);
      reset(defaultDriverValues);
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Anote o seu ID: ${driverId}`,
        redirect: `/motorista/${driverId}`,
      });
    } catch (err: any) {
      defineNotificationModalInfos({
        title: "Ops, algo deu errado!",
        message: "Verifique os dados preenchidos.",
        error: true,
      });
    }
  }

  async function userSubmit(data: any) {
    try {
      const { newUserId } = await createUser(data);
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Anote o seu ID: ${newUserId}`,
        redirect: `/passageiro/${newUserId}`,
      });
      reset(defaultUserValues);
    } catch (err: any) {
      defineNotificationModalInfos({
        title: "Ops, algo deu errado!",
        message: "Verifique os dados preenchidos.",
        error: true,
      });
    }
  }

  async function submitForm(
    data: DriveRegisterFormData | UserRegisterFormData
  ) {
    radioGroupValue === "passageiro"
      ? await userSubmit(data)
      : await driverSubmit(data);
  }

  return {
    radioGroupValue,
    handleRadioGroupChange,
    handleSubmit,
    submitForm,
    isSubmitting,
    errors,
    control,
    isModalOpen,
    closeNotificationModal,
    modalInfos,
  };
}
