import * as React from "react";

import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import messages from "./messages";
import FormattedMessage from "~/context/FormattedMessage";

export interface PageHeadingProps {
  onAddPress?: () => void;
  onEditPress?: () => void;
  isIncludeInActive?: boolean;
  onCheckedIncludeInActive?: (checked: boolean) => void;
  heading: React.ComponentProps<typeof FormattedMessage>;
  addButtonDisable?: boolean;
  rightActions?: React.ReactNode;
}

export default function PageHeading({
  heading,
  onAddPress,
  onEditPress,
  isIncludeInActive,
  onCheckedIncludeInActive,
  addButtonDisable,
  rightActions,
}: PageHeadingProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { sm: "center" },
        gap: 1,
        mb: 2,
        flex: 1,
      }}
    >
      <Typography variant="h5">
        <FormattedMessage {...heading} />
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "start",
          gap: { xs: 1, sm: 2 },
        }}
      >
        {onCheckedIncludeInActive ? (
          <Box sx={{ textAlign: "end" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isIncludeInActive}
                  onChange={(e) => onCheckedIncludeInActive(e.target.checked)}
                />
              }
              label={<FormattedMessage {...messages.inActive} />}
            />
          </Box>
        ) : null}
        {onAddPress ? (
          <Button
            variant="contained"
            color="primary"
            onClick={onAddPress}
            disabled={addButtonDisable}
          >
            <FormattedMessage {...messages.addNew} />
          </Button>
        ) : null}
        {onEditPress ? (
          <Button variant="contained" color="primary" onClick={onEditPress}>
            <FormattedMessage {...messages.edit} />
          </Button>
        ) : null}
        {rightActions}
      </Box>
    </Box>
  );
}
