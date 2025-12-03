import Box, { type BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface HeaderContainerProps extends BoxProps {}

export const HeaderContainer = styled(Box)<HeaderContainerProps>(
  ({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    minHeight: "64px",
  })
);

import Drawer, { type DrawerProps } from "@mui/material/Drawer";

interface MobileDrawerProps extends DrawerProps {}

export const MobileDrawer = styled(Drawer)<MobileDrawerProps>(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    margin: "10px",
    height: "calc(100vh - 20px)",
    width: "var(--MobileNav-width)",
    zIndex: "var(--MobileNav-zIndex)",
    borderRadius: "12px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
