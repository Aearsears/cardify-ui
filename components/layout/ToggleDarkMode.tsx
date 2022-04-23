import { useContext } from 'react';
import ColourModeContext from '../../styles/ColourModeContext';
import { useTheme } from '@mui/material/styles';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Button, Typography } from '@mui/material';

const ToggleDarkModeButton = () => {
    const theme = useTheme();
    const { darkMode, setDarkMode } = useContext(ColourModeContext);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'end'
            }}
        >
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' }
                }}
            >
                <Tooltip
                    title={
                        theme.palette.mode === 'light'
                            ? 'Dark mode'
                            : 'Light mode'
                    }
                >
                    <IconButton
                        onClick={() => setDarkMode(!darkMode)}
                        color="inherit"
                    >
                        {theme.palette.mode === 'dark' ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            <Box
                sx={{
                    display: { xs: 'flex', md: 'none' }
                }}
            >
                <Button
                    onClick={() => setDarkMode(!darkMode)}
                    color="inherit"
                    style={{ textTransform: 'none', padding: 0 }}
                >
                    <Typography textAlign="left">Toggle dark mode</Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default ToggleDarkModeButton;
