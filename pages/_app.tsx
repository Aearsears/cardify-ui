import * as React from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import ColourModeContext from '../styles/ColourModeContext';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import darkTheme from '../styles/darktheme';
import lighttheme from '../styles/lighttheme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache
}: AppProps & { emotionCache: EmotionCache }) {
    // Set dark mode based on media query
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode);

    useEffect(() => {
        const mode = localStorage.getItem('mode') === 'true';
        // set mode
        console.log(`get localStore ${mode}`);
        setDarkMode(mode);
    }, []);

    // useEffect(() => {
    //   console.log(`set localStore ${darkMode}`);
    //   localStorage.setItem("mode", darkMode);
    // }, [darkMode]);
    const _setDarkMode = (newmode: boolean) => {
        console.log(`set localStore ${newmode}`);
        localStorage.setItem('mode', newmode.toString());
        setDarkMode(newmode);
    };
    const theme = useTheme();
    const colorMode = React.useContext(ColourModeContext);
    return (
        <CacheProvider value={emotionCache}>
            <ColourModeContext.Provider
                value={{ darkMode, setDarkMode: _setDarkMode }}
            >
                <ThemeProvider theme={darkMode ? darkTheme : theme}>
                    <CssBaseline></CssBaseline>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </ColourModeContext.Provider>
        </CacheProvider>
    );
}
