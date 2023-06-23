import { IDisplacement } from "@/dataTypes/displacement.dto";

export function useDisplacementPanel(displacements: IDisplacement[] | null) {
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

  return {
    tableHead,
    tableData,
  };
}
