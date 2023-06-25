import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import {
  VehicleRegisterFormData,
  vehicleFormSchema,
} from "@/dataTypes/vehicleFormSchema";

import { createVehicle } from "@/services/requests/vehicle.request";

export function useRegister() {
  const {
    isModalOpen,
    closeNotificationModal,
    defineNotificationModalInfos,
    modalInfos,
  } = useNotificationModal();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VehicleRegisterFormData>({
    resolver: zodResolver(vehicleFormSchema),
  });

  async function submitForm(data: VehicleRegisterFormData) {
    try {
      await createVehicle(data);
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Veículo cadastrado com sucesso.`,
        redirect: `/adminpanel/vehicles`,
      });
    } catch (err: any) {
      defineNotificationModalInfos({
        title: "Ops, algo deu errado!",
        message: "Verifique os dados preenchidos.",
        error: true,
      });
    }
  }

  return {
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
