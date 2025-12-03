import { Dashboard, DashboardOutlined } from "@mui/icons-material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import Grid4x4OutlinedIcon from "@mui/icons-material/Grid4x4Outlined";
import Grid4x4Icon from "@mui/icons-material/Grid4x4";
import LayersIcon from "@mui/icons-material/Layers";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

type MuiIcon = OverridableComponent<SvgIconTypeMap<object, "svg">>;

export const navIcons: Record<string, { filled: MuiIcon; outlined: MuiIcon }> =
  {
    dashboard: {
      filled: Dashboard,
      outlined: DashboardOutlined,
    },
    blogs: {
      filled: WorkspacePremiumIcon,
      outlined: WorkspacePremiumOutlinedIcon,
    },
    fileBaseRouting: {
      filled: FolderCopyIcon,
      outlined: FolderCopyOutlinedIcon,
    },
    layoutStructure: {
      filled: Grid4x4Icon,
      outlined: Grid4x4OutlinedIcon,
    },
    middlewareStructure: {
      filled: LayersIcon,
      outlined: LayersOutlinedIcon,
    },
    renderingStructure: {
      filled: LoopIcon,
      outlined: LoopOutlinedIcon,
    },
    user: {
      filled: PersonIcon,
      outlined: PersonOutlineOutlinedIcon,
    },
  };
