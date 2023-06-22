import {
  IDriver,
  IDriverCreate,
  IDriverDelete,
  IDriverSelectInputData,
  IDriverUpdate,
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

export async function getDriverById(id: string): Promise<{ driver: IDriver }> {
  const { data } = await axiosApi.get(`/Condutor/${id}`);
  return {
    driver: data,
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

export async function updateDriver(data: IDriverUpdate): Promise<void> {
  await axiosApi({
    method: "PUT",
    url: `/Condutor/${data.id}`,
    data: data,
  });
}

export async function deleteDriver(data: IDriverDelete): Promise<void> {
  await axiosApi({
    method: "DELETE",
    url: `/Condutor/${data.id}`,
    data: data,
  });
}
