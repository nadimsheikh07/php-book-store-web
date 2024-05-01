import PropTypes from 'prop-types';
import { useMemo, ReactNode } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
} from '@mui/material/styles';
// components
import { useSettingsContext, ThemeMode, ThemeDirection } from '../components/settings';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import GlobalStyles from './globalStyles';

// ----------------------------------------------------------------------

interface ThemeProviderProps {
  children: ReactNode;
}


// Define the type for your new key
type CustomShadowsType = object;

// Extend the ThemeOptions interface with your new key
declare module '@mui/material/styles' {
  interface ThemeOptions {
    customShadows?: CustomShadowsType;
  }
}
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode, themeDirection } = useSettingsContext();

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection as ThemeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
    }),
    [themeDirection, themeMode]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
