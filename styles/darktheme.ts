import { createTheme } from '@mui/material/styles';
import { withTheme } from '@emotion/react';

// Create a theme instance.
const darktheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#827191',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#7d1d3f'
        },
        error: {
            main: '#FFFFFF'
        },
        info: {
            main: '#512500'
        },
        background: {
            paper: '#424242',
            default: '#303030'
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8'
        },
        divider: 'rgba(255, 255, 255, 0.12)'
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

export default darktheme;
