import { IDriver } from "@/dataTypes/driver.dto";
import React from "react";

export function useDriverPanel(drivers: IDriver[] | null) {
  const [searchInputValue, setSearchInputValue] = React.useState("");
  const tableHead = [
    { label: "id" },
    { label: "Nome" },
    { label: "Habilitação" },
    { label: "Categoria" },
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
