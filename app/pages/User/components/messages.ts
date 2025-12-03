/*
 * Users Messages
 *
 * This contains all the text for the Users component.
 */
import { defineMessages } from "react-intl";

const scope = "app.domains.user.components";

export default defineMessages({
  list: {
    id: `${scope}.heading.list`,
    defaultMessage: "Users",
  },
  detail: {
    id: `${scope}.heading.detail`,
    defaultMessage: "User Details",
  },
  create: {
    id: `${scope}.heading.create`,
    defaultMessage: "Create User",
  },
  edit: {
    id: `${scope}.heading.edit`,
    defaultMessage: "Edit User",
  },
});
