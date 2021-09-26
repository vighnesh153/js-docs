import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
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
});

export default theme;
