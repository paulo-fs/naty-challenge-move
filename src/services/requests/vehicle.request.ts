import { axiosApi } from "@/lib/axios";
import {
  IVehicle,
  IVehicleCreate,
  IVehicleDelete,
  IVehicleUpdate,
} from "@/dataTypes/vehicle.dto";

export async function getAllVehicles(): Promise<{ vehicles: IVehicle[] }> {
  const { data } = await axiosApi({
    method: "GET",
    url: "/Veiculo",
  });
  return {
    vehicles: data,
  };
}

export async function getVehicleById(
  id: string
): Promise<{ vehicle: IVehicle | null }> {
  const { data } = await axiosApi({
    method: "GET",
    url: `/Veiculo/${id}`,
  });
  return { vehicle: data };
}

export async function createVehicle(vehicle: IVehicleCreate): Promise<void> {
  await axiosApi({
    method: "POST",
    url: "/Veiculo",
    data: vehicle,
  });
}

export async function updateVehicle(data: IVehicleUpdate): Promise<void> {
  await axiosApi({
    method: "PUT",
    url: `/Veiculo/${data.id}`,
    data: data,
  });
}

export async function deleteVehicle(data: IVehicleDelete): Promise<void> {
  await axiosApi({
    method: "DELETE",
    url: `/Veiculo/${data.id}`,
    data: data,
  });
}
