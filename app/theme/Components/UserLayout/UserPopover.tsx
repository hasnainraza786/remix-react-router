import React from "react";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

// import { useAuthContext } from "@/contexts/AuthContext";

import { routes } from "~/router/routes";

import { Link } from "react-router";
import FormattedMessage from "~/context/FormattedMessage";
import messages from "./messages";
import { useAuthContext } from "~/context/AuthContext";

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const { user, signOut } = useAuthContext();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: "240px" } } }}
    >
      <Box sx={{ p: "16px 20px " }}>
        <Typography variant="subtitle1">
          Ali Raza
          {/* {user?.name} */}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {/* {user?.email} */}
          ali@gmail.com
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <MenuItem
          component={Link}
          to={routes.auth.changePassword}
          onClick={onClose}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <FormattedMessage {...messages.changePassword} />
        </MenuItem>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <FormattedMessage {...messages.signOut} />
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
