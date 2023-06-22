import { IMenuLink } from "@/components/HeaderMenu/HeaderMenu.props";
import { IDisplacement } from "@/dataTypes/displacement.dto";
import { IDriver } from "@/dataTypes/driver.dto";

export function useDeslocamentoPage(
  driver: IDriver | null,
  displacements: IDisplacement[] | null
) {
  const menuLinks: IMenuLink[] = [
    {
      title: "Perfil",
      url: `motorista/${driver?.id}`,
    },
    {
      title: "Deslocamentos",
      url: `motorista/deslocamento/${driver?.id}`,
    },
  ];

  const tableHead = [
    { label: "id" },
    { label: "Data" },
    { label: "Total Percorrido (km)" },
    { label: "Km Inicial" },
    { label: "Km Final" },
  ];

  const tableData = displacements?.map((item) => {
    const total = item.kmFinal - item.kmInicial;
    return {
      id: item.id,
      data: item.inicioDeslocamento,
      kmTotal: total < 0 ? total * -1 : total,
      kmInicial: item.kmInicial,
      kmFinal: item.kmFinal,
    };
  });

  return {
    menuLinks,
    tableHead,
    tableData,
  };
}
