import {
  IDriver,
  IDriverCreate,
  IDriverSelectInputData,
} from "@/dataTypes/driver.dto";
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

export async function createDriver(
  bodyData: IDriverCreate
): Promise<{ driverId: string }> {
  const { data } = await axiosApi({
    method: "POST",
    url: "/Condutor",
    data: bodyData,
  });

  return {
    driverId: data,
  };
}
