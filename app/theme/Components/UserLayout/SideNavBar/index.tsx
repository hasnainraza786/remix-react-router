import * as React from 'react';

import { Link, useLocation } from 'react-router';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { Logo } from '../../Logo';
import { navItems } from '../config';
import { NavList } from '../NavItems';

import { SideNav, SideNavContainer } from './Styled';

import { routes } from '~/router/routes';
import { colorSchemes } from '~/theme/color-schemes';

function SideNavBar(): React.JSX.Element {
  const pathname = useLocation().pathname;
  const {
    light: { palette },
  } = colorSchemes;

  return (
    <SideNavContainer>
      <SideNav>
        <Box component={Link} to={routes.home} sx={{ display: 'flex', justifyContent: 'center', p: '24px' }}>
          <Logo />
        </Box>
        <Divider sx={{ borderColor: palette.stroke }} />
        <NavList pathname={pathname} items={navItems} />
      </SideNav>
    </SideNavContainer>
  );
}

export default SideNavBar;
