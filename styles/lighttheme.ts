import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const lighttheme = createTheme({
    palette: {
        primary: {
            main: '#84acce',
            contrastText: '#000000'
        },
        secondary: {
            main: '#d7d9b1'
        },
        background: {
            default: 'rgb(244 244 245);',
            paper: '#fff'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)'
        },
        error: {
            main: red.A400
        },
        divider: 'rgba(0, 0, 0, 0.12)'
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    typography: {
        fontFamily: [
            'Lato',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        body1: {
            fontSize: '1.125rem'
        }
    }
});

export default lighttheme;
