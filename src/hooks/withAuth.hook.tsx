/* eslint-disable @typescript-eslint/no-explicit-any */
import SignIn from "@/app/signin/page";
import { If } from "@/components/ui/if";
import { auth } from "@/lib/auth/index.auth";
import { NextComponentType, NextPageContext } from "next";

export function withAuth(
  Component: NextComponentType<NextPageContext, any, object>,
) {
  const Session = async (props: any) => {
    const session = await auth();
    return (
      <If
        condition={!!session}
        do={<Component {...props} />}
        else={<SignIn />}
      />
    );
  };
  return Session;
}
