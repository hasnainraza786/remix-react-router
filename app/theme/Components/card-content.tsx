import type { Theme } from "@mui/material/styles";
import type { Components } from "@mui/material/styles";

export const MuiCardContent = {
  styleOverrides: {
    root: { padding: "32px 24px", "&:last-child": { paddingBottom: "32px" } },
  },
} satisfies Components<Theme>["MuiCardContent"];
