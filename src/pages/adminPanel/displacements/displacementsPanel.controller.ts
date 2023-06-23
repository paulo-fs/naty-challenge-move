import { IDisplacement } from "@/dataTypes/displacement.dto";
import React from "react";

export function useDisplacementPanel(displacements: IDisplacement[] | null) {
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const tableHead = [
    { label: "id" },
    { label: "Km Total" },
    { label: "Km Inicial" },
    { label: "Km Final" },
    { label: "Id Usuário" },
    { label: "Id Motorista" },
    { label: "Id Veículo" },
  ];

  const tableData = displacements?.map((item) => {
    const total = item.kmFinal - item.kmInicial;
    return {
      id: item.id,
      kmTotal: total < 0 ? total * -1 : total,
      kmInicial: item.kmInicial,
      kmFinal: item.kmFinal,
      idCliente: item.idCliente,
      idCondutor: item.idCondutor,
      idVeiculo: item.idVeiculo,
    };
  });

  const filteredTableData = search();

  function search() {
    if (!searchInputValue) return;
    const result = tableData?.filter((item) => {
      return (
        String(item.kmTotal).includes(searchInputValue) ||
        String(item.kmInicial).includes(searchInputValue) ||
        String(item.kmFinal).includes(searchInputValue) ||
        String(item.idCliente).includes(searchInputValue) ||
        String(item.idCondutor).includes(searchInputValue) ||
        String(item.idVeiculo).includes(searchInputValue)
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
