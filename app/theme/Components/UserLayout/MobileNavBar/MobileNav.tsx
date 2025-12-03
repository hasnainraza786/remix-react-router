import * as React from "react";
import { useLocation } from "react-router";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router";

import { colorSchemes } from "~/theme/color-schemes";

import { routes } from "~/router/routes";
import { Logo } from "../../Logo";
import { navItems } from "../config";
import { NavList } from "../NavItems";
import type { NavItemConfig } from "../types";
import { MobileDrawer } from "./Styled";

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  items?: NavItemConfig[];
}

function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
  const pathname = useLocation().pathname;
  const { light } = colorSchemes;
  const { palette } = light;

  return (
    <MobileDrawer open={open} onClose={onClose}>
      <Box
        component={RouterLink}
        to={routes.home}
        sx={{ display: "flex", justifyContent: "center", p: "24px" }}
      >
        <Logo width={"250px"} />
      </Box>

      <Divider sx={{ borderColor: palette.stroke }} />
      <NavList pathname={pathname} items={navItems} />
    </MobileDrawer>
  );
}

export default MobileNav;
