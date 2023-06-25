export interface IDriverCreate {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface IDriverUpdate {
  id: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface IDriverDelete {
  id: string;
}

export interface IDriver {
  id: string;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}
