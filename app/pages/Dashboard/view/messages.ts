/*
 * Dashboard Pages Messages
 *
 * This contains all the text for the Dashboard Pages component.
 */
import { defineMessages } from "react-intl";

const scope = "app.components.dashboard";

export default defineMessages({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: "Welcome to the Dashboard",
  },
  reactRouter: {
    id: `${scope}.reactRouter`,
    defaultMessage:
      "This project is to get fimiliar with React-Router structure",
  },
  about: {
    id: `${scope}.about`,
    defaultMessage: "This page is wrap in a User Layout",
  },
});
