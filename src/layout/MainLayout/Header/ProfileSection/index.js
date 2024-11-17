import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    Modal,
    CardContent,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    IconButton,
    Typography
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ChangePassword from './ChangePassword';
import SubCard from 'ui-component/cards/SubCard';
import Transitions from 'ui-component/extended/Transitions';
import { useDispatch } from 'react-redux';
import User1 from 'assets/images/user.png';
import CloseIcon from '@mui/icons-material/Close';
import { IconLogout, IconSettings, IconUser, IconPassword } from '@tabler/icons';
import useConfig from 'hooks/useConfig';
import { FormattedMessage } from 'react-intl';
import { LogoutSession, AdminDetailApi } from 'store/slices/adminAuth';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const ProfileSection = () => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({});
    const [open, setOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        dispatch(AdminDetailApi(token)).then((response) => {
            setProfile(response.ResponseData);
        });
    }, []);

    const handleModalOpen = () => {
        setOpen2(true);
    };

    const handleModalClose = () => {
        setOpen2(false);
    };

    const handleModalOpen2 = () => {
        setOpen3(true);
    };

    const handleModalClose2 = () => {
        setOpen3(false);
    };

    const anchorRef = useRef(null);
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('adminToken');
        localStorage.removeItem('profile');
        localStorage.removeItem('adminRole', '');
        localStorage.removeItem('token', '');
        dispatch(LogoutSession());
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.main,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        alt="user-account"
                    />
                }
                label={<IconSettings stroke={1.5} size="24px" color={theme.palette.primary.light} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />

            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography variant="h4">Hello,</Typography>
                                                </Stack>
                                                <Typography variant="subtitle2">{profile?.username}</Typography>
                                            </Stack>
                                            <Divider />
                                        </Box>
                                        <Box sx={{ p: 1 }}>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{ borderRadius: `${borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleModalOpen}
                                                >
                                                    <ListItemIcon>
                                                        <IconUser stroke={1.5} size="20px" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Get Profile</Typography>} />
                                                </ListItemButton>

                                                <ListItemButton
                                                    sx={{ borderRadius: `${borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleModalOpen2}
                                                >
                                                    <ListItemIcon>
                                                        <IconPassword stroke={1.5} size="20px" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Change Password</Typography>} />
                                                </ListItemButton>

                                                <ListItemButton
                                                    sx={{ borderRadius: `${borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="20px" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2">
                                                                <FormattedMessage id="logout" />
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>

            <Modal open={open2} onClose={handleModalClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, lg: 450 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Get Profile"
                    content={false}
                    secondary={
                        <IconButton onClick={handleModalClose} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
                            <b>Name : </b>
                            {profile?.username}
                        </Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
                            <b>Email : </b>
                            {profile?.email}
                        </Typography>
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>

            <Modal
                open={open3}
                onClose={handleModalClose2}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, lg: 450 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Change Password"
                    content={false}
                    secondary={
                        <IconButton onClick={handleModalClose2} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <SubCard>
                            <ChangePassword handleModalClose={handleModalClose2} />
                        </SubCard>
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>
        </>
    );
};

export default ProfileSection;
