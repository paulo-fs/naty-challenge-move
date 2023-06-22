import {
  IDisplacement,
  IDisplacementCreate,
  IDisplacementRequiredData,
  IDisplacementUpdate,
} from "@/dataTypes/displacement.dto";
import { calculateFinalDistanceInKm } from "@/helpers/caculateFinalDistanceInKm";
import { axiosApi } from "@/lib/axios";
import { newDateOnBr } from "@/lib/dayjs";

export async function startDisplacement(
  requestData: IDisplacementRequiredData
) {
  const bodyData: IDisplacementCreate = {
    kmInicial: 0,
    inicioDeslocamento: newDateOnBr(),
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

type FinishProps = {
  id: string;
  startTime: string;
  obervacao?: string;
};

export async function getAllDisplacements(): Promise<{
  displacements: IDisplacement[];
}> {
  const { data } = await axiosApi.get("/Deslocamento");
  return {
    displacements: data,
  };
}

export async function finishDisplacement(finishData: FinishProps) {
  const bodyData: IDisplacementUpdate = {
    id: finishData.id,
    obervacao: finishData.obervacao ?? "",
    kmFinal: calculateFinalDistanceInKm(finishData.startTime),
    fimDeslocamento: newDateOnBr(),
  };
  await axiosApi({
    method: "PUT",
    url: `/Deslocamento/${finishData.id}/EncerrarDeslocamento`,
    data: bodyData,
  });
}
