import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, Typography, MenuItem } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
import { PATH_AUTH, PATH_DOCS, PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// components
import Logo from '../../components/logo';
import Label from '../../components/label';
//
import NavMobile from './nav/mobile';
import navConfig from './nav/config-navigation';
import NavDesktop from './nav/desktop';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { replace, push } = useRouter();
  const { user, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  const handleLogout = async () => {
    try {
      logout();
      replace(PATH_PAGE.home);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };
  const handleLogin = async () => {
    try {
      push(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to open login!', { variant: 'error' });
    }
  };

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Link
            href="/"
            rel="noopener"
            underline="none"
            sx={{ ml: 1 }}
          >
            <Label color="info"> Php book store </Label>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}

          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}


          <Box sx={{ my: 1.5, px: 2.5 }}>
            {user && <Typography variant="subtitle2" noWrap>
              {user?.displayName}
            </Typography>}

            {user && <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.email}
            </Typography>}


            

          </Box>

          {user && <Typography variant="subtitle2" noWrap onClick={handleLogout}>
              Logout
            </Typography>}

          {!user && <Typography variant="subtitle2" noWrap onClick={handleLogin}>
              Login
            </Typography>}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
