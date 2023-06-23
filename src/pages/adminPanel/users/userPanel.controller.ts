import { useConfirmModal } from "@/components/ConfirmModal/ConfirmModal.controller";
import { useNotificationModal } from "@/components/NotificationModal/NotificationModal.controller";
import { IUser } from "@/dataTypes/passanger.dto";
import { deleteUser } from "@/services/requests/user.request";
import React from "react";

export function useUserPanel(users: IUser[] | null) {
  const [searchInputValue, setSearchInputValue] = React.useState("");
  const [userId, setUserId] = React.useState("");

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
    { label: "N. do Documento" },
    { label: "Tipo" },
    { label: "Cidade" },
    { label: "UF" },
  ];

  const tableActions = [
    {
      label: "Excluir",
      action: openConfirmModal,
    },
  ];

  const tableData = users?.map((item) => {
    return {
      id: item.id,
      nome: item.nome,
      numeroDocumento: item.numeroDocumento,
      tipoDocumento: item.tipoDocumento,
      cidade: item.cidade,
      uf: item.uf.slice(0, 3),
    };
  });

  const filteredTableData = search();

  function search() {
    if (!searchInputValue) return;
    const result = tableData?.filter((item) => {
      return (
        item.nome.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        item.numeroDocumento
          .toLowerCase()
          .includes(searchInputValue.toLowerCase()) ||
        item.tipoDocumento
          .toLowerCase()
          .includes(searchInputValue.toLowerCase()) ||
        item.cidade.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        item.uf.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    });
    return result;
  }

  function clearSearchInput() {
    setSearchInputValue("");
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value);
  }

  function openConfirmModal() {
    setConfirmModal("Atenção!", "Deseja excluir este Cliente?");
  }

  async function deleteUserRequest() {
    try {
      await deleteUser({ id: userId });
      handleCloseConfirmModal();
      defineNotificationModalInfos({
        title: "Sucesso!",
        message: `Usuário excluído com sucesso.`,
        redirect: `/adminpanel/users`,
      });
    } catch (err: any) {
      handleCloseConfirmModal();
      defineNotificationModalInfos({
        title: "Ops!",
        message: `Talvez este usuário já tenha sido excluído, recarregue a página.`,
        redirect: `/adminpanel/users`,
      });
    }
  }

  return {
    tableHead,
    tableData,
    tableActions,
    userId,
    setUserId,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
    confirmModalState,
    handleCloseConfirmModal,
    deleteUserRequest,
    isModalOpen,
    closeNotificationModal,
    modalInfos,
  };
}
