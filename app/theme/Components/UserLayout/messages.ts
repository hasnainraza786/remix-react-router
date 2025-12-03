/*
 * Layout Messages
 *
 * This contains all the text for the Layout component.
 */
import { defineMessages } from "react-intl";

const scope = "app.components.Layout";

export default defineMessages({
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: "Dashboard",
  },
  blogs: {
    id: `${scope}.blogs`,
    defaultMessage: "Blogs",
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: "Change Password",
  },
  signOut: {
    id: `${scope}.signOut`,
    defaultMessage: "Sign Out",
  },
  fileBaseRouting: {
    id: `${scope}.fileBaseRouting`,
    defaultMessage: "File Base Routing",
  },
  layoutStructure: {
    id: `${scope}.layoutStructure`,
    defaultMessage: "Layout Structure",
  },
  middlewareStructure: {
    id: `${scope}.middlewareStructure`,
    defaultMessage: "Middleware Structure",
  },
  renderingStructure: {
    id: `${scope}.renderingStructure`,
    defaultMessage: "Rendering Structure",
  },
  user: {
    id: `${scope}.users`,
    defaultMessage: "Users",
  },
});
