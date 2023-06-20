import React from "react";
import { ISettings } from "./HeaderMenu.props";

export function useHeaderMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const exitSetting: ISettings = {
    title: "Sair",
    url: "/",
    action: () => {
      console.log("Saiu...");
    },
  };

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  return {
    anchorElNav,
    anchorElUser,
    exitSetting,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenUserMenu,
    handleCloseUserMenu,
  };
}
