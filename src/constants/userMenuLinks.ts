import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";

export function userMenuLinks(userId: string) {
  const menuLinks: IMenuLink[] = [
    {
      title: "Início",
      url: `passageiro/${userId}`,
    },
    {
      title: "Perfil",
      url: `passageiro/perfil/${userId}`,
    },
    {
      title: "Deslocamentos",
      url: `passageiro/deslocamento/${userId}`,
    },
  ];

  return menuLinks;
}
