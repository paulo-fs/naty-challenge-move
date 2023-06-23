import { IUser } from "@/dataTypes/passanger.dto";
import React from "react";

export function useUserPanel(users: IUser[] | null) {
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const tableHead = [
    { label: "id" },
    { label: "Nome" },
    { label: "N. do Documento" },
    { label: "Tipo" },
    { label: "Cidade" },
    { label: "UF" },
  ];

  // const tableActions = [
  //   {
  //     label: "Excluir",
  //     action: openConfirmModal,
  //   },
  // ];

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

  return {
    tableHead,
    tableData,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
  };
}
