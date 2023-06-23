import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { IDriver } from "@/dataTypes/driver.dto";

export function useDriverPanel(drivers: IDriver[] | null) {
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
    menuLinks,
    tableHead,
    tableData,
  };
}
