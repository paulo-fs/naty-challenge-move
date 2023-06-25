import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useVehicleForm } from "./VehicleForm/VehicleForm.controller";

import { createVehicle } from "@/services/requests/vehicle.request";

export function useRegister() {
  const { vehicleFormSchema } = useVehicleForm();
  const {
    isModalOpen,
    closeNotificationModal,
    defineNotificationModalInfos,
    modalInfos,
  } = useNotificationModal();

  type VehicleRegisterFormData = z.infer<typeof vehicleFormSchema>;

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
