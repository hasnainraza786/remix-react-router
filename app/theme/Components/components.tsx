import type { Components } from "@mui/material/styles";

import { MuiButton } from "./button";
import { MuiCard } from "./card";
import { MuiCardContent } from "./card-content";
import { MuiCardHeader } from "./card-header";
import { MuiStack } from "./stack";
import { MuiTab } from "./tab";
import type { Theme } from "@mui/material/styles";

export const components = {
  MuiButton,
  MuiCard,
  MuiCardContent,
  MuiCardHeader,
  MuiStack,
  MuiTab,
} satisfies Components<Theme>;
