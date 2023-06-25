import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  deleteVehicle,
  getVehicleById,
  updateVehicle,
} from "@/services/requests/vehicle.request";

import { useFormModal } from "@/components/FormModal/FormModal.controller";
import { useVehicleForm } from "./register/VehicleForm/VehicleForm.controller";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { useConfirmModal } from "@/components/ConfirmModal/ConfirmModal.controller";

import { IVehicle, IVehicleUpdate } from "@/dataTypes/vehicle.dto";
import {
  VehicleRegisterFormData,
  vehicleFormSchema,
} from "@/dataTypes/vehicleFormSchema";

export function useVeiclePanel(vehicles: IVehicle[] | null) {
  const [vehicleId, setVehicleId] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const { isFormModalOpen, handleOpenCloseFormModal } = useFormModal();
  const { confirmModalState, handleCloseConfirmModal, setConfirmModal } =
    useConfirmModal();
  const {
    isModalOpen,
    closeNotificationModal,
    defineNotificationModalInfos,
    modalInfos,
  } = useNotificationModal();

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

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value);
  }

  const filteredTableData = search();

  function search() {
    if (!searchInputValue) return;
    const result = tableData?.filter((item) => {
      return (
        item.placa.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        item.marcaModelo
          .toLowerCase()
          .includes(searchInputValue.toLowerCase()) ||
        String(item.anoFabricacao).includes(searchInputValue) ||
        String(item.kmAtual).includes(searchInputValue)
      );
    });
    return result;
  }

  function clearSearchInput() {
    setSearchInputValue("");
  }

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
      handleCloseConfirmModal();
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Veículo excluído com sucesso.`,
        redirect: `/adminpanel/vehicles`,
      });
    } catch (err: any) {
      handleCloseConfirmModal();
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
    setVehicleId,
    vehicleId,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
  };
}
