import { IVehicle, IVehicleUpdate } from "@/dataTypes/vehicle.dto";
import {
  deleteVehicle,
  getVehicleById,
  updateVehicle,
} from "@/services/requests/vehicle.request";
import React from "react";
import { useFormModal } from "@/components/FormModal/FormModal.controller";
import { useVehicleForm } from "./register/VehicleForm/VehicleForm.controller";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { useConfirmModal } from "@/components/ConfirmModal/ConfirmModal.controller";

export function useVeiclePanel(vehicles: IVehicle[] | null) {
  const router = useRouter();
  const [vehicleId, setVehicleId] = React.useState("");

  const { isFormModalOpen, handleOpenCloseFormModal } = useFormModal();
  const { confirmModalState, handleCloseConfirmModal, setConfirmModal } =
    useConfirmModal();
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VehicleRegisterFormData>({
    resolver: zodResolver(vehicleFormSchema),
  });

  const tableHead = [
    { label: "id" },
    { label: "placa" },
    { label: "Marca/Modelo" },
    { label: "Ano" },
    { label: "Kilometragem" },
  ];

  const tableActions = [
    {
      label: "Editar",
      action: getVehicleData,
    },
    {
      label: "Excluir",
      action: openConfirmModal,
    },
  ];

  function openConfirmModal() {
    setConfirmModal("Atenção!", "Deseja excluir este veículo?");
  }

  const tableData = vehicles?.map((item) => {
    return {
      id: item.id,
      placa: item.placa,
      marcaModelo: item.marcaModelo,
      anoFabricacao: item.anoFabricacao,
      kmAtual: item.kmAtual,
    };
  });

  function setFormValues(data: IVehicle | null) {
    if (!data) return;
    setValue("marcaModelo", data.marcaModelo);
    setValue("anoFabricacao", data.anoFabricacao);
    setValue("placa", data.placa);
    setValue("kmAtual", data.kmAtual);
  }

  async function getVehicleData(id: string) {
    try {
      const { vehicle } = await getVehicleById(id);
      setVehicleId(id);
      setFormValues(vehicle);
      handleOpenCloseFormModal();
      console.log("vehicle >>>", vehicle);
    } catch (err: any) {
      console.log("error >>>>", err.message.data);
    }
  }

  async function deleteVehicleRequest() {
    try {
      await deleteVehicle({ id: vehicleId });
      console.log(vehicleId);
      handleCloseConfirmModal();
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Veículo excluído com sucesso.`,
        redirect: `/adminpanel/vehicles`,
      });
    } catch (err: any) {
      defineNotificationModalInfos({
        title: "Ops!",
        message: `Talvez este veículo já tenha sido excluído, recarregue a página.`,
        redirect: `/adminpanel/vehicles`,
      });
    }
  }

  async function submitForm(data: VehicleRegisterFormData) {
    const updatedData: IVehicleUpdate = {
      id: vehicleId,
      anoFabricacao: data.anoFabricacao,
      kmAtual: data.kmAtual,
      marcaModelo: data.marcaModelo,
    };
    try {
      await updateVehicle(updatedData);
      handleOpenCloseFormModal();
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Veículo atualizado com sucesso.`,
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
    tableHead,
    tableData,
    tableActions,
    isFormModalOpen,
    handleOpenCloseFormModal,
    handleSubmit,
    submitForm,
    isSubmitting,
    errors,
    control,
    isModalOpen,
    closeNotificationModal,
    modalInfos,
    confirmModalState,
    handleCloseConfirmModal,
    deleteVehicleRequest,
  };
}
