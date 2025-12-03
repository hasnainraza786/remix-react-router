import type { JSX } from "react";

import images from "~/assets/image";

export interface LogoProps {
  height?: string;
  width?: string;
}

export function Logo({
  height = "70px",
  width = "190px",
}: LogoProps): JSX.Element {
  const url = images.LogoWithName;

  return (
    <img
      src={url}
      alt="logo"
      width={width}
      height={height}
      style={{ objectFit: "contain" }}
    />
  );
}
