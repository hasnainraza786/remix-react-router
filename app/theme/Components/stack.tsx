import type { Theme } from "@mui/material/styles";
import type { Components } from "@mui/material/styles";

export const MuiStack = {
  defaultProps: { useFlexGap: true },
} satisfies Components<Theme>["MuiStack"];
