import { createContext } from 'react';

const ColourModeContext = createContext({
    darkMode: false,
    setDarkMode: (newmode: boolean) => {}
});

export default ColourModeContext;
