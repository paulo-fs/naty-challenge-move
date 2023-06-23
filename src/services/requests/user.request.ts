import { IUser, IUserCreate } from "@/dataTypes/passanger.dto";
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
