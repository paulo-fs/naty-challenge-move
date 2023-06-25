import { axiosApi } from "@/lib/axios";
import {
  IDriver,
  IDriverCreate,
  IDriverDelete,
  IDriverUpdate,
} from "@/dataTypes/driver.dto";

export async function getAllDrivers(): Promise<{ drivers: IDriver[] }> {
  const { data } = await axiosApi({
    method: "GET",
    url: "/Condutor",
  });
  return {
    drivers: data,
  };
}

export async function getDriverById(id: string): Promise<{ driver: IDriver }> {
  const { data } = await axiosApi({
    method: "GET",
    url: `/Condutor/${id}`,
  });
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
