import { __DEV__ } from "@/utils/env/index.util";
import { Spinner } from "@chakra-ui/react";
import * as React from "react";
import { If } from "./if";

type AsyncRendererPropTypes<DataType> = {
  isLoading: boolean;
  error?: Error | null;
  data: DataType;
  hasData: boolean;
  endpoint?: string;
  children(_data: DataType): React.ReactNode;
};

export function AsyncRenderer<DataType>({
  isLoading,
  error,
  data,
  hasData,
  endpoint = "endpoint",
  children,
}: AsyncRendererPropTypes<DataType>) {
  return (
    <If
      condition={isLoading}
      do={<Spinner color="teal" />}
      else={
        <If
          condition={error != null}
          do={
            <p>
              {!!error ||
                `${__DEV__ && `An uncached error has occurred in ${endpoint} ajax operation`}`}
            </p>
          }
          else={
            <If
              condition={!hasData}
              do={<p>No data</p>}
              else={children(data)}
            />
          }
        />
      }
    />
  );
}
