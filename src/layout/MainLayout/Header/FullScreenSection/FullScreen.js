import { useCallback, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Tooltip } from '@mui/material';

// assets
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons';

// ==============================|| HEADER CONTENT - FULLSCREEN ||============================== //

const FullScreen = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleToggle = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
        if (document && !document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }, []);

    return (
        <Box sx={{ ml: 2, mr: 2 }}>
            <Tooltip title={open ? 'Exit Fullscreen' : 'Fullscreen'}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        border: '1px solid',

                        borderColor: theme.palette.primary.light,
                        background: theme.palette.primary.light,
                        color: theme.palette.secondary.main,
                        transition: 'all .2s ease-in-out',
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main,
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main,
                            color: 'white'
                        }
                    }}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    title="user"
                    onClick={handleToggle}
                    color="inherit"
                >
                    {open ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
                </Avatar>
            </Tooltip>
        </Box>
    );
};

export default FullScreen;
