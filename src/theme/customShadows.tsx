import { alpha, ColorValue } from '@mui/material/styles';
import palette, { ThemeMode } from './palette';

// Define the color shades based on the light theme
const themeColor = palette('light');

// Extract the color values for light and dark modes
const LIGHT_MODE: ColorValue = themeColor.grey[500];
const DARK_MODE: ColorValue = themeColor.common.black;

// Function to create shadows based on the provided color
function createShadow(color: ColorValue) {
  // Calculate the transparent color based on the provided color
  const transparent = alpha(color, 0.16);

  // Define shadows with alpha values based on the provided color
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    // Use alpha function to add transparency to the color values from the light theme
    primary: `0 8px 16px 0 ${alpha(themeColor.primary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(themeColor.info.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(themeColor.secondary.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(themeColor.success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(themeColor.warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(themeColor.error.main, 0.24)}`,
    // Define shadow styles for specific components
    card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
    dialog: `-40px 40px 80px -8px ${alpha(color, 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
  };
}

// Function to generate custom shadows based on the theme mode
export default function customShadows(themeMode: ThemeMode) {
  // Choose the appropriate color based on the theme mode and generate shadows
  return themeMode === 'light' ? createShadow(LIGHT_MODE) : createShadow(DARK_MODE);
}
