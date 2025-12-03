import * as React from "react";

import {
  CheckCircle as ActivateIcon,
  ChevronRight,
  Cancel as DeactivateIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";

import { stopPropagation } from "~/utils";

import messages from "./messages";
import FormattedMessage from "~/context/FormattedMessage";

export interface RowActionsProps {
  onEdit?: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  isLoading?: boolean;
}

export default function RowActions({
  onEdit,
  onActivate,
  onDeactivate,
  onDelete,
  onView,
  isLoading = false,
}: RowActionsProps): React.JSX.Element {
  return (
    <Box sx={{ display: "flex", gap: 0.5, mt: 1, justifyContent: "flex-end" }}>
      {onEdit && (
        <Tooltip title={<FormattedMessage {...messages.edit} />}>
          <IconButton
            size="small"
            onClick={stopPropagation(onEdit)}
            disabled={isLoading}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {onActivate && (
        <Tooltip title={<FormattedMessage {...messages.deactivate} />}>
          <IconButton
            color="warning"
            size="small"
            onClick={stopPropagation(onActivate)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={16} /> : <DeactivateIcon />}
          </IconButton>
        </Tooltip>
      )}
      {onDeactivate && (
        <Tooltip title={<FormattedMessage {...messages.activate} />}>
          <IconButton
            color="success"
            size="small"
            onClick={stopPropagation(onDeactivate)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={16} /> : <ActivateIcon />}
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={<FormattedMessage {...messages.delete} />}>
          <IconButton
            color="error"
            size="small"
            onClick={stopPropagation(onDelete)}
            disabled={isLoading}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {onView && (
        <Tooltip title={<FormattedMessage {...messages.view} />}>
          <IconButton
            color="primary"
            size="small"
            onClick={stopPropagation(onView)}
            disabled={isLoading}
          >
            <ChevronRight />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
