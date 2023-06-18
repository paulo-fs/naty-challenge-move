export interface IDriverCreate {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: Date;
}

export interface IDriverUpdate {
  id: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: Date;
}

export interface IDriverDelete {
  id: string;
}

export interface IDriver extends IDriverCreate {
  id: string;
}

export interface IDriverSelectInputData {
  id: string;
  nome: string;
}
