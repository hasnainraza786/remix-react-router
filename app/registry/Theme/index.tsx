import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';

import { createTheme } from '~/theme/create-theme';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

function CustomThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const theme = createTheme();

  return (
    <ThemeProvider disableTransitionOnChange theme={theme} defaultMode="light">
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '270px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
