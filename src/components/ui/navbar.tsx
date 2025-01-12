"use client";
import { Button, Flex } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { LuLogOut } from "react-icons/lu";
import { signOutPresenter } from "../presenters/navbar.presenter";

function LogoutNavbar() {
  const queryClient = useQueryClient();
  async function onClickLogout() {
    await signOutPresenter();
    queryClient.clear();
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
