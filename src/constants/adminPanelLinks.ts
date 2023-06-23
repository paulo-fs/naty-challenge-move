import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";

export const menuLinks: IMenuLink[] = [
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
