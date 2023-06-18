import { SelectProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type IValueList = {
  id: string;
  nome: string;
};

export interface CustomSelectProps extends SelectProps {
  valuesList: IValueList[];
  label: string;
  selectedValue: string;
  placeholderValue?: string;
  setValueFunc: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
