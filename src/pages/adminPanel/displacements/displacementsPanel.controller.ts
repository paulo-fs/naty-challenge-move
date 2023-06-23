import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { IDisplacement } from "@/dataTypes/displacement.dto";

export function useDisplacementPanel(displacements: IDisplacement[] | null) {
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
    menuLinks,
    tableHead,
    tableData,
  };
}
