import {
  IDisplacement,
  IDisplacementCreate,
  IDisplacementRequiredData,
} from "@/dataTypes/displacement.dto";
import { axiosApi } from "@/lib/axios";

export async function startDisplacement(
  requestData: IDisplacementRequiredData
) {
  const bodyData: IDisplacementCreate = {
    kmInicial: 0,
    inicioDeslocamento: new Date(),
    checkList: "ok",
    motivo: "inicio do deslocamento",
    observacao: requestData.observacao ?? "sem observação",
    idCondutor: requestData.idCondutor,
    idVeiculo: requestData.idVeiculo,
    idCliente: requestData.idCliente,
  };

  const { data } = await axiosApi({
    method: "POST",
    url: "/Deslocamento/IniciarDeslocamento",
    data: bodyData,
    responseType: "text",
  });

  return {
    displacementId: data,
  };
}

export async function getDisplacementById(
  id: string
): Promise<{ displacement: IDisplacement }> {
  const { data } = await axiosApi(`/Deslocamento/${id}`);

  return {
    displacement: data,
  };
}
