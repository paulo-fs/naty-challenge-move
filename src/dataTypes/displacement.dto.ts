export interface IDisplacementCreate {
  kmInicial: number;
  inicioDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface IDisplacementRequiredData {
  observacao?: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface IDisplacementUpdate {
  id: string;
  kmFinal: number;
  fimDeslocamento: string;
  obervacao: string;
}

export interface IDisplacementDelete {
  id: string;
}

export interface IDisplacement {
  id: string;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string;
  fimDeslocamento: string | null;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface IDisplacementOnStore {
  id: string;
  userId: number;
  startDisplacement: string;
  endDisplacement: string | null;
}
