import { IDisplacement } from "@/dataTypes/displacement.dto";
import dayjs from "dayjs";
import React from "react";

export function useDisplacementPanel(displacements: IDisplacement[] | null) {
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const tableHead = [
    { label: "id" },
    { label: "Data" },
    { label: "Km Total" },
    { label: "Km Inicial" },
    { label: "Km Final" },
    { label: "Id Usuário" },
    { label: "Id Motorista" },
    { label: "Id Veículo" },
  ];

  const tableData = displacements?.map((item) => {
    const total = item.kmFinal - item.kmInicial;
    const totalPositive = total < 0 ? total * -1 : total;
    const kmResult = totalPositive === 0 ? "Alguns metros" : totalPositive;
    return {
      id: item.id,
      inicioDeslocamento: dayjs(item.inicioDeslocamento).format("DD/MM/YYYY"),
      kmTotal: kmResult,
      kmInicial: item.kmInicial ?? 0,
      kmFinal: item.kmFinal ?? 0,
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
