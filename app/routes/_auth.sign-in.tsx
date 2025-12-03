import { type ActionFunction, redirect } from 'react-router-dom';

import { TOKEN_COOKIE_NAME, USER_DATA_COOKIE_NAME } from '~/context/AuthContext';
import SignIn from '~/pages/SignIn/view';
import { routes } from '~/router/routes';
import service from '~/services';

// The server-side action function
export const action: ActionFunction = async ({ request }) => {
  console.log('its run');
  // const snackbar = useSnackbarContext();
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  try {
    const loginResponse = await service({
      url: '/auth/login',
      method: 'POST',
      data: { username, password, expiresInMins: 1 },
      noAuth: true,
    });
    console.log(loginResponse, 'login Response');

    // In a real server-side setup, the server would set the cookies directly.
    // Here, we simulate that by using the js-cookie library on the server side (which is an unusual pattern)
    // or by letting the client set the cookies after the redirect.
    // For a client-side only app, the login data would be sent back in a redirect URL,
    // which is not secure. Since we're trying to hide the credentials from the network tab,
    // this server-side approach is better.

    // A real implementation would use a server-side cookie utility.
    // Here, we'll set the cookies via a redirect with headers.
    // Note: This relies on the framework's ability to handle redirect headers with cookies.
    // snackbar.show({
    //   message: "You have sign in",
    //   type: "success",
    // });
    const headers = new Headers();
    // Use append() to add multiple Set-Cookie headers

    headers.append(
      'Set-Cookie',
      `${TOKEN_COOKIE_NAME}=${loginResponse.accessToken}; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax`,
    );
    headers.append(
      'Set-Cookie',
      `${USER_DATA_COOKIE_NAME}=${JSON.stringify(loginResponse)}; Max-Age=604800; Path=/; SameSite=Lax`,
    );

    headers.append('Set-Cookie', `LOGIN_SUCCESS=1; Max-Age=10; Path=/; SameSite=Lax`);

    const redirectTo = new URL(request.url).searchParams.get('redirectTo') || routes.dashboard;

    const redirectUrl = new URL(redirectTo, request.url);
    redirectUrl.searchParams.set('login', 'success');

    // Redirect to the dashboard after a successful login
    return redirect(redirectTo, { headers });
  } catch (error) {
    // If login fails, return an error to be handled by useActionData
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: (error as any)?.message || 'Login failed. Please check your credentials.',
    };
  }
};

export default function SigninRoute() {
  return <SignIn />;
}
