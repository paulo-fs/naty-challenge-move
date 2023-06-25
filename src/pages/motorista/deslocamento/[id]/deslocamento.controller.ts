import { ChangeEvent, useState } from "react";
import dayjs from "dayjs";

import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { IDisplacement } from "@/dataTypes/displacement.dto";
import { IDriver } from "@/dataTypes/driver.dto";

export function useDeslocamentoPage(
  driver: IDriver | null,
  displacements: IDisplacement[] | null
) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const menuLinks: IMenuLink[] = [
    {
      title: "Perfil",
      url: `motorista/${driver?.id}`,
    },
    {
      title: "Deslocamentos",
      url: `motorista/deslocamento/${driver?.id}`,
    },
  ];

  const tableHead = [
    { label: "id" },
    { label: "Data" },
    { label: "Total Percorrido (km)" },
    { label: "Km Inicial" },
    { label: "Km Final" },
  ];

  const tableData = displacements?.map((item) => {
    const total = item.kmFinal - item.kmInicial;
    const totalPositive = total < 0 ? total * -1 : total;
    const kmResult = totalPositive === 0 ? "Alguns metros" : totalPositive;
    return {
      id: item.id,
      data: dayjs(item.inicioDeslocamento).format("DD/MM/YYYY"),
      kmTotal: kmResult,
      kmInicial: item.kmInicial ?? 0,
      kmFinal: item.kmFinal ?? 0,
    };
  });

  const filteredTableData = search();

  function search() {
    if (!searchInputValue) return;
    const result = tableData?.filter((item) => {
      return (
        item.data.includes(searchInputValue) ||
        String(item.kmTotal).includes(searchInputValue) ||
        String(item.kmInicial).includes(searchInputValue) ||
        String(item.kmFinal).includes(searchInputValue)
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

  return {
    menuLinks,
    tableHead,
    tableData,
    filteredTableData,
    searchInputValue,
    handleSearch,
    clearSearchInput,
  };
}
