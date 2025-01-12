import {
  DehydrateOptions,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export interface IDehydrateOptions {
  client: QueryClient;
  options?: DehydrateOptions;
}

export function ReactQueryHydrationBoundary({
  state,
  children,
}: {
  state: unknown;
  children: React.ReactNode;
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
