import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";

export function useAdminPanel() {
  const menuLinks: IMenuLink[] = [
    {
      title: "Painel",
      url: '/adminpanel',
    },
    {
      title: "Clientes",
      url: '/adminpanel/users',
    },
    {
      title: "Motoristas",
      url: '/adminpanel/drivers',
    },
    {
      title: "Deslocamentos",
      url: '/adminpanel/displacements',
    },
    {
      title: "Veículos",
      url: '/adminpanel/vehicles',
    },
  ];

  return {
    menuLinks,
  }
}
