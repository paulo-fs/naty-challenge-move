import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { IDriver } from "@/dataTypes/driver.dto";
import { IVehicle } from "@/dataTypes/vehicle.dto";

export function useVeiclePanel(vehicles: IVehicle[] | null) {
  const menuLinks: IMenuLink[] = [
    {
      title: "Painel",
      url: "adminpanel",
    },
    {
      title: "Clientes",
      url: "adminpanel/users",
    },
    {
      title: "Motoristas",
      url: "adminpanel/drivers",
    },
    {
      title: "Deslocamentos",
      url: "adminpanel/displacements",
    },
    {
      title: "Veículos",
      url: "adminpanel/vehicles",
    },
  ];

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
    menuLinks,
    tableHead,
    tableData,
  };
}
