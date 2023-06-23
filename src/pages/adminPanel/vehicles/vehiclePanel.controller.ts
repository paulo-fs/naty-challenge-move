import { IVehicle } from "@/dataTypes/vehicle.dto";

export function useVeiclePanel(vehicles: IVehicle[] | null) {
  const tableHead = [
    { label: "id" },
    { label: "placa" },
    { label: "Marca/Modelo" },
    { label: "Ano" },
    { label: "Kilometragem" },
  ];

  const tableData = vehicles?.map((item) => {
    return {
      id: item.id,
      placa: item.placa,
      marcaModelo: item.marcaModelo,
      anoFabricacao: item.anoFabricacao,
      kmAtual: item.kmAtual,
    };
  });

  return {
    tableHead,
    tableData,
  };
}
