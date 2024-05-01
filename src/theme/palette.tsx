import { alpha, ColorValue } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

interface ColorPalette {
  [key: number]: string;
}

interface ColorShades {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
}

interface ColorGroup {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
}

interface CommonColors {
  common: { black: string; white: string };
  primary: ColorShades;
  secondary: ColorShades;
  info: ColorShades;
  success: ColorShades;
  warning: ColorShades;
  error: ColorShades;
  grey: ColorPalette;
  divider: string;
  action: {
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
    focus: string;
    hoverOpacity: number;
    disabledOpacity: number;
  };
}

type ThemeMode = 'light' | 'dark';

function palette(themeMode: ThemeMode): CommonColors {
  const GREY: ColorPalette = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
  };

  const PRIMARY: ColorShades = {
    lighter: '#C8FACD',
    light: '#5BE584',
    main: '#00AB55',
    dark: '#007B55',
    darker: '#005249',
    contrastText: '#fff',
  };

  const SECONDARY: ColorShades = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff',
  };

  const INFO: ColorShades = {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#fff',
  };

  const SUCCESS: ColorShades = {
    lighter: '#D8FBDE',
    light: '#86E8AB',
    main: '#36B37E',
    dark: '#1B806A',
    darker: '#0A5554',
    contrastText: '#fff',
  };

  const WARNING: ColorShades = {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: GREY[800],
  };

  const ERROR: ColorShades = {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#fff',
  };

  const COMMON: CommonColors = {
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[500], 0.24),
    action: {
      hover: alpha(GREY[500], 0.08),
      selected: alpha(GREY[500], 0.16),
      disabled: alpha(GREY[500], 0.8),
      disabledBackground: alpha(GREY[500], 0.24),
      focus: alpha(GREY[500], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };

  return themeMode === 'light' ? { ...COMMON, mode: 'light' } : { ...COMMON, mode: 'dark' };
}

export { ThemeMode };
export default palette;
