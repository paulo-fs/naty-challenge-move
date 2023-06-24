import {
  IUser,
  IUserCreate,
  IUserDelete,
  IUserUpdate,
} from "@/dataTypes/passanger.dto";
import { axiosApi } from "@/lib/axios";

export async function getAllUsers(): Promise<{ users: IUser[] }> {
  const { data } = await axiosApi.get("/Cliente");
  return {
    users: data,
  };
}

export async function getUserById(id: string): Promise<{ user: IUser }> {
  const { data } = await axiosApi.get(`/Cliente/${id}`);
  return { user: data };
}

export async function createUser(
  bodyData: IUserCreate
): Promise<{ newUserId: string }> {
  const { data } = await axiosApi({
    method: "POST",
    url: "/Cliente",
    data: bodyData,
  });

  return {
    newUserId: data,
  };
}

export async function updateUser(data: IUserUpdate): Promise<void> {
  await axiosApi({
    method: "PUT",
    url: `/Cliente/${data.id}`,
    data: data,
  });
}

export async function deleteUser(data: IUserDelete): Promise<void> {
  await axiosApi({
    method: "DELETE",
    url: `/Cliente/${data.id}`,
    data: data,
  });
}
