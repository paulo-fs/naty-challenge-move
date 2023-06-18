import { IUser, IUserCreate } from "@/dataTypes/passanger.dto";
import { axiosApi } from "@/lib/axios";

export async function getUsers(): Promise<IUser[]> {
  const { data } = await axiosApi.get("/Cliente");
  return data;
}

export async function getUserById(id: string): Promise<{ user: IUser }> {
  const { data } = await axiosApi.get(`/Cliente/${id}`);
  return { user: data };
}

// export async function createUser(data: IUserCreate): Promise<string> {

// }
