import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { TOKEN_COOKIE_NAME } from "~/context/AuthContext";
import { useSnackbarContext } from "~/context/SnackbarContext";
import LayoutSkeleton from "~/theme/Components/UserLayout";

export default function UserLayout() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  console.log(token, "token");
  const snackbar = useSnackbarContext();

  useEffect(() => {
    const justLoggedIn = Cookies.get("LOGIN_SUCCESS");

    if (justLoggedIn) {
      snackbar.show({
        message: "You have signed in successfully",
        type: "success",
      });

      Cookies.remove("LOGIN_SUCCESS");
    }
  }, []);
  return (
    <LayoutSkeleton>
      <Outlet />
    </LayoutSkeleton>
  );
}
