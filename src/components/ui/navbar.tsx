"use client";
import { Button, Flex } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { signOutPresenter } from "../presenters/navbar.presenter";

function LogoutNavbar() {
  async function onClickLogout() {
    await signOutPresenter();
  }
  return (
    <Button onClick={onClickLogout} colorPalette="teal" variant="plain">
      Logout <LuLogOut />
    </Button>
  );
}

export function Navbar() {
  return (
    <Flex mb="2" justify="end">
      <LogoutNavbar />
    </Flex>
  );
}
