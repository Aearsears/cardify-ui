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
import { createClient, Provider } from 'urql';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const graphqlClient = createClient({
    url: 'https://cardify-backend.herokuapp.com/graphql/',
    preferGetMethod: false
});

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
        localStorage.setItem('darkmode', newmode.toString());
        setDarkMode(newmode);
    };
    const colorMode = React.useContext(ColourModeContext);
    return (
        <Provider value={graphqlClient}>
            <CacheProvider value={emotionCache}>
                <ColourModeContext.Provider
                    value={{ darkMode, setDarkMode: _setDarkMode }}
                >
                    <ThemeProvider theme={darkMode ? darkTheme : lighttheme}>
                        <CssBaseline></CssBaseline>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeProvider>
                </ColourModeContext.Provider>
            </CacheProvider>
        </Provider>
    );
}
