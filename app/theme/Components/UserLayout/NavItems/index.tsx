import * as React from "react";
import Stack from "@mui/material/Stack";
import { Link } from "react-router";

import { NavContainer, NavItemBox, NavItemText } from "./Styled";
import { isNavItemActive } from "../utils/isNavItemActive";
import { navIcons } from "../NavIcons";
import type { NavItemConfig } from "../types";

interface NavListProps {
  items?: NavItemConfig[];
  pathname: string;
}

export function NavList({
  items = [],
  pathname,
}: NavListProps): React.JSX.Element {
  return (
    <NavContainer>
      <Stack
        component="ul"
        spacing={1.2}
        sx={{ listStyle: "none", m: 0, p: 0 }}
      >
        {items.map(({ key, ...item }) => (
          <NavListItem key={key} pathname={pathname} {...item} />
        ))}
      </Stack>
    </NavContainer>
  );
}

interface NavListItemProps extends Omit<NavItemConfig, "items"> {
  pathname: string;
}

function NavListItem({
  disabled,
  external,
  href,
  icon,
  matcher,
  pathname,
  title,
}: NavListItemProps): React.JSX.Element {
  const active = isNavItemActive({
    disabled,
    external,
    href,
    matcher,
    pathname,
  });
  const IconComponent = icon
    ? navIcons[icon][active ? "filled" : "outlined"]
    : null;

  return (
    <li>
      <NavItemBox
        component={Link}
        to={href}
        active={active}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
      >
        {IconComponent && (
          <IconComponent
            sx={{ fontSize: 24, color: active ? "common.white" : "grey.900" }}
          />
        )}
        <NavItemText component="span" variant="body2" active={active}>
          {title}
        </NavItemText>
      </NavItemBox>
    </li>
  );
}
