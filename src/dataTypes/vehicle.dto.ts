export interface IVehicleCreate {
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface IVehicleUpdate {
  id: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface IVehicleDelete {
  id: string;
}

export interface IVehicle extends IVehicleCreate {
  id: string;
}
