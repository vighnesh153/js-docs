import type {} from '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'hsl(229, 61%, 59%)',
    },
    secondary: {
      main: 'hsl(174, 68%, 31%)',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: { fontSize: '3rem' },
    h2: { fontSize: '2.25rem' },
    h3: { fontSize: '1.75rem' },
    h4: { fontSize: '1.25rem' },
    h5: { fontSize: '1rem' },
    h6: { fontSize: '0.8rem' },
  },
});

export default theme;
