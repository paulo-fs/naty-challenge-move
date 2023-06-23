import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { IUser } from "@/dataTypes/passanger.dto";

export function useUserPanel(users: IUser[] | null) {
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
    { label: "N. do Documento" },
    { label: "Tipo" },
    { label: "Cidade" },
    { label: "UF" },
  ];

  const tableData = users?.map((item) => {
    return {
      id: item.id,
      nome: item.nome,
      numeroDocumento: item.numeroDocumento,
      tipoDocumento: item.tipoDocumento,
      cidade: item.cidade,
      uf: item.uf.slice(0, 3),
    };
  });

  return {
    menuLinks,
    tableHead,
    tableData,
  };
}
