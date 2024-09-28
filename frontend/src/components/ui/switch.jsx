import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../../assets/icons/moon";
import { SunIcon } from "../../assets/icons/sun";

export default function App() {
  return (
    <Switch
      defaultSelected
      size="sm"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    ></Switch>
  );
}
