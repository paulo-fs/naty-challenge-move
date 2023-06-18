import { IVehicle, IVehicleSelectInputData } from "@/dataTypes/vehicle.dto";
import { axiosApi } from "@/lib/axios";

export async function getVehicleInputData(): Promise<{
  vehicles: IVehicleSelectInputData[];
}> {
  const { data } = await axiosApi.get("/Veiculo");
  const vehicles = data.map((vehicle: IVehicle) => {
    return {
      id: vehicle.id,
      nome: `${vehicle.marcaModelo} - ${vehicle.anoFabricacao}`,
    };
  });

  return {
    vehicles,
  };
}
