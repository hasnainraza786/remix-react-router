import { routes } from "~/router/routes";

import type { NavItemConfig } from "./types";
import messages from "./messages";
import FormattedMessage from "~/context/FormattedMessage";

export const navItems: NavItemConfig[] = [
  {
    key: "dashboard",
    title: <FormattedMessage {...messages.dashboard} />,
    href: routes.dashboard,
    icon: "dashboard",
  },
  {
    key: "fileBaseRouting",
    title: <FormattedMessage {...messages.fileBaseRouting} />,
    href: routes.fileBaseRouting,
    icon: "fileBaseRouting",
  },
  {
    key: "layoutStructure",
    title: <FormattedMessage {...messages.layoutStructure} />,
    href: routes.layoutStructure,
    icon: "layoutStructure",
  },
  {
    key: "middlewareStructure",
    title: <FormattedMessage {...messages.middlewareStructure} />,
    href: routes.middlewareStructure,
    icon: "middlewareStructure",
  },
  {
    key: "renderingStructure",
    title: <FormattedMessage {...messages.renderingStructure} />,
    href: routes.renderingStructure,
    icon: "renderingStructure",
  },
  {
    key: "user",
    title: <FormattedMessage {...messages.user} />,
    href: routes.user.listing,
    icon: "user",
  },
  {
    key: "blogs",
    title: <FormattedMessage {...messages.blogs} />,
    href: routes.blogs.listing,
    icon: "blogs",
  },
];
