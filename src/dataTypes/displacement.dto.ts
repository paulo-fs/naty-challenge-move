export interface IDisplacementCreate {
  kmInicial: number;
  inicioDeslocamento: Date;
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
  fimDeslocamento: Date;
  obervacao: string;
}

export interface IDisplacementDelete {
  id: string;
}

export interface IDisplacement {
  id: string;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: Date;
  imDeslocamento: Date;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}
