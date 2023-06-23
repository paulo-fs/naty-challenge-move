import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";

export function useAdminPanel() {
  const menuLinks: IMenuLink[] = [
    {
      title: "Painel",
      url: '/adminPanel',
    },
    {
      title: "Clientes",
      url: '/users',
    },
    {
      title: "Motoristas",
      url: '/drivers',
    },
    {
      title: "Deslocamentos",
      url: '/displacements',
    },
    {
      title: "Veículos",
      url: '/vehicles',
    },
  ];

  return {
    menuLinks,
  }
}
