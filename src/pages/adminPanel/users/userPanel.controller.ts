import { IUser } from "@/dataTypes/passanger.dto";

export function useUserPanel(users: IUser[] | null) {
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
    tableHead,
    tableData,
  };
}
