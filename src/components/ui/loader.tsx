import React, { useEffect, useState } from "react";

import { If } from "./if";

type LoaderPropTypes = {
  isLoading: boolean;
  time?: number;
  icon?: React.ReactElement;
};

export function Loader({ isLoading, time, icon }: LoaderPropTypes) {
  const [shownLoader, setShownLoader] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = null!;
    timeout = setTimeout(function updateShownLoader() {
      if (isLoading) setShownLoader(true);
    }, time ?? 2000);

    return function releaseTimeoutFromMemory() {
      clearTimeout(timeout);
    };
  }, [isLoading, time]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = null!;

    if (!isLoading && shownLoader) {
      setShownLoader(false);
      setIsDoneLoading(true);
    }

    if (isDoneLoading) {
      timeout = setTimeout(function updateShownLoader() {
        setIsDoneLoading(false);
      }, 2000);
    }

    return function releaseTimeoutFromMemory() {
      clearTimeout(timeout);
    };
  }, [isDoneLoading, isLoading, shownLoader]);

  return (
    <>
      <If condition={isDoneLoading} do={<p>Done Loading</p>} />
      <If condition={icon !== undefined} do={icon} else={<>&#8631;</>} />
    </>
  );
}
