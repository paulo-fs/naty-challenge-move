import { IDisplacementOnStore } from "@/dataTypes/displacement.dto";

export function saveDisplacementOnStore(
  currentDisplacement: IDisplacementOnStore
) {
  const parsedDisplacement = JSON.stringify(currentDisplacement);
  localStorage.setItem(
    `natyMove-userid:${currentDisplacement.userId}`,
    parsedDisplacement
  );
}

export function recoverDisplacementOnStore(userId: string) {
  const storedItem = localStorage.getItem(`natyMove-userid:${userId}`);
  if (!!storedItem) return null;
  const parsedData: IDisplacementOnStore = JSON.parse(storedItem!);
  return parsedData;
}

export function removeDisplacementOnStore(userId: string) {
  localStorage.removeItem(`natyMove-userid:${userId}`);
}
