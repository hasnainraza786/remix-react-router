import type { Theme } from "@mui/material/styles";
import type { Components } from "@mui/material/styles";

export const MuiCard = {
  styleOverrides: {
    root: ({}) => {
      return {
        borderRadius: "20px",
      };
    },
  },
} satisfies Components<Theme>["MuiCard"];
