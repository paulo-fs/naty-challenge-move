import { IDriver } from "@/dataTypes/driver.dto";

export function useDriverPanel(drivers: IDriver[] | null) {
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

  return {
    tableHead,
    tableData,
  };
}
