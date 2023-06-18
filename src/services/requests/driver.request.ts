import { IDriver, IDriverSelectInputData } from "@/dataTypes/driver.dto";
import { axiosApi } from "@/lib/axios";

export async function getDriversInputList(): Promise<{
  drivers: IDriverSelectInputData[];
}> {
  const { data } = await axiosApi.get("/Condutor");
  const drivers = data.map((driver: IDriver) => {
    return {
      id: driver.id,
      nome: driver.nome,
    };
  });

  return {
    drivers,
  };
}
