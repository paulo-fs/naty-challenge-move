import React from "react";

export function useRadioGroupClientDriver() {
  const [radioGroupValue, setRadioGroupValue] = React.useState("passageiro");

  function handleRadioGroupChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRadioGroupValue((event.target as HTMLInputElement).value);
  }

  return {
    radioGroupValue,
    handleRadioGroupChange,
  };
}
