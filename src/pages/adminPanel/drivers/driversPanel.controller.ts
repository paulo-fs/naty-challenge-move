import { ChangeEvent, useState } from "react";

import { useConfirmModal } from "@/components/ConfirmModal/ConfirmModal.controller";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { deleteDriver } from "@/services/requests/driver.request";
import { IDriver } from "@/dataTypes/driver.dto";

export function useDriverPanel(drivers: IDriver[] | null) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [driverId, setDriverId] = useState("");

  const { confirmModalState, handleCloseConfirmModal, setConfirmModal } =
    useConfirmModal();
  const {
    isModalOpen,
    closeNotificationModal,
    defineNotificationModalInfos,
    modalInfos,
  } = useNotificationModal();

  const tableHead = [
    { label: "id" },
    { label: "Nome" },
    { label: "Habilitação" },
    { label: "Categoria" },
  ];

  const tableActions = [
    {
      label: "Excluir",
      action: openConfirmModal,
    },
  ];

  const tableData = drivers?.map((item) => {
    return {
      id: item.id,
      nome: item.nome,
      numeroHabilitacao: item.numeroHabilitacao,
      catergoriaHabilitacao: item.catergoriaHabilitacao.slice(0, 3),
    };
  });

  const filteredTableData = search();

  function search() {
    if (!searchInputValue) return;
    const result = tableData?.filter((item) => {
      return (
        item.nome.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        item.numeroHabilitacao
          .toLowerCase()
          .includes(searchInputValue.toLowerCase()) ||
        item.catergoriaHabilitacao
          .toLowerCase()
          .includes(searchInputValue.toLowerCase())
      );
    });
    return result;
  }

  function clearSearchInput() {
    setSearchInputValue("");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value);
  }

  function openConfirmModal() {
    setConfirmModal("Atenção!", "Deseja excluir este Cliente?");
  }

  async function deleteDriverRequest() {
    try {
      await deleteDriver({ id: driverId });
      handleCloseConfirmModal();
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Motorista excluído com sucesso.`,
        redirect: `/adminpanel/drivers`,
      });
    } catch (err: any) {
      handleCloseConfirmModal();
      defineNotificationModalInfos({
        title: "Ops!",
        message: `Talvez este motorista já tenha sido excluído, recarregue a página.`,
        redirect: `/adminpanel/drivers`,
      });
    }
  }

  return {
    tableHead,
    tableData,
    tableActions,
    driverId,
    setDriverId,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
    confirmModalState,
    handleCloseConfirmModal,
    deleteDriverRequest,
    isModalOpen,
    closeNotificationModal,
    modalInfos,
  };
}
